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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  deleteService,
  listAllServices,
  saveService,
  type ServiceRow,
} from "@/lib/services.functions";
import { SERVICE_ICON_NAMES, serviceIcon } from "@/lib/service-icons";

type FormState = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  image_url: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  about: string;
  includes: string;
  cta_heading: string;
  cta_note: string;
  footnote: string;
};

const emptyForm: FormState = {
  slug: "",
  title: "",
  description: "",
  image_url: "",
  icon: "Leaf",
  sort_order: 0,
  is_active: true,
  about: "",
  includes: "",
  cta_heading: "Book a Consultation",
  cta_note: "",
  footnote: "",
};

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function ServicesManager() {
  const queryClient = useQueryClient();
  const fetchAll = useServerFn(listAllServices);
  const save = useServerFn(saveService);
  const remove = useServerFn(deleteService);

  const [form, setForm] = useState<FormState | null>(null);

  const services = useQuery({
    queryKey: ["admin-services"],
    queryFn: () => fetchAll(),
  });

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["admin-services"] });
    await queryClient.invalidateQueries({ queryKey: ["services", "public"] });
  };

  const saveMutation = useMutation({
    mutationFn: ({ includes, ...rest }: FormState) =>
      save({
        data: {
          ...rest,
          includes: includes.split("\n").map((i) => i.trim()).filter(Boolean),
        },
      }),
    onSuccess: async () => {
      await refresh();
      setForm(null);
      toast.success("Service saved.");
    },
    onError: () => toast.error("Could not save the service. Check the slug is unique."),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: async () => {
      await refresh();
      toast.success("Service removed.");
    },
    onError: () => toast.error("Could not remove the service."),
  });

  const startEdit = (service: ServiceRow) =>
    setForm({
      id: service.id,
      slug: service.slug,
      title: service.title,
      description: service.description,
      image_url: service.image_url,
      icon: service.icon,
      sort_order: service.sort_order,
      is_active: service.is_active,
      about: service.about ?? "",
      includes: (service.includes ?? []).join("\n"),
      cta_heading: service.cta_heading ?? "Book a Consultation",
      cta_note: service.cta_note ?? "",
      footnote: service.footnote ?? "",
    });

  if (services.isPending) {
    return (
      <div className="grid place-items-center py-20">
        <CustomLoader text="Loading services..." />
      </div>
    );
  }

  if (services.isError) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">Could not load services.</p>
        <Button className="mt-4" onClick={() => services.refetch()}>Try again</Button>
      </div>
    );
  }

  const WORKFORCE_SLUGS = [
    "our-professional-training",
    "training-certification",
    "professional-deployment",
    "quality-audits-supervision",
  ];
  const list = services.data.filter((s) => !WORKFORCE_SLUGS.includes(s.slug));

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-leaf">Website content</p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-forest">Our Services</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            These entries power the "Our Services" section on the storefront.
          </p>
        </div>
        <Button
          onClick={() =>
            setForm({ ...emptyForm, sort_order: (list.at(-1)?.sort_order ?? 0) + 1 })
          }
        >
          <Plus /> Add service
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
            saveMutation.mutate({ ...form, slug: form.slug.trim() || slugify(form.title) });
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-forest">
              {form.id ? "Edit service" : "New service"}
            </h3>
            <Button type="button" variant="ghost" size="icon" onClick={() => setForm(null)}>
              <X />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="svc-title">Title</Label>
              <Input
                id="svc-title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) =>
                    f
                      ? {
                          ...f,
                          title: e.target.value,
                          slug: f.id ? f.slug : slugify(e.target.value),
                        }
                      : f,
                  )
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="svc-slug">URL slug</Label>
              <Input
                id="svc-slug"
                value={form.slug}
                onChange={(e) => setForm((f) => (f ? { ...f, slug: slugify(e.target.value) } : f))}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="svc-desc">Description</Label>
            <Textarea
              id="svc-desc"
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => (f ? { ...f, description: e.target.value } : f))}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="svc-image">Image URL</Label>
              <Input
                id="svc-image"
                placeholder="/services/my-image.png or https://..."
                value={form.image_url}
                onChange={(e) => setForm((f) => (f ? { ...f, image_url: e.target.value } : f))}
              />
            </div>
            <div className="grid gap-2">
              <Label>Icon</Label>
              <Select
                value={form.icon}
                onValueChange={(value) => setForm((f) => (f ? { ...f, icon: value } : f))}
              >
                <SelectTrigger aria-label="Icon">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_ICON_NAMES.map((name) => (
                    <SelectItem key={name} value={name}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="svc-about">About this service (detail page)</Label>
            <Textarea
              id="svc-about"
              rows={6}
              placeholder="Long description shown on the service detail page. Leave a blank line between paragraphs."
              value={form.about}
              onChange={(e) => setForm((f) => (f ? { ...f, about: e.target.value } : f))}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="svc-includes">What's included — one item per line</Label>
            <Textarea
              id="svc-includes"
              rows={6}
              placeholder={"On-site assessment\nCustom planting plan\nSeasonal maintenance calendar"}
              value={form.includes}
              onChange={(e) => setForm((f) => (f ? { ...f, includes: e.target.value } : f))}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="svc-cta-heading">Booking card heading</Label>
              <Input
                id="svc-cta-heading"
                value={form.cta_heading}
                onChange={(e) => setForm((f) => (f ? { ...f, cta_heading: e.target.value } : f))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="svc-cta-note">Booking card text</Label>
              <Input
                id="svc-cta-note"
                value={form.cta_note}
                onChange={(e) => setForm((f) => (f ? { ...f, cta_note: e.target.value } : f))}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="svc-footnote">Footnote</Label>
            <Input
              id="svc-footnote"
              placeholder="Small print shown under the booking buttons"
              value={form.footnote}
              onChange={(e) => setForm((f) => (f ? { ...f, footnote: e.target.value } : f))}
            />
          </div>

          <div className="flex flex-wrap items-end gap-6">
            <div className="grid w-32 gap-2">
              <Label htmlFor="svc-order">Sort order</Label>
              <Input
                id="svc-order"
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm((f) => (f ? { ...f, sort_order: Number(e.target.value) || 0 } : f))
                }
              />
            </div>
            <div className="flex items-center gap-3 pb-2">
              <Switch
                id="svc-active"
                checked={form.is_active}
                onCheckedChange={(checked) =>
                  setForm((f) => (f ? { ...f, is_active: checked } : f))
                }
              />
              <Label htmlFor="svc-active">Visible on website</Label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending && <Loader2 className="animate-spin" />}
              Save service
            </Button>
            <Button type="button" variant="ghost" onClick={() => setForm(null)}>Cancel</Button>
          </div>
        </form>
      )}

      {list.length === 0 ? (
        <p className="rounded-xl border border-border bg-card px-6 py-14 text-center text-muted-foreground">
          No services yet. Add the first one.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((service) => {
            const Icon = serviceIcon(service.icon);
            const mainImg = (service.image_url || "").split("|||")[0];
            return (
              <article
                key={service.id}
                className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]"
              >
                <div className="relative aspect-[4/3] w-full bg-muted">
                  {mainImg && (
                    <img
                      src={mainImg}
                      alt={service.title}
                      className="absolute inset-0 size-full object-cover"
                    />
                  )}
                  <span className="absolute bottom-3 left-3 grid size-9 place-items-center rounded-lg bg-card/90 text-leaf">
                    <Icon className="size-4" />
                  </span>
                  {!service.is_active && (
                    <span className="absolute right-3 top-3 rounded-full bg-foreground/80 px-2.5 py-1 text-xs font-medium text-background">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold text-forest">{service.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">/service/{service.slug}</p>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-5 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEdit(service)}>
                      <Pencil /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      disabled={deleteMutation.isPending}
                      onClick={() => {
                        if (confirm(`Remove "${service.title}"?`)) deleteMutation.mutate(service.id);
                      }}
                    >
                      <Trash2 /> Delete
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
