import { ApiError } from "@/lib/api";
import type { Dictionary } from "./translations";

/**
 * Resolves a caught error to a displayable message in the current language.
 * ApiError codes map to dict.api.error[code]; a plain Error's own message is
 * shown as-is (this is how backend-supplied text passes through untranslated —
 * that's a separate, later step, not something this helper does).
 */
export function getErrorMessage(err: unknown, dict: Dictionary, fallback: string): string {
  if (err instanceof ApiError) {
    return dict.api.error[err.code];
  }
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return fallback;
}
