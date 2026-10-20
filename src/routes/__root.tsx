import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useCallback, useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { checkBackendHealth } from "../lib/backend-health";
import { getSiteSettings } from "../lib/settings.functions";
import { trackPageView } from "../lib/tracking.functions";
import { AlertTriangle, Wrench } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GreenRoots" },
      { name: "description", content: "Urban gardening essentials for greener homes." },
      { name: "google-site-verification", content: "S7VKqQCILCUr_PtLlE0d_gVjLa6J7VjnOlxUN1yPeeM" },
      { name: "author", content: "GreenRoots" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  loader: async ({ context }) => {
    try {
      const settings = await context.queryClient.fetchQuery({
        queryKey: ["site_settings"],
        queryFn: () => getSiteSettings(),
      });
      return { settings };
    } catch (e) {
      console.error("Failed to load site settings", e);
      return { settings: { maintenance_mode: false, maintenance_heading: "Maintenance", maintenance_message: "Updating site." } };
    }
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { settings } = Route.useLoaderData();
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);

  const runHealthCheck = useCallback(async () => {
    const healthy = await checkBackendHealth();
    setBackendHealthy(healthy);
  }, []);

  useEffect(() => {
    void runHealthCheck();

    const intervalId = window.setInterval(() => {
      void runHealthCheck();
    }, 30000);

    const handleFocus = () => {
      if (document.visibilityState === "visible") {
        void runHealthCheck();
      }
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
    };
  }, [runHealthCheck]);

  useEffect(() => {
    // Generate a simple unique visitor id per session/browser if not exists
    let visitorId = localStorage.getItem("visitorId");
    if (!visitorId) {
      visitorId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("visitorId", visitorId);
    }
    trackPageView({ data: { path: currentPath, visitorId } }).catch(console.error);
  }, [currentPath]);

  const isAdminRoute = currentPath.startsWith("/admin");
  const isMaintenanceMode = Boolean(settings?.maintenance_mode);
  const showMaintenanceScreen = backendHealthy === false || (isMaintenanceMode && !isAdminRoute);

  if (showMaintenanceScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-xl text-center space-y-6 bg-card p-10 rounded-2xl shadow-xl border">
          <div className="mx-auto bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center">
            <Wrench className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {backendHealthy === false ? "Backend unavailable" : settings?.maintenance_heading || "Website Under Maintenance"}
          </h1>
          <p className="text-lg text-muted-foreground whitespace-pre-wrap">
            {backendHealthy === false
              ? "The backend is temporarily unavailable. Scheduled warm-up checks help keep it active, but they cannot guarantee 100% uptime. Please try again in a moment."
              : settings?.maintenance_message || "We are currently updating our website. Please check back later."}
          </p>
          <button
            type="button"
            onClick={() => void runHealthCheck()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
