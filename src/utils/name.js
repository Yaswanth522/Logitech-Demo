export function nameFromEmail(email) {
  const local = email.split("@")[0] || "";
  const words = local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase());
  return words.join(" ") || "there";
}

export function initialsFromName(name) {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  return parts
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}
