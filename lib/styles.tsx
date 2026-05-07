import { cn } from "@/lib/utils";

// =============================================================================
// Option Styles (for choice components)
// =============================================================================

export const optionStyles = {
  /** Base option container */
  base: "h-15 inline-flex items-center justify-between w-full bg-background border rounded-lg p-4 cursor-pointer transition-all",
  /** Prevent accidental text selection during repeated clicks */
  textSelectionDisabled: "select-none",
  /** Hover state */
  hover: "hover:ring-1 hover:ring-border",
  /** Selected state - outline (ring) */
  outlineOnSelect: "ring-2 ring-primary hover:ring-2 hover:ring-primary",
  /** Selected state - fill background */
  fillOnSelect: "bg-primary/10",
  /** Selected state - shadow */
  shadowOnSelect: "shadow-md shadow-primary/25",
  /** Disabled state */
  disabled: "opacity-50 cursor-not-allowed",
};

/** Get combined option classes based on state */
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

// =============================================================================
// Field Header Styles (title + hint)
// =============================================================================

export const fieldHeaderStyles = {
  /** Container for title and hint */
  container: "mb-3 space-y-1",
  /** Title styles */
  title: "text-3xl leading-9 font-medium",
  /** Title styles for small size */
  titleSm: "text-xl leading-6 font-medium",
  /** Hint/description styles */
  hint: "text-muted-foreground",
  /** Hint/description styles for small size */
  hintSm: "text-sm text-muted-foreground",
};

// =============================================================================
// Input Styles (for input and input-mask components)
// =============================================================================

export const inputStyles = {
  /** Base input wrapper (container with border) */
  wrapper: "relative flex items-center w-full border rounded-2xl bg-background hover:border-primary transition-[color,border-color] overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary",
  /** Default size wrapper */
  wrapperDefault: "h-[60px]",
  /** Small size wrapper */
  wrapperSm: "h-10 !rounded-lg",
  /** Base input element */
  input: "flex-1 w-full bg-transparent border-0 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  /** Default size input */
  inputDefault: "px-5 py-4 text-md placeholder:text-md",
  /** Small size input */
  inputSm: "h-[38px] p-2 text-sm font-light placeholder:text-sm placeholder:font-light",
  /** Suffix container */
  suffix: "flex items-center pl-2 pr-5 text-muted-foreground text-sm",
  /** Error state */
  error: "border-destructive focus-within:outline-destructive/20 focus-within:border-destructive",
  /** Autofill state - apply to wrapper when input is autofilled */
  autofill: "[&:has(input:-webkit-autofill)]:bg-[#e8f0fe]",
  /** Autofill override for input element (neutralises browser background) */
  inputAutofill: "autofill:[box-shadow:inset_0_0_0_9999px_#e8f0fe] autofill:[-webkit-text-fill-color:var(--color-foreground)]",
};

/** Get input wrapper classes based on size and error state */
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

/** Get input element classes based on size */
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
