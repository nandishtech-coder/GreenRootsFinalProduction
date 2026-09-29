import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CustomLoader } from "@/components/ui/custom-loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  deleteBlog,
  listAllBlogs,
  saveBlog,
  type BlogRow,
} from "@/lib/blogs.functions";

type FormState = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  published_date: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
};

const emptyForm: FormState = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  tag: "",
  published_date: "",
  image_url: "",
  sort_order: 0,
  is_active: true,
};

export function BlogsManager() {
  const queryClient = useQueryClient();
  const fetchAll = useServerFn(listAllBlogs);
  const save = useServerFn(saveBlog);
  const remove = useServerFn(deleteBlog);

  const [form, setForm] = useState<FormState | null>(null);

  const blogs = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: () => fetchAll(),
  });

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
    await queryClient.invalidateQueries({ queryKey: ["blogs", "public"] });
  };

  const saveMutation = useMutation({
    mutationFn: (data: FormState) =>
      save({
        data,
      }),
    onSuccess: async () => {
      await refresh();
      setForm(null);
      toast.success("Blog saved.");
    },
    onError: () => toast.error("Could not save the blog."),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: async () => {
      await refresh();
      toast.success("Blog removed.");
    },
    onError: () => toast.error("Could not remove the blog."),
  });

  const startEdit = (blog: BlogRow) =>
    setForm({
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      tag: blog.tag ?? "",
      published_date: blog.published_date,
      image_url: blog.image_url,
      sort_order: blog.sort_order,
      is_active: blog.is_active,
    });

  if (blogs.isPending) {
    return (
      <div className="grid place-items-center py-20">
        <CustomLoader text="Loading blogs..." />
      </div>
    );
  }

  if (blogs.isError) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">Could not load blogs.</p>
        <Button className="mt-4" onClick={() => blogs.refetch()}>Try again</Button>
      </div>
    );
  }

  const list = blogs.data;

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-leaf">Website content</p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-forest">Latest Blogs</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the blogs shown in the "Latest Blogs" section on the storefront.
          </p>
        </div>
        <Button
          onClick={() =>
            setForm({ ...emptyForm, sort_order: (list.at(-1)?.sort_order ?? 0) + 1 })
          }
        >
          <Plus /> Add blog
        </Button>
      </div>

      {form && (
        <form
          className="grid gap-5 rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.title.trim()) {
              toast.error("Title is required.");
              return;
            }
            saveMutation.mutate(form);
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-forest">
              {form.id ? "Edit blog" : "New blog"}
            </h3>
            <Button type="button" variant="ghost" size="icon" onClick={() => setForm(null)}>
              <X />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="blog-title">Title</Label>
              <Input
                id="blog-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => {
                    if (!f) return f;
                    const title = e.target.value;
                    const slug = f.id ? f.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                    return { ...f, title, slug };
                  })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="blog-slug">URL Slug</Label>
              <Input
                id="blog-slug"
                value={form.slug}
                onChange={(e) => setForm((f) => (f ? { ...f, slug: e.target.value } : f))}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="blog-date">Date (e.g. AUG 05, 2026)</Label>
              <Input
                id="blog-date"
                value={form.published_date}
                onChange={(e) => setForm((f) => (f ? { ...f, published_date: e.target.value } : f))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="blog-tag">Tag (e.g. BEST PLANTS FOR GIFTING)</Label>
              <Input
                id="blog-tag"
                value={form.tag}
                onChange={(e) => setForm((f) => (f ? { ...f, tag: e.target.value } : f))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="blog-image">Image URL</Label>
              <Input
                id="blog-image"
                placeholder="https://..."
                value={form.image_url}
                onChange={(e) => setForm((f) => (f ? { ...f, image_url: e.target.value } : f))}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="blog-excerpt">Excerpt</Label>
            <Textarea
              id="blog-excerpt"
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm((f) => (f ? { ...f, excerpt: e.target.value } : f))}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="blog-content">Content (Full Article)</Label>
            <Textarea
              id="blog-content"
              rows={8}
              value={form.content}
              onChange={(e) => setForm((f) => (f ? { ...f, content: e.target.value } : f))}
              required
            />
          </div>

          <div className="flex flex-wrap items-end gap-6">
            <div className="grid w-32 gap-2">
              <Label htmlFor="blog-order">Sort order</Label>
              <Input
                id="blog-order"
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm((f) => (f ? { ...f, sort_order: Number(e.target.value) || 0 } : f))
                }
              />
            </div>
            <div className="flex items-center gap-3 pb-2">
              <Switch
                id="blog-active"
                checked={form.is_active}
                onCheckedChange={(checked) =>
                  setForm((f) => (f ? { ...f, is_active: checked } : f))
                }
              />
              <Label htmlFor="blog-active">Visible on website</Label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending && <Loader2 className="animate-spin" />}
              Save blog
            </Button>
            <Button type="button" variant="ghost" onClick={() => setForm(null)}>Cancel</Button>
          </div>
        </form>
      )}

      {list.length === 0 ? (
        <p className="rounded-xl border border-border bg-card px-6 py-14 text-center text-muted-foreground">
          No blogs yet. Add the first one.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((blog) => (
            <article
              key={blog.id}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]"
            >
              <div className="relative aspect-[16/10] w-full bg-muted">
                {blog.image_url && (
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="absolute inset-0 size-full object-cover"
                  />
                )}
                {!blog.is_active && (
                  <span className="absolute right-3 top-3 rounded-full bg-foreground/80 px-2.5 py-1 text-xs font-medium text-background">
                    Hidden
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase mb-2">
                  {blog.published_date} {blog.tag ? `• ${blog.tag}` : ""}
                </p>
                <h3 className="font-display text-lg font-semibold text-forest">{blog.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {blog.excerpt}
                </p>
                <div className="mt-5 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(blog)}>
                    <Pencil /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    disabled={deleteMutation.isPending}
                    onClick={() => {
                      if (confirm(`Remove "${blog.title}"?`)) deleteMutation.mutate(blog.id);
                    }}
                  >
                    <Trash2 /> Delete
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
