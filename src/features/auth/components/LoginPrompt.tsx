import { LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface LoginPromptProps {
  message?: string;
  title?: string;
}

export const LoginPrompt = ({
  message = "You need to be logged in to access this page",
  title = "Login Required"
}: LoginPromptProps) => {
  return (
    <div className="mx-auto flex max-w-md items-center justify-center py-16">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">{message}</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/register">Create an Account</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}; 