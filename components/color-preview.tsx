const colors = [
  { name: "sand", label: "Sand", class: "bg-sand" },
  { name: "shell", label: "Shell", class: "bg-shell" },
  { name: "driftwood", label: "Driftwood", class: "bg-driftwood" },
  { name: "seaglass", label: "Seaglass", class: "bg-seaglass" },
  { name: "coral", label: "Coral", class: "bg-coral" },
  { name: "sky", label: "Sky", class: "bg-sky" },
  { name: "accent", label: "Accent", class: "bg-accent" },
  { name: "primary", label: "Primary", class: "bg-primary" },
  { name: "secondary", label: "Secondary", class: "bg-secondary" },
  { name: "muted", label: "Muted", class: "bg-muted" },
  { name: "card", label: "Card", class: "bg-card" },
  { name: "background", label: "Background", class: "bg-background" },
  { name: "foreground", label: "Foreground", class: "bg-foreground" },
];

export default function CustomColorPreview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {colors.map(({ name, label, class: bgClass }) => (
        <div
          key={name}
          className={`rounded-lg p-6 ${bgClass} text-gray-900 shadow`}
        >
          <strong className="block text-sm uppercase">{label}</strong>
          <span className="text-xs">{bgClass}</span>
        </div>
      ))}
    </div>
  );
}
