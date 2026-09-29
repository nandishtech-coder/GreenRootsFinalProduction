import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CustomLoader } from "@/components/ui/custom-loader";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { listAllReels, saveReel, deleteReel, ReelRow } from "@/lib/reels.functions";

export function ReelsManager() {
  const queryClient = useQueryClient();
  const fetchAll = useServerFn(listAllReels);
  const save = useServerFn(saveReel);
  const remove = useServerFn(deleteReel);

  const { data: reels = [], isPending } = useQuery({
    queryKey: ["admin-reels"],
    queryFn: () => fetchAll(),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<ReelRow | null>(null);

  const [title, setTitle] = useState("");
  const [src, setSrc] = useState("");
  const [poster, setPoster] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [isActive, setIsActive] = useState(true);

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setSrc("");
    setPoster("");
    setSortOrder("0");
    setIsActive(true);
  };

  const openEdit = (reel: ReelRow) => {
    setEditing(reel);
    setTitle(reel.title);
    setSrc(reel.src);
    setPoster(reel.poster);
    setSortOrder((reel.sort_order ?? 0).toString());
    setIsActive(reel.is_active ?? true);
    setIsOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: (data: any) => save({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reels"] });
      toast.success("Reel saved.");
      setIsOpen(false);
      resetForm();
    },
    onError: (e) => toast.error("Could not save reel: " + e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reels"] });
      toast.success("Reel deleted.");
    },
    onError: (e) => toast.error("Could not delete reel: " + e.message),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      id: editing?.id,
      title,
      src,
      poster,
      sort_order: parseInt(sortOrder) || 0,
      is_active: isActive,
    });
  };

  if (isPending) return <div className="p-8 flex justify-center"><CustomLoader text="Loading reels..." /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-semibold text-forest">Instagram Reels</h2>
          <p className="text-sm text-muted-foreground">Manage your storefront reels</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(val) => { setIsOpen(val); if (!val) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Reel</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Reel" : "New Reel"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title (Admin only)</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Video URL (mp4)</label>
                <Input value={src} onChange={e => setSrc(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Poster Image URL (thumbnail)</label>
                <Input value={poster} onChange={e => setPoster(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort Order</label>
                <Input type="number" value={sortOrder} onChange={e => setSortOrder(e.target.value)} required />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Active (Visible)</label>
                <Switch checked={isActive} onCheckedChange={setIsActive} />
              </div>
              <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Reel
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-secondary/50 text-muted-foreground">
            <tr>
              <th className="px-6 py-3 font-medium">Thumbnail</th>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Order</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {reels.map((reel) => (
              <tr key={reel.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <img src={reel.poster} alt={reel.title} className="h-10 w-10 object-cover rounded" />
                </td>
                <td className="px-6 py-4 font-medium">{reel.title}</td>
                <td className="px-6 py-4">{reel.sort_order}</td>
                <td className="px-6 py-4">
                  {reel.is_active ? (
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 font-medium">Active</span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-700 font-medium">Hidden</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => openEdit(reel)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => { if(confirm("Are you sure?")) deleteMutation.mutate(reel.id); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {reels.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No reels found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
