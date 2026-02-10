import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Simulator Milonga</CardTitle>
          <CardDescription>
            Built with the latest 2026 tooling and best practices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This app is scaffolded with:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent"></span>
              React 19 with TypeScript
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent"></span>
              Vite for blazing fast builds
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent"></span>
              Tailwind CSS + shadcn/ui components
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent"></span>
              ESLint and Prettier for code quality
            </li>
          </ul>

          <div className="space-y-2 pt-4">
            <p className="text-sm font-medium">Counter Example:</p>
            <div className="rounded-lg border border-border bg-muted p-4">
              <p className="text-center text-2xl font-bold">{count}</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setCount((c) => c - 1)}
                variant="outline"
                className="flex-1"
              >
                Decrease
              </Button>
              <Button
                onClick={() => setCount((c) => c + 1)}
                className="flex-1"
              >
                Increase
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
