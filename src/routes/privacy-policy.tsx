import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Sections";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider } from "@/components/store/cart";
import { getGuideline } from "@/lib/guidelines.functions";
import { Loader2 } from "lucide-react";
import { GuidelineRenderer } from "@/components/ui/guideline-renderer";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const fetchGuideline = useServerFn(getGuideline);
  const { data, isLoading } = useQuery({
    queryKey: ["guideline", "privacy-policy"],
    queryFn: () => fetchGuideline({ data: "privacy-policy" }),
  });

  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans">
        <Header />
        <main className="px-4 py-20 lg:px-8">
          <div className="mx-auto max-w-4xl bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border/50 min-h-[500px]">
            {isLoading ? (
              <div className="flex h-full items-center justify-center py-20">
                <Loader2 className="size-8 animate-spin text-forest" />
              </div>
            ) : data ? (
              <>
                <h1 className="font-display text-4xl font-bold text-forest mb-8">{data.title}</h1>
                <GuidelineRenderer content={data.content} />
              </>
            ) : (
              <div className="text-center text-muted-foreground py-20">
                Privacy policy not found.
              </div>
            )}
          </div>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
