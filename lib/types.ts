import * as React from "react";

// =============================================================================
// Choice Option Types (for single-choice and multiple-choice components)
// =============================================================================

export type ChoiceOption = {
  /** Unique value for the option */
  value: string;
  /** Display label for the option */
  label: React.ReactNode;
  /** Optional badge text displayed next to the label */
  badge?: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Clears the remaining selected options when selected */
  none?: boolean;
};
