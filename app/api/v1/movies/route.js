import { NextResponse } from "next/server"


const Movie = [{id:1, title:"load of the ring"},
    {id:2, title:"scooby doo"},
    {id:3, title:"zooro"},
    {id:4, title:"hobbit"},
    {id:5, title:"harry potter 1"},
    {id:6, title:"harry potter 2"},
    {id:7, title:"harry potter 3"},
    {id:8, title:"harry potter 4"},
];


export const GET = async (req) => {
    return NextResponse.json({success: true, movies: Movie })

}