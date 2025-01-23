

import { Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from "@/components/ui/card";
import { getMovies } from "@/lib/apis/server"
import Image from "next/image";

export default async function Dashboardpage() {

  const moviesQuery = await getMovies();
  console.log("movies",moviesQuery);
  
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

              {moviesQuery?.length && moviesQuery.map((movies) => (
                <div key={movies?._id} className="h-96">
                  
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>{movies?.title}</CardTitle>
                      <CardDescription className="sr-only">{movies?.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center bg-black w-full h-[276px] mb-4 rounded">
                      <Image src={movies?.poster} alt={movies?.title} width={200} height={400} className="h-full w-auto object-contain" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      
                    </CardFooter>
                  </Card>

                </div>
              ))};     
            
        </div>
     </div>

    </main>
    
  )
}
