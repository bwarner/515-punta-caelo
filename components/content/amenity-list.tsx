export interface AmenityListProps {
  /** List of amenities */
  items: string[];
}

/**
 * Styled list of amenities with bullet points.
 */
export function AmenityList({ items }: AmenityListProps) {
  return (
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <span className="text-primary">•</span> {item}
        </li>
      ))}
    </ul>
  );
}
