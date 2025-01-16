import { getMovies } from "@/lib/apis/server"

export default async function Dashboardpage() {

  const {movies} = await getMovies();
  console.log("movies",movies);
  
  return (
    <main>
    
     <nav>
        <div className="bg-blue-300 w-full h-16 flex justify-start items-center">
            <div className="container">
              <h1 className="text-black font-bold text-xl">Mflix Dashboard</h1>
            </div>
        </div>
     </nav>

     <div className="container mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            
            {/*
            <div className="h-96 bg-yellow-400">Div 2</div>
            <div className="h-96 bg-blue-400">Div 3</div>
            <div className="h-96 bg-orange-400">Div 4</div>
            <div className="h-96 bg-red-400">Div 5</div>
            <div className="h-96 bg-purple-400">Div 6</div>
            <div className="h-96 bg-lime-400">Div 7</div>
            <div className="h-96 bg-cyan-400">Div 8</div> */}

              {movies?.length && movies.map((movies) => (
                <div key={movies?.id} className="h-96 bg-green-400">{movies?.title}</div>
              ))};

        </div>
     </div>


    </main>
    
  )
}
