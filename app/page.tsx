"use client";

import * as React from "react";
import { BMICard } from "@/registry/turbopills/blocks/bmi-card/bmi-card";
import { MultipleChoice } from "@/registry/turbopills/ui/multiple-choice";
import { SingleChoice } from "@/registry/turbopills/ui/single-choice";
import { Input } from "@/registry/turbopills/ui/input";
import { MaskedInput } from "@/registry/turbopills/ui/masked-input";
import { BeforeAfterCard } from "@/registry/turbopills/blocks/before-after-card/before-after-card";
import { ProgressCells } from "@/registry/turbopills/ui/progress/progress-cells";
import { ProgressStretch } from "@/registry/turbopills/ui/progress/progress-stretch";
import { ProgressNumbered } from "@/registry/turbopills/ui/progress/progress-numbered";
import { ProgressSolid } from "@/registry/turbopills/ui/progress/progress-solid";
import { Button } from "@/components/ui/button";

const DEMO_OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

function InstallCommand({ command }: { command: string }) {
  return (
    <pre className="rounded-md border bg-muted px-3 py-2 text-xs overflow-x-auto">
      <code>{command}</code>
    </pre>
  );
}

function DemoCard({
  title,
  install,
  children,
}: {
  title: string;
  install: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-10 space-y-5">
      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      <InstallCommand command={install} />
      <div className="rounded-lg border bg-card p-6">{children}</div>
    </section>
  );
}

export default function Home() {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [singleValue, setSingleValue] = React.useState<string>("");
  const [phone, setPhone] = React.useState("");
  const [progressSolid, setProgressSolid] = React.useState(45);
  const [progressCells, setProgressCells] = React.useState(50);
  const [progressNumbered, setProgressNumbered] = React.useState(40);
  const [progressStretch, setProgressStretch] = React.useState(40);

  return (
    <div className="min-h-svh bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <header className="mb-4 pb-10 border-b space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Turbopills UI</h1>
          <p className="text-muted-foreground text-base max-w-xl">
            Beautiful, accessible React components for telehealth applications.
          </p>
          <Button asChild size="lg">
            <a
              href="https://www.turbopills.com/ui/docs"
              target="_blank"
              rel="noreferrer"
            >
              View full documentation
            </a>
          </Button>
        </header>

        <main className="space-y-6">
          <DemoCard
            title="BMI Card"
            install="pnpm dlx shadcn@latest add @turbopills-ui/bmi-card"
          >
            <BMICard bmi={24} tooltipContent={null} />
          </DemoCard>

          <DemoCard
            title="Progress Solid"
            install="pnpm dlx shadcn@latest add @turbopills-ui/progress-solid"
          >
            <div className="space-y-4">
              <input type="range" min={0} max={100} value={progressSolid} onChange={(e) => setProgressSolid(+e.target.value)} className="w-full" />
              <ProgressSolid value={progressSolid} />
            </div>
          </DemoCard>

          <DemoCard
            title="Progress Cells"
            install="pnpm dlx shadcn@latest add @turbopills-ui/progress-cells"
          >
            <div className="space-y-4">
              <input type="range" min={0} max={100} value={progressCells} onChange={(e) => setProgressCells(+e.target.value)} className="w-full" />
              <ProgressCells value={progressCells} steps={6} />
            </div>
          </DemoCard>

          <DemoCard
            title="Progress Numbered"
            install="pnpm dlx shadcn@latest add @turbopills-ui/progress-numbered"
          >
            <div className="space-y-4">
              <input type="range" min={0} max={100} value={progressNumbered} onChange={(e) => setProgressNumbered(+e.target.value)} className="w-full" />
              <ProgressNumbered value={progressNumbered} steps={5} highlightCurrent />
            </div>
          </DemoCard>

          <DemoCard
            title="Progress Stretch"
            install="pnpm dlx shadcn@latest add @turbopills-ui/progress-stretch"
          >
            <div className="space-y-4">
              <input type="range" min={0} max={100} value={progressStretch} onChange={(e) => setProgressStretch(+e.target.value)} className="w-full" />
              <ProgressStretch value={progressStretch} steps={6} highlightCurrent />
            </div>
          </DemoCard>

          <DemoCard
            title="Multiple Choice"
            install="pnpm dlx shadcn@latest add @turbopills-ui/multiple-choice"
          >
            <MultipleChoice
              title="Preferred frameworks"
              hint="Select all that apply"
              options={DEMO_OPTIONS}
              value={selectedValues}
              onChange={setSelectedValues}
            />
          </DemoCard>

          <DemoCard
            title="Single Choice"
            install="pnpm dlx shadcn@latest add @turbopills-ui/single-choice"
          >
            <SingleChoice
              title="Preferred framework"
              hint="Choose one"
              options={DEMO_OPTIONS}
              value={singleValue}
              onChange={setSingleValue}
            />
          </DemoCard>

          <DemoCard
            title="Input"
            install="pnpm dlx shadcn@latest add @turbopills-ui/input"
          >
            <Input
              title="Full name"
              hint="As it appears on your ID"
              placeholder="John Doe"
            />
          </DemoCard>

          <DemoCard
            title="Masked Input"
            install="pnpm dlx shadcn@latest add @turbopills-ui/masked-input"
          >
            <MaskedInput
              title="Phone number"
              preset="tel"
              value={phone}
              onChange={setPhone}
            />
          </DemoCard>

          <DemoCard
            title="Before/After Card"
            install="pnpm dlx shadcn@latest add @turbopills-ui/before-after-card"
          >
            <BeforeAfterCard name="Sarah M." className="w-full" />
          </DemoCard>
        </main>
      </div>
    </div>
  );
}
