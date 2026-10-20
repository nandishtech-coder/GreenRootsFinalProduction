import { ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { listBlogs } from "@/lib/blogs.functions";
import { Button } from "@/components/ui/button";

/* 1. Gifting story — content-only section without hardcoded imagery */
export function GiftsGrowWithTime() {
  return (
    <section aria-labelledby="gifts-grow-heading" className="py-16 lg:py-24">
      <div className="mx-auto w-full px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="gifts-grow-heading"
            className="font-display text-4xl leading-tight font-semibold text-forest lg:text-5xl lg:leading-[1.1]"
          >
            Because the Best Gifts Grow with Time
          </h2>
          <p className="mt-6 text-base leading-relaxed text-forest/80 sm:text-lg">
            Celebrate birthdays, anniversaries and milestones with plants and green gifts that last
            longer than moments. Delight your loved ones with beautifully curated plant hampers and
            eco-friendly gifts for every occasion.
          </p>
          <Button
            size="lg"
            asChild
            className="mt-10 h-14 w-full rounded-full bg-forest px-8 text-base font-medium text-forest-foreground hover:bg-forest-deep sm:w-auto"
          >
            <Link to="/green-gifts">
              Explore Gifting Range
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FanFavorites() {
  return (
    <section aria-labelledby="fan-favorites-heading" className="py-16 lg:py-24">
      <div className="mx-auto w-full px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="fan-favorites-heading"
            className="font-display text-4xl leading-tight font-semibold text-forest lg:text-5xl lg:leading-[1.1]"
          >
            Fan Favorites
          </h2>
          <p className="mt-6 text-base leading-relaxed text-forest/80 sm:text-lg">
            Check out our top plants for the season.
          </p>
          <Button
            size="lg"
            asChild
            className="mt-10 h-14 w-full rounded-full bg-forest px-8 text-base font-medium text-forest-foreground hover:bg-forest-deep sm:w-auto"
          >
            <Link to="/products">
              Shop Best Sellers
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function LatestBlogs() {
  const fetchBlogs = useServerFn(listBlogs);
  const { data: blogs = [], isPending } = useQuery({
    queryKey: ["blogs", "public"],
    queryFn: () => fetchBlogs(),
  });

  return (
    <section aria-labelledby="latest-blogs-heading" className="px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2
              id="latest-blogs-heading"
              className="font-display text-4xl font-semibold text-forest lg:text-5xl"
            >
              Latest Blogs
            </h2>
            <span className="mt-4 block h-1 w-24 bg-clay" />
          </div>
        </div>

        {isPending ? (
          <div className="mt-10 flex justify-center w-full py-12">
            <Loader2 className="animate-spin text-forest size-8" />
          </div>
        ) : blogs.length === 0 ? (
          <p className="mt-10 text-center text-muted-foreground">No blogs published yet.</p>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {blogs.slice(0, 3).map((post) => (
              <article key={post.id} className="group hover-lift bg-card shadow-[var(--shadow-soft)] flex flex-col rounded-2xl overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    loading="lazy"
                    width={900}
                    height={560}
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
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.14em] uppercase group/btn"
                  >
                    <span className="text-red-600">READ ARTICLE</span>
                    <ArrowRight className="size-4 text-forest transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            asChild
            className="h-14 rounded-full bg-forest px-10 text-sm font-semibold tracking-[0.1em] text-forest-foreground uppercase hover:bg-forest-deep hover:shadow-lg"
          >
            <Link to="/blogs">
              VIEW ALL ARTICLES
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
