import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen space-y-8 py-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center">
                Welcome to my computer simulations
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                <Link href="/tasks/roots">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Non Linear Equation Roots
                    </button>
                </Link>
                <Link href="/tasks/collisions">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Collisions
                    </button>
                </Link>
                <Link href="/tasks/random-walk" passHref>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Random Walk
                    </button>
                </Link>
                <Link href="/tasks/integrals" passHref>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Integrals
                    </button>
                </Link>
                <Link href="/tasks/monte-carlo" passHref>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Monte Carlo area
                    </button>
                </Link>
            </div>
        </main>
    );
}
