import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Briefcase, CheckCircle2, TrendingUp } from "lucide-react";

const Features = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold text-primary">
                Organize Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Create custom boards and columns to track your job applications at
              every stage of the process.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold text-primary">
                Track Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Monitor your application status from applied to interview to offer
              with visual Kanban boards.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold text-primary">
                Stay Organized
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Never lose track of an application. Keep all your job search
              information in one centralized place.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
