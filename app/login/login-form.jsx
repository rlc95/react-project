"use client";

import { loginUser } from '@/lib/apis/server';
import { useState } from 'react';


export default function LoginForm(prop){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError]= useState("");
  const [passwordError, setPasswordError] = useState("");

  const {title} = prop; //destructure 

  const validatForm = (e) =>{

    if (!email) {
      setEmailError("Email is required");
      return false;
    }else{
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      return false;
    }else{
      setPasswordError("");
    }

    return true;

  }

  const submitData = async (e) => {
    e.preventDefault();

    const Isvalid = validatForm();

    if (Isvalid) {
      console.log("Data",email," ",password);
      const login = await loginUser({email:email, password:password})
      console.log("login",login);
    }
    
    
  }


    return(

        <div className="w-[380px] mx-auto ">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4">
        <form onSubmit={submitData} className="space-y-6">
          <h3 className="text-center text-lg font-semibold text-gray-900">{title}</h3>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2">
              Your Email
            </label>

            <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value) }
            id="email"
            className="bg-gray-58 border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-offset-2 focus:ring-blue-300 focus:border-blue-500 w-full p-2.5" placeholder="yourname@gmail.com" />
          
            {emailError && <div className='text-red-600 text-xs mt-2 ml-1'>{emailError}</div>}
          
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-900 block mb-2">
              Your Password
            </label>

            <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-offset-2 focus:ring-blue-300 focus:border-blue-500 w-full p-2.5" placeholder="••••••••" />
          
          {passwordError && <div className='text-red-600 text-xs mt-2 ml-1'>{passwordError}</div>}
          </div>


          <div className="flex justify-between">

            <div className="flex items-start">

                <div className="flex items-center h-5">
                    <input type="checkbox" name="remember" id="remember" className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded cursor-pointer" />
                </div>


                <div className="text-sm ml-3">
                    <label htmlFor="remember" className="font-medium text-gray-900">Remember Me</label>
                </div>
            </div>

            <a href="/forget-password" className="text-sm text-blue-700 font-medium hover:underline">Forget Password</a>
          </div>

          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Sign In</button>

          <div className="flex justify-center text-sm font-medium text-gray-500 space-x-2">
            <span>Not Registered?</span>
            <a href="/register" className="text-blue-700 hover:underline">Craete an account</a>
          </div>

        </form>
        </div>
      </div>

    )

}