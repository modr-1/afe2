"use client";

import { useState } from "react";

export interface TrainerDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    accountType: "PersonalTrainer";
}

export default function CreateTrainerPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState<string>("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        const trainerData: TrainerDTO = {
            firstName,
            lastName,
            email,
            password,
            accountType: "PersonalTrainer",
        };

        try {
            const response = await fetch("/api/trainers/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(trainerData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Login failed");
            }

            const data = await response.json();
            console.log("Trainer created:", data);

            setStatus("success");
            setMessage("Trainer created");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
        } catch (err: any) {
            setStatus("error");
            setMessage(err?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="max-w-xl w-full p-6 bg-white dark:bg-gray-800 rounded shadow">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    Create Personal Trainer
                </h1>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">First Name</label>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 border rounded dark:bg-gray-900 dark:border-gray-700"
                            placeholder="Jane Doe"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Last Name</label>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border rounded dark:bg-gray-900 dark:border-gray-700"
                            placeholder="Jane Doe"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded dark:bg-gray-900 dark:border-gray-700"
                            placeholder="jane@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded dark:bg-gray-900 dark:border-gray-700"
                            placeholder="Enter a password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                    >
                        {status === "loading" ? "Creating..." : "Create trainer"}
                    </button>

                    {message && (
                        <p
                            className={
                                "text-sm mt-2 " +
                                (status === "success" ? "text-green-600" : "text-red-600")
                            }
                        >
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}