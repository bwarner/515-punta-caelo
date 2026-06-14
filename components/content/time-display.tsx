export interface TimeDisplayProps {
  /** The time to display (e.g., "3 PM", "11 AM") */
  time: string;
  /** Label below the time (e.g., "Check-in", "Check-out") */
  label: string;
}

/**
 * Large time display used for check-in/check-out times.
 */
export function TimeDisplay({ time, label }: TimeDisplayProps) {
  return (
    <div className="bg-white mx-4 mt-6 rounded-lg overflow-hidden">
      <div className="px-6 py-6 text-center">
        <div className="text-6xl font-light tracking-wide">{time}</div>
        <div className="text-xl font-semibold tracking-widest uppercase mt-2">
          {label}
        </div>
      </div>
    </div>
  );
}
