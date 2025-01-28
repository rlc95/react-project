
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {

    try {

        const {name,email,password} = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json ({ error: "Input fields are required"  },{status:400});
        }

        const client = await clientPromise();
        const db = client.db("sample_mflix"); // db name

        const existingusr = await db.collection("users").findOne({email});

        if (existingusr) {
            return NextResponse.json ({ error: "User already exists"  },{status:400});
        }


        const hashpasswrd = await bcrypt.hash(password,10);
        

        const insertuser = await db.collection("users").insertOne({ //insert register data to db
            name,
            email,
            password: hashpasswrd,
            createdAt: new Date()
        }); 

        if (insertuser && insertuser.acknowledged) {
            return NextResponse.json ({ 
                success: "user registration successful", 
                user: {
                    userId:insertuser.insertedId,
                    name,
                    email,
                },
             });
        } else {
            return NextResponse.json (
                { error: "User registration failed"  },
                {status:500}
            );
        }
       
    } catch (error) {
        return NextResponse.json (
            { error: "Datbase Error"  },
            {status:500}
        );
    }
}