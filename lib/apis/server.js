import ky from "ky";
import { api } from "../api";

export const loginUser = async (loginData) => {
    const response = await fetch ("http://localhost:3000/api/v1/login", {
        method:"POST",
        body: JSON.stringify({
            email: loginData?.email,
            password: loginData?.password
        }),
    });
}




export const getMovies = async () =>{

    try {
        const response = await api.get("movies", {cache:"no-store"});

        if (response.ok) {
            return response.json();
        }else{
            return {error:true, message: "something went wrong"}
        }
        

    }catch(error){
        console.log('serverErr',error);
        
        if (error) {
            const status  = error?.response?.status;
            const responseBody = await error?.response?.json();

            /*
            if (status == 401) {
                console.log("401");
            } else if(status == 500) {
                console.log("500");
            } else if(status == 484){
                console.log(status, responseBody.message);
                
            }*/
          // console.log("HTTP",status,responseBody);
           

        }else{
           // console.log("Unknown Error", error);
            
        }

        return undefined;
    }
}