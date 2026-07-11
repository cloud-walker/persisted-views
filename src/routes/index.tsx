import { getViews } from "#/services/view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: () => {
    return getViews();
  },
  component: Home,
});

function Home() {
  const views = Route.useLoaderData();
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <pre>{JSON.stringify(views, null, 2)}</pre>
    </div>
  );
}
