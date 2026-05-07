import * as React from "react";

export type ChoiceOption = {
  value: string;
  label: React.ReactNode;
  badge?: string;
  disabled?: boolean;
  none?: boolean;
};
