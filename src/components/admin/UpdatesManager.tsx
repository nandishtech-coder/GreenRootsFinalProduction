import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Edit2, Loader2, Plus, Trash2 } from "lucide-react";
import { CustomLoader } from "@/components/ui/custom-loader";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { listAllUpdates, saveUpdate, deleteUpdate, type UpdateRow } from "@/lib/updates.functions";

export function UpdatesManager() {
  const queryClient = useQueryClient();
  const fetchAll = useServerFn(listAllUpdates);
  const saveFn = useServerFn(saveUpdate);
  const deleteFn = useServerFn(deleteUpdate);

  const { data: updates = [], isPending } = useQuery({
    queryKey: ["admin-updates"],
    queryFn: () => fetchAll(),
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<UpdateRow | null>(null);

  // Form state
  const [text, setText] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const openNew = () => {
    setEditing(null);
    setText("");
    setSortOrder((updates[updates.length - 1]?.sort_order ?? 0) + 10);
    setIsActive(true);
    setDialogOpen(true);
  };

  const openEdit = (u: UpdateRow) => {
    setEditing(u);
    setText(u.text);
    setSortOrder(u.sort_order);
    setIsActive(u.is_active);
    setDialogOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: saveFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-updates"] });
      await queryClient.invalidateQueries({ queryKey: ["public-updates"] }); // invalidate frontend
      toast.success("Update saved successfully");
      setDialogOpen(false);
    },
    onError: (e) => toast.error(e.message || "Failed to save update"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-updates"] });
      await queryClient.invalidateQueries({ queryKey: ["public-updates"] });
      toast.success("Update removed");
    },
    onError: (e) => toast.error(e.message || "Failed to delete update"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      toast.error("Text is required");
      return;
    }
    saveMutation.mutate({
      data: {
        ...(editing?.id ? { id: editing.id } : {}),
        text,
        sort_order: sortOrder,
        is_active: isActive,
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex justify-center p-8">
        <CustomLoader text="Loading..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
        <div>
          <h2 className="font-display text-2xl font-semibold text-forest">Latest Updates</h2>
          <p className="text-sm text-muted-foreground">Manage the scrolling announcement bar on the storefront.</p>
        </div>
        <Button onClick={openNew}>
          <Plus className="mr-2 size-4" /> Add Update
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-soft)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Text</th>
                <th className="px-6 py-4 font-medium">Sort Order</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {updates.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No updates configured.
                  </td>
                </tr>
              )}
              {updates.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium">{u.text}</td>
                  <td className="px-6 py-4">{u.sort_order}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${u.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {u.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(u)}>
                        <Edit2 className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => {
                          if (confirm("Delete this update permanently?")) {
                            deleteMutation.mutate({ data: { id: u.id } });
                          }
                        }}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Update" : "New Update"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Text to display</Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g. Free shipping on orders over ₹1,999"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2 flex flex-col justify-end">
                <div className="flex items-center gap-3 h-10">
                  <Switch checked={isActive} onCheckedChange={setIsActive} />
                  <Label className="font-normal">{isActive ? "Active (Visible)" : "Hidden"}</Label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
