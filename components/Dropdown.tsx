"use client";

import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

export default function Dropdown({ Role, Id }: { Role: string | null, Id: string | null }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="hover:underline focus:outline-none"
            >
                {Role || "Unknown"}: {Id || "Unknown"}
            </button>
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 text-black dark:text-white shadow rounded-lg p-4 w-64">
                    <p className="text-lg font-semibold mb-2 p-2">Info</p>
                    <div className="flex flex-col space-y-2">
                        <a
                            href="/api/auth/logout"
                            className="block px-4 py-2 text-center bg-gray-800 text-white rounded hover:bg-gray-600"
                        >
                            <FaSignOutAlt className="inline mr-2 right-0" />
                            Logout
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}