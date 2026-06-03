import { createFileRoute } from "@tanstack/react-router";
import { App } from "@/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOIR — Premium Fashion" },
      { name: "description", content: "Tailored silhouettes, luxe fabrics, and obsessive craft. Discover pieces designed to outlast trends." },
    ],
  }),
  component: App,
});
