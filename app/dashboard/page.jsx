

import { Badge } from "@/components/ui/badge";
import { Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from "@/components/ui/card";
import { getMovies } from "@/lib/apis/server";
import { SiImdb } from "react-icons/si";
import { FaStar } from "react-icons/fa";
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
                <div key={movies?._id} className="h-[480px]">
                  
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>{movies?.title} <span className="text-xs text-neutral-400 font-normal">{movies?.year ?? "N/A"}</span></CardTitle>
                      <CardDescription className="sr-only">{movies?.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center bg-black w-full h-[220px] mb-4 rounded">
                      <Image src={movies?.poster} alt={movies?.title} width={200} height={400} className="h-full w-auto object-contain" priority={true} />
                      </div>
                      <div className="flex flex-col justify-between h-[154px]">
                        <p className="line-clamp-3">{movies?.plot}</p>
                        <div className="text-sm text-blue-900 font-semibold">
                          {movies?.genres?.length && movies?.genres?.join(" / ")}
                        </div>
                        <div className="flex flex-row justify-between items-center">
                          <Badge variant="success" >Rated: {movies?.rated ?? "N/A"} </Badge>

                          <div className="flex flex-row gap-1 items-center" title="IMDB Rating">
                              {/*<SiImdb />*/}
                              <FaStar className="text-yellow-500" />
                              <span className="text-sm font-semibold">  
                                {movies?.imdb?.rating ?? 0 }/10
                              </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between"></CardFooter>
                  </Card>
                </div>
            ))};     
            
        </div>
     </div>

    </main>
    
  )
}
