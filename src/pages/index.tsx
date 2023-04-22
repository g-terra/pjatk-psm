import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen space-y-8 py-2">
            <h1 className="text-6xl font-bold text-center">
                Welcome to my computer simulations
            </h1>
            <div className="flex flex-row items-center justify-between space-x-2">
                <Link href="/tasks/roots">
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Non Linear Equation Roots
                    </a>
                </Link>
                <Link href="">
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        TODO
                    </a>
                </Link>
                <Link href="">
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        TODO </a>
                </Link>
                <Link href="">
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        TODO
                    </a>
                </Link>
                <Link href="">
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        TODO
                    </a>
                </Link>
            </div>
        </main>
    );
}
