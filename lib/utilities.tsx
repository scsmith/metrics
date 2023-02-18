export function underscoreToTitleCase(underscored: string): string {
  return underscored
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
