import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      {
        title: "Zack's Way Media · Creative Studio · Lynchburg",
      },
      {
        name: "description",
        content:
          "Zack's Way Media — edgy creative studio based in Lynchburg, Virginia. Brand films, social content, and campaign visuals for clients who want signal, not noise.",
      },
      { name: "theme-color", content: "#060606" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Syne:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            className:
              "border border-[var(--color-primary)]/35 bg-[var(--color-surface)] text-[var(--color-fg)] shadow-[var(--shadow-lift)]",
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
