"use client";

type ExerciseCardProps = {
    name: string;
    sets?: number;
    reps?: number;
    selected?: boolean;
    onClick?: () => void;
    className?: string;
};

export default function ExerciseCard({
    name,
    sets,
    reps,
    selected = false,
    onClick,
    className = "",
}: ExerciseCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                "w-full text-left p-3 rounded-md border transition hover:shadow-sm " +
                (selected
                    ? "border-blue-500 ring-2 ring-blue-300 dark:ring-blue-600"
                    : "border-gray-200 dark:border-gray-700") +
                (className ? ` ${className}` : "")
            }
        >
            <div>
                <div className="text-gray-900 dark:text-gray-100">{name}</div>
                {(sets !== undefined || reps !== undefined) && (
                    <div className="text-xs text-gray-500 dark:text-gray-300">
                        {sets ?? "-"} sets × {reps ?? "-"} reps
                    </div>
                )}
            </div>
        </button>
    );
}