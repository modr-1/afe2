"use client";

import ProgramBuilder from "@/components/WorkoutProgram";

export default function TrainerWorkoutProgramsPage() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Workouts</h1>
            <ProgramBuilder />
        </div>
    );
}

