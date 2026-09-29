import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { getBlogBySlug } from "@/lib/blogs.functions";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Sections";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider } from "@/components/store/cart";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const blog = await getBlogBySlug({ data: params.slug });
    if (!blog) throw notFound();
    return { blog };
  },
  component: BlogPageWrapper,
});

function BlogPageWrapper() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans">
        <Header />
        <main>
          <BlogPage />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

function BlogPage() {
  const { blog } = Route.useLoaderData();

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={blog.image_url}
          alt={blog.title}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-16 lg:px-8 max-w-7xl mx-auto">
          <Link
            to="/"
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/30"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
          
          <div className="flex items-end gap-6">
            <div>
              <p className="text-white/90 text-sm tracking-[0.14em] uppercase font-semibold mb-4">
                {blog.published_date} {blog.tag ? `• ${blog.tag}` : ""}
              </p>
              <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-4 leading-tight">
                {blog.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-16 lg:px-8 lg:py-24 max-w-4xl mx-auto">
        <div className="space-y-12">
          <div className="prose prose-lg prose-forest mx-auto">
            <p className="whitespace-pre-wrap text-lg leading-relaxed text-forest/90">
              {blog.content || blog.excerpt}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
