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
  deleteProject,
  listAllProjects,
  saveProject,
  type RecentProjectRow,
} from "@/lib/recent-projects.functions";

type FormState = {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  status: string;
  sort_order: number;
  is_active: boolean;
};

const emptyForm: FormState = {
  title: "",
  description: "",
  image_url: "",
  status: "Completed",
  sort_order: 0,
  is_active: true,
};

export function RecentProjectsManager() {
  const queryClient = useQueryClient();
  const fetchAll = useServerFn(listAllProjects);
  const save = useServerFn(saveProject);
  const remove = useServerFn(deleteProject);

  const [form, setForm] = useState<FormState | null>(null);

  const projects = useQuery({
    queryKey: ["admin-recent-projects"],
    queryFn: () => fetchAll(),
  });

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["admin-recent-projects"] });
    await queryClient.invalidateQueries({ queryKey: ["recent-projects", "public"] });
  };

  const saveMutation = useMutation({
    mutationFn: (data: FormState) =>
      save({
        data,
      }),
    onSuccess: async () => {
      await refresh();
      setForm(null);
      toast.success("Project saved.");
    },
    onError: () => toast.error("Could not save the project."),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: async () => {
      await refresh();
      toast.success("Project removed.");
    },
    onError: () => toast.error("Could not remove the project."),
  });

  const startEdit = (project: RecentProjectRow) =>
    setForm({
      id: project.id,
      title: project.title,
      description: project.description,
      image_url: project.image_url,
      status: project.status,
      sort_order: project.sort_order,
      is_active: project.is_active,
    });

  if (projects.isPending) {
    return (
      <div className="grid place-items-center py-20">
        <CustomLoader text="Loading recent projects..." />
      </div>
    );
  }

  if (projects.isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        Could not load projects.
      </div>
    );
  }

  const items = projects.data ?? [];

  if (form) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-forest">
            {form.id ? "Edit Project" : "New Project"}
          </h2>
          <Button variant="ghost" size="icon" onClick={() => setForm(null)}>
            <X className="size-4" />
          </Button>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Next-Gen Corporate Oasis"
            />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              className="min-h-[100px]"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Short description of the project..."
            />
          </div>

          <div className="grid gap-2">
            <Label>Image URL</Label>
            <Input
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              placeholder="e.g. /vegetable-seeds-banner.png or https://..."
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label>Status</Label>
              <Input
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                placeholder="e.g. Completed or In Progress"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Sort Order</Label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={form.is_active}
              onCheckedChange={(c) => setForm({ ...form, is_active: c })}
            />
            <Label>Active (visible on storefront)</Label>
          </div>

          <div className="mt-4 flex gap-3">
            <Button
              disabled={saveMutation.isPending || !form.title || !form.description || !form.image_url}
              onClick={() => saveMutation.mutate(form)}
            >
              {saveMutation.isPending && <Loader2 className="mr-2 animate-spin size-4" />}
              Save Project
            </Button>
            <Button variant="ghost" onClick={() => setForm(null)}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-forest">Recent Projects & Highlights</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} projects total
          </p>
        </div>
        <Button onClick={() => setForm(emptyForm)}>
          <Plus className="mr-2 size-4" /> Add Project
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No recent projects yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project) => (
            <div
              key={project.id}
              className={`group flex flex-col justify-between rounded-xl border p-5 shadow-sm transition-all ${project.is_active ? "border-border bg-card" : "border-border/50 bg-secondary/50 opacity-75"}`}
            >
              <div>
                <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-secondary">
                  <img src={project.image_url} alt={project.title} className="size-full object-cover" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-forest leading-tight line-clamp-2">{project.title}</h3>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground border">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs font-medium text-muted-foreground">
                  Order: {project.sort_order}
                </span>
                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => startEdit(project)}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      if (confirm("Are you sure you want to remove this project?")) {
                        deleteMutation.mutate(project.id);
                      }
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
