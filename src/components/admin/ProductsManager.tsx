import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CustomLoader } from "@/components/ui/custom-loader";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { listAllProducts, saveProduct, deleteProduct, ProductRow } from "@/lib/products.functions";

export function ProductsManager() {
  const queryClient = useQueryClient();
  const fetchAll = useServerFn(listAllProducts);
  const save = useServerFn(saveProduct);
  const remove = useServerFn(deleteProduct);

  const { data: products = [], isPending } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => fetchAll(),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<ProductRow | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [variantLabel, setVariantLabel] = useState("");
  const [variants, setVariants] = useState("");
  const [tags, setTags] = useState("");
  const [badge, setBadge] = useState("");
  const [description, setDescription] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [weight, setWeight] = useState("");
  const [customerSupport, setCustomerSupport] = useState("");
  const [isActive, setIsActive] = useState(true);

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setImage("");
    setPrice("");
    setMrp("");
    setVariantLabel("");
    setVariants("");
    setTags("");
    setBadge("");
    setDescription("");
    setMaterialType("");
    setWeight("");
    setCustomerSupport("");
    setIsActive(true);
  };

  const openEdit = (prod: ProductRow) => {
    setEditing(prod);
    setTitle(prod.title);
    setImage(prod.image);
    setPrice(prod.price.toString());
    setMrp(prod.mrp.toString());
    setVariantLabel(prod.variant_label || "");
    setVariants(prod.variants.join(", "));
    setTags(prod.tags.join(", "));
    setBadge(prod.badge || "");
    setDescription(prod.description || "");
    setMaterialType(prod.material_type || "");
    setWeight(prod.weight || "");
    setCustomerSupport(prod.customer_support || "");
    setIsActive(prod.is_active);
    setIsOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: (data: any) => save({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product saved.");
      setIsOpen(false);
      resetForm();
    },
    onError: (e) => toast.error("Could not save product: " + e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product deleted.");
    },
    onError: (e) => toast.error("Could not delete product: " + e.message),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      id: editing?.id,
      title,
      image,
      price: parseFloat(price) || 0,
      mrp: parseFloat(mrp) || 0,
      rating: editing?.rating || 0,
      reviews: editing?.reviews || 0,
      variant_label: variantLabel,
      variants: variants.split(",").map(v => v.trim()).filter(Boolean),
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      badge,
      description,
      material_type: materialType,
      weight: weight,
      customer_support: customerSupport,
      is_active: isActive,
    });
  };

  if (isPending) return <div className="p-8 flex justify-center"><CustomLoader text="Loading products..." /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-semibold text-forest">Products</h2>
          <p className="text-sm text-muted-foreground">Manage your storefront products</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(val) => { setIsOpen(val); if (!val) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Product" : "New Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4 pt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Title</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Image URL or path</label>
                <Input value={image} onChange={e => setImage(e.target.value)} required placeholder="/assets/img.jpg" />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Price (₹)</label>
                <Input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">MRP (₹)</label>
                <Input type="number" value={mrp} onChange={e => setMrp(e.target.value)} required />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <Input value={tags} onChange={e => setTags(e.target.value)} placeholder="Best Sellers, Plant Care" />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Variant Label (e.g., Size, Color)</label>
                <Input value={variantLabel} onChange={e => setVariantLabel(e.target.value)} />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Variants (comma separated)</label>
                <Input value={variants} onChange={e => setVariants(e.target.value)} placeholder="Small, Medium, Large" />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Badge</label>
                <Input value={badge} onChange={e => setBadge(e.target.value)} placeholder="Sale, 15% OFF" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Product description..." rows={4} />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Material Type</label>
                <Input value={materialType} onChange={e => setMaterialType(e.target.value)} placeholder="Premium Quality" />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Weight</label>
                <Input value={weight} onChange={e => setWeight(e.target.value)} placeholder="Standard, 1kg, etc." />
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <label className="text-sm font-medium">Customer Support</label>
                <Input value={customerSupport} onChange={e => setCustomerSupport(e.target.value)} placeholder="8453084530" />
              </div>
              <div className="flex items-center justify-between col-span-2 sm:col-span-1 mt-6">
                <label className="text-sm font-medium">Active (Visible)</label>
                <Switch checked={isActive} onCheckedChange={setIsActive} />
              </div>
              <div className="col-span-2 pt-4">
                <Button type="submit" className="w-full" disabled={saveMutation.isPending}>
                  {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Tags</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((prod) => (
              <tr key={prod.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 font-medium flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-secondary overflow-hidden shrink-0">
                    <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="line-clamp-2">{prod.title}</span>
                </td>
                <td className="px-6 py-4">₹{prod.price}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {prod.tags.slice(0,2).map(t => (
                      <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-secondary text-secondary-foreground">
                        {t}
                      </span>
                    ))}
                    {prod.tags.length > 2 && <span className="text-xs text-muted-foreground">+{prod.tags.length - 2}</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {prod.is_active ? (
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 font-medium">Active</span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-700 font-medium">Hidden</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => openEdit(prod)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => { if(confirm("Are you sure?")) deleteMutation.mutate(prod.id); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
