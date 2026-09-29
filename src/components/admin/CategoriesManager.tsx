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
import { listAllCategories, saveCategory, deleteCategory, CategoryRow } from "@/lib/products.functions";

export function CategoriesManager() {
  const queryClient = useQueryClient();
  const fetchAll = useServerFn(listAllCategories);
  const save = useServerFn(saveCategory);
  const remove = useServerFn(deleteCategory);

  const { data: categories = [], isPending } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: () => fetchAll(),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryRow | null>(null);

  const [name, setName] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [isActive, setIsActive] = useState(true);

  const resetForm = () => {
    setEditing(null);
    setName("");
    setSortOrder("0");
    setIsActive(true);
  };

  const openEdit = (cat: CategoryRow) => {
    setEditing(cat);
    setName(cat.name);
    setSortOrder(cat.sort_order.toString());
    setIsActive(cat.is_active);
    setIsOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: (data: any) => save({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Category saved.");
      setIsOpen(false);
      resetForm();
    },
    onError: (e) => toast.error("Could not save category: " + e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Category deleted.");
    },
    onError: (e) => toast.error("Could not delete category: " + e.message),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      id: editing?.id,
      name,
      sort_order: parseInt(sortOrder) || 0,
      is_active: isActive,
    });
  };

  if (isPending) return <div className="p-8 flex justify-center"><CustomLoader text="Loading categories..." /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-semibold text-forest">Categories</h2>
          <p className="text-sm text-muted-foreground">Manage product categories</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(val) => { setIsOpen(val); if (!val) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Category" : "New Category"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input value={name} onChange={e => setName(e.target.value)} required />
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
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Order</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 font-medium">{cat.name}</td>
                <td className="px-6 py-4">{cat.sort_order}</td>
                <td className="px-6 py-4">
                  {cat.is_active ? (
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 font-medium">Active</span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-700 font-medium">Hidden</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => openEdit(cat)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => { if(confirm("Are you sure?")) deleteMutation.mutate(cat.id); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No categories found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
