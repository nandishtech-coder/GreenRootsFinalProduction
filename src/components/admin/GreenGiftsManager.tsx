import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Plus, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CustomLoader } from "@/components/ui/custom-loader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategoryContent, saveCategoryContent, CategoryContentRow } from "@/lib/category-content.functions";

// We'll focus on Green Gifts, but allow any category
const MANAGED_CATEGORIES = [
  { id: "gift-hampers", name: "Gift Hampers" },
  { id: "corporate-gifting", name: "Corporate Gifting" },
  { id: "gift-cards", name: "Gift Cards" },
];

export function GreenGiftsManager() {
  const queryClient = useQueryClient();
  const fetchContent = useServerFn(getCategoryContent);
  const save = useServerFn(saveCategoryContent);

  const [selectedCategory, setSelectedCategory] = useState<string>("gift-hampers");
  const [description, setDescription] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const { data: content, isPending, refetch } = useQuery({
    queryKey: ["admin-category-content", selectedCategory],
    queryFn: () => fetchContent({ data: selectedCategory }),
  });

  useEffect(() => {
    if (content) {
      setDescription(content.description || "");
      setGallery(content.gallery || []);
    } else if (!isPending) {
      setDescription("");
      setGallery([]);
    }
  }, [content, isPending, selectedCategory]);

  const saveMutation = useMutation({
    mutationFn: (data: Partial<CategoryContentRow>) => save({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-category-content", selectedCategory] });
      toast.success("Category content saved.");
    },
    onError: (e) => toast.error("Could not save content: " + e.message),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      id: selectedCategory,
      description,
      gallery,
    });
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setGallery([...gallery, newImageUrl.trim()]);
    setNewImageUrl("");
  };

  const handleRemoveImage = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-semibold text-forest">Green Gifts Updates</h2>
          <p className="text-sm text-muted-foreground">Manage descriptions and galleries for category pages</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Category to Edit</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {MANAGED_CATEGORIES.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isPending ? (
          <div className="py-12 flex justify-center"><CustomLoader text="Loading content..." /></div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a nice description for this category..."
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium block">Gallery Images</label>
              
              <div className="flex gap-2">
                <Input 
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or /image.png"
                  className="flex-1"
                />
                <Button type="button" variant="secondary" onClick={handleAddImage}>
                  <Plus className="h-4 w-4 mr-2" /> Add Image
                </Button>
              </div>

              {gallery.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                  {gallery.map((img, i) => (
                    <div key={i} className="relative group rounded-lg overflow-hidden border border-border aspect-[4/3] bg-secondary/20">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground italic p-4 bg-secondary/10 rounded-lg border border-dashed text-center">
                  No images in the gallery yet.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
