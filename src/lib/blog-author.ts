export function getDisplayAuthorName(authorName?: string | null): string {
  const normalized = authorName?.trim();

  if (!normalized) {
    return "VacinaOne";
  }

  if (normalized.toLowerCase() === "dev-unti") {
    return "VacinaOne";
  }

  return normalized;
}