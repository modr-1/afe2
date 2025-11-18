"use client";

import { useMemo, useState } from "react";
import ExerciseCard from "./ExerciseCard";

type Exercise = {
    id: string;
    name: string;
    sets?: number;
    reps?: number;
};

function uid() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto)
        return crypto.randomUUID();
    return `id_${Date.now().toString(36)}_${Math.random()
        .toString(36)
        .slice(2, 8)}`;
}

export default function ProgramBuilder() {
    const [available, _setAvailable] = useState<Exercise[]>([
        { id: "a1", name: "Squat", sets: 4, reps: 8 },
        { id: "a2", name: "Bench Press", sets: 4, reps: 8 },
        { id: "a3", name: "Deadlift", sets: 4, reps: 8 },
        { id: "a4", name: "Overhead Press", sets: 4, reps: 8 },
        { id: "a5", name: "Pull Ups", sets: 4, reps: 8 },
    ]);

    const [program, setProgram] = useState<Exercise[]>([
        { id: uid(), name: "Squat", sets: 4, reps: 8 },
        { id: uid(), name: "Bench Press", sets: 4, reps: 8 },
    ]);

    const [selectedAvailableId, setSelectedAvailableId] = useState<string | null>(
        null
    );
    const [selectedProgramId, setSelectedProgramId] = useState<string | null>(
        null
    );

    const selectedAvailable = useMemo(
        () => available.find((x) => x.id === selectedAvailableId) || null,
        [available, selectedAvailableId]
    );
    const selectedProgramIndex = useMemo(
        () => program.findIndex((x) => x.id === selectedProgramId),
        [program, selectedProgramId]
    );

    const addSelected = () => {
        if (!selectedAvailable) return;
        const item: Exercise = {
            id: uid(),
            name: selectedAvailable.name,
            sets: 3,
            reps: 10,
        };
        setProgram((prev) => [...prev, item]);
    };

    const removeSelected = () => {
        if (selectedProgramIndex < 0) return;
        setProgram((prev) => prev.filter((_, i) => i !== selectedProgramIndex));
        setSelectedProgramId(null);
    };

    const moveUp = () => {
        if (selectedProgramIndex <= 0) return;
        setProgram((prev) => {
            const next = prev.slice();
            const [item] = next.splice(selectedProgramIndex, 1);
            next.splice(selectedProgramIndex - 1, 0, item);
            return next;
        });
    };

    const moveDown = () => {
        if (selectedProgramIndex < 0 || selectedProgramIndex >= program.length - 1)
            return;
        setProgram((prev) => {
            const next = prev.slice();
            const [item] = next.splice(selectedProgramIndex, 1);
            next.splice(selectedProgramIndex + 1, 0, item);
            return next;
        });
    };

    const save = () => {
        // Placeholder for save functionality
        alert("Program saved!");
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
                {/* Left: Available */}
                <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 self-start">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        Available Exercises
                    </h2>
                    <ul className="space-y-2">
                        {available.map((ex) => {
                            const selected = ex.id === selectedAvailableId;
                            return (
                                <li key={ex.id}>
                                    <ExerciseCard
                                        name={ex.name}
                                        sets={ex.sets}
                                        reps={ex.reps}
                                        selected={selected}
                                        onClick={() =>
                                            setSelectedAvailableId(selected ? null : ex.id)
                                        }
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </section>

                {/* Middle: Controls */}
                <div
                    className="
                      self-start
                      md:sticky md:top-4
                      w-[140px]
                      flex md:flex-col gap-2
                      justify-center md:justify-center
                      items-center md:items-stretch
                    "
                >
                    <button
                        type="button"
                        onClick={addSelected}
                        disabled={!selectedAvailable}
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                        title="Add selected available exercise to program"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={removeSelected}
                        disabled={selectedProgramIndex < 0}
                        className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
                        title="Remove selected exercise from program"
                    >
                        Remove
                    </button>

                    <div className="hidden md:flex flex-col gap-2 mt-2">
                        <button
                            type="button"
                            onClick={moveUp}
                            disabled={selectedProgramIndex <= 0}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50 rounded disabled:opacity-50"
                            title="Move selected exercise up"
                        >
                            Up
                        </button>
                        <button
                            type="button"
                            onClick={moveDown}
                            disabled={
                                selectedProgramIndex < 0 ||
                                selectedProgramIndex >= program.length - 1
                            }
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50 rounded disabled:opacity-50"
                            title="Move selected exercise down"
                        >
                            Down
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={save}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50 rounded disabled:opacity-50"
                        title="Move selected exercise down"
                    >
                        Save
                    </button>
                </div>

                {/* Right: Program */}
                <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 self-start">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Client Program
                        </h2>
                    </div>
                    <ul className="space-y-2">
                        {program.map((ex) => {
                            const selected = ex.id === selectedProgramId;
                            return (
                                <li key={ex.id}>
                                    <ExerciseCard
                                        name={ex.name}
                                        sets={ex.sets}
                                        reps={ex.reps}
                                        selected={selected}
                                        onClick={() =>
                                            setSelectedProgramId(selected ? null : ex.id)
                                        }
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </div>
        </div>
    );
}
