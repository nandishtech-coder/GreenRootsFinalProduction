import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listGuidelines, updateGuideline, createGuideline } from "@/lib/guidelines.functions";
import { Loader2, FileText, CheckCircle2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export function GuidelinesManager() {
  const fetchGuidelines = useServerFn(listGuidelines);
  const updateFn = useServerFn(updateGuideline);
  const createFn = useServerFn(createGuideline);
  const queryClient = useQueryClient();

  const { data: guidelines = [], isLoading } = useQuery({
    queryKey: ["admin-guidelines"],
    queryFn: () => fetchGuidelines(),
  });

  const updateMutation = useMutation({
    mutationFn: updateFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-guidelines"] });
      toast.success("Guideline updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update guideline: ${error.message}`);
    },
  });

  const createMutation = useMutation({
    mutationFn: createFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-guidelines"] });
      toast.success("Guideline created successfully");
      setIsCreating(false);
      setNewTitle("");
      setNewSlug("");
      setNewContent("");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create guideline: ${error.message}`);
    },
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [content, setContent] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newContent, setNewContent] = useState("");

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-forest" />
      </div>
    );
  }

  const missingDefaults = [
    { title: "Privacy Policy", slug: "privacy-policy" },
    { title: "Terms of Service", slug: "terms-of-service" },
    { title: "Refund Policy", slug: "refund-policy" }
  ].filter(d => !guidelines.some((g: any) => g.slug === d.slug));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-forest">Guidelines & Policies</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the content of your Privacy Policy, Terms of Service, and Refund Policy pages.
          </p>
        </div>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)} className="bg-forest hover:bg-forest-deep">
            <Plus className="size-4 mr-2" /> Add Guideline
          </Button>
        )}
      </div>

      {missingDefaults.length > 0 && !isCreating && guidelines.length === 0 && (
        <div className="rounded-xl border border-dashed border-primary/50 bg-primary/5 p-6 text-center">
          <FileText className="mx-auto size-10 text-primary/60 mb-3" />
          <h3 className="font-display text-lg font-semibold text-forest mb-1">No Guidelines Found</h3>
          <p className="text-sm text-muted-foreground mb-4">Click "Add Guideline" to create your policies, or easily add the default ones below.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {missingDefaults.map(d => (
              <Button 
                key={d.slug}
                variant="outline" 
                onClick={() => {
                  setNewTitle(d.title);
                  setNewSlug(d.slug);
                  setIsCreating(true);
                }}
              >
                Create {d.title}
              </Button>
            ))}
          </div>
        </div>
      )}

      {isCreating && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
          <h3 className="font-display text-xl font-bold text-forest mb-4">Create New Guideline</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest">Title</label>
                <Input 
                  value={newTitle} 
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    if (!newSlug || newSlug === newTitle.toLowerCase().replace(/\s+/g, '-')) {
                      setNewSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                    }
                  }} 
                  placeholder="e.g. Privacy Policy" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest">URL Slug</label>
                <Input 
                  value={newSlug} 
                  onChange={(e) => setNewSlug(e.target.value)} 
                  placeholder="e.g. privacy-policy" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-forest">Content</label>
              <Textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="min-h-[200px] font-mono text-sm leading-relaxed"
                placeholder="Enter policy content..."
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setNewTitle("");
                  setNewSlug("");
                  setNewContent("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!newTitle || !newSlug || !newContent) {
                    toast.error("Please fill in all fields");
                    return;
                  }
                  createMutation.mutate({ data: { slug: newSlug, title: newTitle, content: newContent } });
                }}
                disabled={createMutation.isPending}
                className="bg-forest hover:bg-forest-deep"
              >
                {createMutation.isPending ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 size-4" />
                )}
                Create Guideline
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {guidelines.map((guideline: any) => (
          <div key={guideline.id} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-border pb-4 mb-4">
              <span className="grid size-10 place-items-center rounded-lg bg-secondary text-forest">
                <FileText className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-forest">{guideline.title}</h3>
                <p className="text-xs text-muted-foreground">Slug: /{guideline.slug}</p>
              </div>
            </div>

            {editingId === guideline.id ? (
              <div className="space-y-4">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[300px] font-mono text-sm leading-relaxed"
                  placeholder="Enter policy content..."
                />
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setContent("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      updateMutation.mutate({ data: { id: guideline.id, content } });
                      setEditingId(null);
                    }}
                    disabled={updateMutation.isPending}
                    className="bg-forest hover:bg-forest-deep"
                  >
                    {updateMutation.isPending ? (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="mr-2 size-4" />
                    )}
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="prose prose-sm max-w-none text-foreground bg-secondary/30 p-4 rounded-lg max-h-[200px] overflow-y-auto whitespace-pre-wrap font-mono">
                  {guideline.content || "No content provided yet."}
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      setEditingId(guideline.id);
                      setContent(guideline.content);
                    }}
                    variant="outline"
                  >
                    Edit Content
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
