"use client";

import * as React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface BeforeAfterCardProps {
  name: string;
  beforeImage?: string;
  afterImage?: string;
  className?: string;
  badgeContent?: React.ReactNode;
}

export function BeforeAfterCard({
  name,
  beforeImage,
  afterImage,
  className,
  badgeContent = (
    <>
      <Check className="size-4" />
      <span>Lost 28 lbs</span>
    </>
  ),
}: BeforeAfterCardProps) {
  return (
    <div
      className={cn(
        "w-90 h-89 flex flex-col rounded-xl overflow-hidden border border-border bg-card",
        className,
      )}
    >
      <div className="flex items-stretch gap-px flex-1 min-h-0">
        <div className="flex-1 relative">
          {beforeImage ? (
            <Image
              src={beforeImage}
              alt="Before"
              fill
              className="w-full h-full object-cover rounded-tl-xl"
            />
          ) : (
            <div className="w-full h-full rounded-tl-xl bg-chart-4" />
          )}

          <div className="absolute left-3 bottom-3">
            <Badge variant="default" className="bg-chart-2">
              Before
            </Badge>
          </div>
        </div>

        <div className="flex-1 relative">
          {afterImage ? (
            <Image
              src={afterImage}
              alt="After"
              fill
              className="w-full h-full object-cover rounded-tr-xl"
            />
          ) : (
            <div className="w-full h-full rounded-tr-xl bg-chart-2" />
          )}

          <div className="absolute left-3 bottom-3">
            <Badge variant="default" className="bg-chart-4">
              After
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between shrink-0">
        <span className="font-semibold text-lg">{name}</span>

        {badgeContent && (
          <Badge variant="default" className="gap-1 text-base">
            {badgeContent}
          </Badge>
        )}
      </div>
    </div>
  );
}
