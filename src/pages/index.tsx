export default function Home() {
  return (
      //center the content of main
    <main className="flex flex-col items-center justify-center min-h-screen space-y-8 py-2">

        <h1 className="text-6xl font-bold text-center">
            Welcome to my computer simulations
        </h1>

        <div className="flex flex-row items-center justify-between space-x-2">
            <a href="/tasks/roots" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Non Linear Equation Roots
            </a>
            <a href="" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                TODO
            </a>
            <a href="" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                TODO
            </a>
            <a href="" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                TODO
            </a>
            <a href="" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                TODO
            </a>
        </div>

      
    </main>
  )
}
