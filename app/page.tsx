"use client";

import * as React from "react";
import { Heart, Star, Zap, Smile } from "lucide-react";
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
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

const DEMO_OPTIONS = [
  {
    value: "option1",
    label: (
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5" />
        <span>Option 1</span>
      </div>
    ),
  },
  {
    value: "option2",
    label: (
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5" />
        <span>Option 2</span>
      </div>
    ),
    badge: "Popular",
  },
  {
    value: "option3",
    label: (
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5" />
        <span>Option 3</span>
      </div>
    ),
  },
  { value: "none", label: "None of the above", none: true },
];

const RATING_OPTIONS = [
  { value: "1", label: <div className="font-bold text-lg">1</div> },
  { value: "2", label: <div className="font-bold text-lg">2</div> },
  { value: "3", label: <div className="font-bold text-lg">3</div> },
  { value: "4", label: <div className="font-bold text-lg">4</div> },
  { value: "5", label: <div className="font-bold text-lg">5</div> },
];

const ICON_OPTIONS = [
  { value: "1", label: <><div>😞</div><div className="mt-1">Some text</div></> },
  { value: "2", label: <><div>😐</div><div className="mt-1">Some text</div></> },
  { value: "3", label: <><div>🙂</div><div className="mt-1">Some text</div></> },
  { value: "4", label: <><div>😊</div><div className="mt-1">Some text</div></> },
  { value: "5", label: <Star className="w-5 h-5" /> },
  { value: "6", label: <Heart className="w-5 h-5" /> },
  { value: "7", label: <Zap className="w-5 h-5" /> },
  { value: "8", label: <Smile className="w-5 h-5" /> },
];

export default function Home() {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [singleValue, setSingleValue] = React.useState<string>("");
  const [ratingValue, setRatingValue] = React.useState<string>("");
  const [phone, setPhone] = React.useState("");
  const [date, setDate] = React.useState("");
  const [bmiValue, setBmiValue] = React.useState(26.5);
  const [progress, setProgress] = React.useState(50);

  return (
    <div className="min-h-svh bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="flex flex-col gap-3 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Turbopills Components
              </h1>
              <p className="text-muted-foreground mt-1">
                Custom shadcn registry with ready-to-use components
              </p>
            </div>
          </div>
        </header>
        <main className="flex flex-col gap-12">
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">BMI Card</h2>
              <p className="text-sm text-muted-foreground">
                Visual BMI indicator with customizable thresholds
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">BMI Value:</label>
                <input
                  type="range"
                  min="10"
                  max="30"
                  step="0.1"
                  value={bmiValue}
                  onChange={(e) => setBmiValue(parseFloat(e.target.value))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min="10"
                  max="30"
                  step="0.1"
                  value={bmiValue}
                  onChange={(e) => setBmiValue(parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Default (interactive)
                  </p>
                  <BMICard bmi={bmiValue} tooltipContent="" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Arc with value outside
                  </p>
                  <BMICard
                    bmi={bmiValue}
                    shape="arc"
                    valuePosition="outside"
                    animated={false}
                    size={80}
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Semicircle, thin stroke
                  </p>
                  <BMICard
                    bmi={bmiValue}
                    shape="semicircle"
                    strokeWidth={4}
                    animated={false}
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Semicircle
                  </p>
                  <BMICard
                    bmi={bmiValue}
                    shape="semicircle"
                    animated={true}
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Full fill (no markers)
                  </p>
                  <BMICard
                    bmi={bmiValue}
                    fillMode="full"
                    showThresholdMarkers={false}
                    animated={false}
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Small size
                  </p>
                  <BMICard bmi={bmiValue} size={100} animated={false} />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Thick stroke
                  </p>
                  <BMICard bmi={bmiValue} strokeWidth={16} />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    No status message
                  </p>
                  <BMICard bmi={bmiValue} showStatusMessage={false} />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Custom thresholds
                  </p>
                  <BMICard
                    bmi={bmiValue}
                    thresholds={[
                      {
                        maxBmi: 0,
                        title: "BMI",
                        description: "",
                        color: "#e5e7eb",
                      },
                      {
                        maxBmi: 24,
                        isTargetRange: true,
                        title: "Good",
                        description: "",
                        color: ["#7dd3fc", "#06b6d4"],
                        statusMessage: {
                          text: "In range",
                          className: "bg-blue-50 text-blue-700",
                        },
                      },
                      {
                        maxBmi: Infinity,
                        title: "High",
                        description: "",
                        color: "#f97316",
                        statusMessage: {
                          text: "Check options",
                          className: "bg-orange-50 text-orange-600",
                        },
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Progress Indicators</h2>
              <p className="text-sm text-muted-foreground">
                Various progress bar styles
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 space-y-6">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={progress}
                onChange={(e) => setProgress(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Solid progress bar
                </p>
                <ProgressSolid
                  value={progress}
                  animated={false}
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Cells</p>
                <ProgressCells
                  value={progress}
                  steps={10}
                  filledClassName="bg-primary/80"
                  highlightCurrent
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Stretch variant</p>
                <ProgressStretch value={progress} steps={10} className="" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Numbered steps with labels & tooltips
                </p>
                <ProgressNumbered
                  value={progress}
                  highlightCurrent
                  steps={[
                    { label: "Info", tooltip: "Personal information" },
                    { label: "Address", tooltip: "Shipping address" },
                    { label: "Payment", tooltip: "Payment details" },
                    { label: "Review", tooltip: "Order review" },
                    { label: "Info", tooltip: "Personal information" },
                    { label: "Address", tooltip: "Shipping address" },
                    { label: "Payment", tooltip: "Payment details" },
                    { label: "Review", tooltip: "Order review" },
                    { label: "Info", tooltip: "Personal information" },
                    { label: "Address", tooltip: "Shipping address" },
                    { label: "Payment", tooltip: "Payment details" },
                    { label: "Review", tooltip: "Order review" },
                  ]}
                />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Multiple Choice</h2>
              <p className="text-sm text-muted-foreground">
                Checkbox-based selection with variants
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Default (icon)
                  </p>
                  <MultipleChoice
                    title="Select your options"
                    hint="Default icon indicator"
                    options={DEMO_OPTIONS}
                    value={selectedValues}
                    onChange={setSelectedValues}
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Checkbox left
                  </p>
                  <MultipleChoice
                    options={DEMO_OPTIONS}
                    value={selectedValues}
                    onChange={setSelectedValues}
                    checkboxPosition="left"
                    checkboxVariant="checkbox"
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Icon variant + fill + outline
                  </p>
                  <MultipleChoice
                    options={DEMO_OPTIONS}
                    value={selectedValues}
                    onChange={setSelectedValues}
                    checkboxVariant="icon"
                    showFillOnSelect
                    showOutlineOnSelect
                    showShadowOnSelect
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Show numbers
                  </p>
                  <MultipleChoice
                    options={DEMO_OPTIONS}
                    value={selectedValues}
                    onChange={setSelectedValues}
                    showNumbers
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Max selections = 2
                  </p>
                  <MultipleChoice
                    options={DEMO_OPTIONS}
                    value={selectedValues}
                    onChange={setSelectedValues}
                    maxSelections={2}
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Disabled</p>
                  <MultipleChoice
                    options={DEMO_OPTIONS}
                    value={[]}
                    onChange={() => { }}
                    disabled
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Custom styling
                  </p>
                  <MultipleChoice
                    options={DEMO_OPTIONS}
                    value={selectedValues}
                    onChange={setSelectedValues}
                    className="!bg-gray-50 p-5"
                    showFillOnSelect
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Single Choice</h2>
              <p className="text-sm text-muted-foreground">
                Radio-based selection with variants
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Default (icon)
                  </p>
                  <SingleChoice
                    title="Single choice"
                    options={DEMO_OPTIONS}
                    value={singleValue}
                    onChange={setSingleValue}
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Indicator left - radio
                  </p>
                  <SingleChoice
                    options={DEMO_OPTIONS}
                    value={singleValue}
                    onChange={setSingleValue}
                    indicatorPosition="left"
                    indicatorVariant="radio"
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Cells variant (rating)
                  </p>
                  <SingleChoice
                    options={RATING_OPTIONS}
                    value={ratingValue}
                    onChange={setRatingValue}
                    variant="cells"
                    itemsPerRow={5}
                  />

                  <p className="text-sm text-muted-foreground my-2">
                    Cells with emojis
                  </p>
                  <SingleChoice
                    options={ICON_OPTIONS}
                    value={ratingValue}
                    onChange={setRatingValue}
                    variant="cells"
                    itemsPerRow={4}
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Allow deselect
                  </p>
                  <SingleChoice
                    options={DEMO_OPTIONS}
                    value={singleValue}
                    onChange={setSingleValue}
                    allowDeselect
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Disabled</p>
                  <SingleChoice options={DEMO_OPTIONS} value={""} disabled />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Custom styles
                  </p>
                  <SingleChoice
                    options={DEMO_OPTIONS}
                    value={singleValue}
                    onChange={setSingleValue}
                    showFillOnSelect
                    showOutlineOnSelect={false}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Input Field</h2>
              <p className="text-sm text-muted-foreground">
                Text input with various configurations
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Default (md)
                  </p>
                  <Input placeholder="Your name" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Small (sm)
                  </p>
                  <Input size="sm" placeholder="Compact size" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    With suffix
                  </p>
                  <Input placeholder="150" type="number" suffix="lbs" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Disabled</p>
                  <Input placeholder="Can't edit" disabled />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    With error
                  </p>
                  <Input
                    placeholder="Required"
                    errorMessage="This field is required"
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Custom wrapper
                  </p>
                  <Input
                    placeholder="Custom"
                    wrapperClassName="!bg-gray-50 border-2 border-black"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Masked Input</h2>
              <p className="text-sm text-muted-foreground">
                Input with formatting masks
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Phone (tel preset)
                  </p>
                  <MaskedInput
                    preset="tel"
                    value={phone}
                    onChange={setPhone}
                    separate
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Phone (no mask shown)
                  </p>
                  <MaskedInput
                    preset="tel"
                    value={phone}
                    onChange={setPhone}
                    showMask={false}
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Date (with calendar)
                  </p>
                  <MaskedInput preset="date" value={date} onChange={setDate} />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Date (dropdown months)
                  </p>
                  <MaskedInput
                    preset="date"
                    value={date}
                    onChange={setDate}
                    calendarCaptionLayout="dropdown-months"
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Custom mask
                  </p>
                  <MaskedInput
                    mask="____-____-____-____"
                    replacement={{ _: /\d/ }}
                  />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Disabled</p>
                  <MaskedInput preset="tel" disabled />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Before/After Card</h2>
              <p className="text-sm text-muted-foreground">
                Transformation showcase card
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <BeforeAfterCard name="Alex, 34" className="w-full h-200" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
