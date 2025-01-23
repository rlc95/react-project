

import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server"

export const GET = async (req) => {

    try {
        const client = await clientPromise();
        const db = client.db("sample_mflix"); // db name

        const movies= await db
            .collection("movies")
            .find({})
            .sort({metacritic: -1})
            .limit(10)
            .toArray();

        return NextResponse.json(movies);
    } catch (error) {
        console.log("DBDataErr",error);
        return NextResponse.json({error: "Invaild server error"},{status: 500});
    }

}