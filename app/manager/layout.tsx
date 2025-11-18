import { cookies } from "next/headers";
import Dropdown from "../../components/Dropdown";

export default async function TrainerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const trainerId = (await cookies()).get("userId")?.value || null;

    return (
        <div className="h-screen flex flex-col">
            {/* Navigation Bar */}
            <nav className="dark:bg-gray-800 text-white p-4 flex justify-between items-center">
                {/* Navigation Links */}
                <ul className="flex space-x-4">
                    <li>
                        <a href="/trainer/home" className="hover:underline">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/trainer/clients" className="hover:underline">
                            Clients
                        </a>
                    </li>
                    <li>
                        <a href="/trainer/workout-programs" className="hover:underline">
                            Workouts
                        </a>
                    </li>
                </ul>

                {/* Trainer Info and Logout */}
                <Dropdown Role="Manager" Id={trainerId} />
            </nav>

            {/* Page Content */}
            <main className="flex-1">{children}</main>
        </div>
    );
}