import { cn } from "@/lib/utils";

export const optionStyles = {
  base: "h-15 inline-flex items-center justify-between w-full bg-background border rounded-lg p-4 cursor-pointer transition-all",
  textSelectionDisabled: "select-none",
  hover: "hover:ring-1 hover:ring-border",
  outlineOnSelect: "ring-2 ring-primary hover:ring-2 hover:ring-primary",
  fillOnSelect: "bg-primary/10",
  shadowOnSelect: "shadow-md shadow-primary/25",
  disabled: "opacity-50 cursor-not-allowed",
};

export const getOptionClassName = ({
  selected = false,
  highlightOnHover = true,
  showOutlineOnSelect = true,
  showFillOnSelect = false,
  showShadowOnSelect = false,
  disabled = false,
  allowTextSelection = false,
}: {
  selected?: boolean;
  highlightOnHover?: boolean;
  showOutlineOnSelect?: boolean;
  showFillOnSelect?: boolean;
  showShadowOnSelect?: boolean;
  disabled?: boolean;
  allowTextSelection?: boolean;
}) =>
  cn(
    optionStyles.base,
    !allowTextSelection && optionStyles.textSelectionDisabled,
    highlightOnHover && optionStyles.hover,
    selected && showOutlineOnSelect && optionStyles.outlineOnSelect,
    selected && showFillOnSelect && optionStyles.fillOnSelect,
    selected && showShadowOnSelect && optionStyles.shadowOnSelect,
    disabled && optionStyles.disabled,
  );

export const fieldHeaderStyles = {
  container: "mb-3 space-y-1",
  title: "text-3xl leading-9 font-medium",
  titleSm: "text-xl leading-6 font-medium",
  hint: "text-muted-foreground",
  hintSm: "text-sm text-muted-foreground",
};

export const inputStyles = {
  wrapper:
    "relative flex items-center w-full border rounded-2xl bg-background hover:border-primary transition-[color,border-color] overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary",
  wrapperDefault: "h-[60px]",
  wrapperSm: "h-10 !rounded-lg",
  input:
    "flex-1 w-full bg-transparent border-0 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  inputDefault: "px-5 py-4 text-md placeholder:text-md",
  inputSm:
    "h-[38px] p-2 text-sm font-light placeholder:text-sm placeholder:font-light",
  suffix: "flex items-center pl-2 pr-5 text-muted-foreground text-sm",
  error: "border-destructive focus-within:outline-destructive/20 focus-within:border-destructive",
  autofill:
    "[&:has(input:-webkit-autofill)]:bg-[#e8f0fe]",
  inputAutofill:
    "autofill:[box-shadow:inset_0_0_0_9999px_#e8f0fe] autofill:[-webkit-text-fill-color:var(--color-foreground)]",
};

export const getInputWrapperClassName = ({
  size = "md",
  hasError = false,
}: {
  size?: "md" | "sm";
  hasError?: boolean;
}) =>
  cn(
    inputStyles.wrapper,
    inputStyles.autofill,
    size === "sm" ? inputStyles.wrapperSm : inputStyles.wrapperDefault,
    hasError && inputStyles.error,
  );

export const getInputClassName = ({
  size = "md",
  hasSuffix = false,
}: {
  size?: "md" | "sm";
  hasSuffix?: boolean;
}) =>
  cn(
    inputStyles.input,
    inputStyles.inputAutofill,
    size === "sm" ? inputStyles.inputSm : inputStyles.inputDefault,
    hasSuffix && "pr-0",
  );
