"use client";
import { Button } from "@/components/ui/button";
//client 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registrUser } from "@/lib/apis/server";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast";

const Default_Error = {
    error:false,
    message:""
};

export default function Registerform() {

    const [error,setError] = useState(Default_Error);
    const [isloading, setLoading] = useState(false);
    const { toast } = useToast();

    const registrsubmt = async (event) => {
        event.preventDefault();
        const formData = new FormData (event?.currentTarget);
        const name = formData.get("name").toString();
        const email = formData.get("email").toString();
        const password = formData.get("password") ?? "";
        const confrmpass = formData.get("conpass") ?? "";
        console.log("submityy",name,email,password,confrmpass);

        if (name && email && password && confrmpass) {

            if (password === confrmpass) {
                setError(Default_Error);

                setLoading(true);
                const respnseReg = await registrUser({name,email,password});
                setLoading(false);
                console.log('respnseReg',respnseReg);
                
                if (respnseReg.error) {
                    setError({error: true, message:respnseReg.error});
                }else{
                    toast({
                        variant: "success",
                        title: "User Registration Successfuly Completed.",
                        description: "Please Continue With Login",
                        action: <ToastAction altText="Login" className="hover:bg-green-700">Login</ToastAction>,
                      })
                }


            }else{
                setError({error: true, message:"Passwords don't match"});
            }
            
        }
        
    }

  return (
    <div className="flex justify-center items-center min-h-screen">
        <Card className="bg-blue-50/50 w-[350px]">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription> Enter your information to get started </CardDescription>
            </CardHeader>

            <form onSubmit={registrsubmt}>

                <CardContent>

                    <div className="flex flex-col space-y-4">

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input name="name" id="name" placeholder="Enter Name" />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" id="email" type="email" placeholder="Enter Email" />
                        </div>


                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input name="password" id="password" type="password" placeholder="Enter new password" />
                        </div>


                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="conpass">Confirm Password</Label>
                            <Input name="conpass" id="conpass" type="password" placeholder="Enter password again" />
                        </div>

                        <div className="flex justify-center">
                            {error?.error && <span className="text-red-600 text-sm text-center">{error.message}</span>}
                        </div>

                        <div className="flex justify-center gap-2 text-xs">
                            Already have an account?{" "} <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
                        </div>


                    </div>

                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button className="flex-1" type="submit" disabled={isloading}>
                        {isloading && <Loader2 className="animate-spin" />}
                        Register
                    </Button>
                </CardFooter>
            </form>

        </Card>
    </div>
  )
}
