import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Sections";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider } from "@/components/store/cart";
import { Reveal } from "@/components/store/Reveal";
import { ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listBlogs } from "@/lib/blogs.functions";

export const Route = createFileRoute("/blogs")({
  component: BlogsPage,
});

function BlogsPage() {
  const fetchBlogs = useServerFn(listBlogs);
  const { data: blogs = [], isPending } = useQuery({
    queryKey: ["blogs", "public"],
    queryFn: () => fetchBlogs(),
  });

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-[#fdfaf6]">
        <Header />
        
        <main className="flex-1 pb-24 pt-8 md:pt-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal variant="down">
              <div className="text-center mb-16">
                <h1 className="font-display text-4xl font-bold tracking-tight text-forest sm:text-6xl">
                  Our Blogs
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-forest/80">
                  Stay updated with our latest articles, gardening tips, and insights on sustainable living.
                </p>
              </div>
            </Reveal>

            {isPending ? (
              <div className="mt-10 flex justify-center w-full py-12">
                <Loader2 className="animate-spin text-forest size-8" />
              </div>
            ) : blogs.length === 0 ? (
              <p className="mt-10 text-center text-muted-foreground">No blogs published yet.</p>
            ) : (
              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {blogs.map((post, index) => (
                  <Reveal key={post.id} variant="up" delay={index * 100} className="h-full">
                    <article className="group hover-lift bg-card shadow-[var(--shadow-soft)] flex flex-col h-full rounded-2xl overflow-hidden">
                      <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {post.tag && (
                          <span className="absolute top-6 left-6 bg-forest px-5 py-3 text-xs font-semibold tracking-[0.12em] text-white uppercase">
                            {post.tag}
                          </span>
                        )}
                      </div>
                      <div className="p-6 lg:p-8 flex flex-col flex-grow">
                        <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                          {post.published_date} <span className="text-clay">•</span> MUG URBAN GREEN
                        </p>
                        <h3 className="mt-4 font-display text-2xl leading-snug font-semibold text-forest">
                          {post.title}
                        </h3>
                        <p className="mt-4 leading-relaxed text-forest/75 flex-grow">{post.excerpt}</p>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.14em] uppercase group/btn mt-auto"
                        >
                          <span className="text-red-600">READ ARTICLE</span>
                          <ArrowRight className="size-4 text-forest transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                ))}
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
