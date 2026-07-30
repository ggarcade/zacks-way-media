import { createFileRoute } from "@tanstack/react-router";
import { KidHome } from "@/components/kid-home";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <KidHome />;
}
