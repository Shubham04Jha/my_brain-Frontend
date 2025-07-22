import { useState } from "react"
import {toast} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import { baseUrl } from "../config";


export const Login = ()=>{
    return(
        <div className="h-screen w-full flex justify-center items-center">
            <div className="lg:w-96 w-64 ">
                <form action="" className="outline-2 dark:outline-accent-black outline-accent-white p-4 rounded-md flex-col gap-4 flex " >
                    <div className="flex flex-col gap-4">
                        <input type="text" placeholder="username" className="pb-1 pl-2 outline-1 dark:outline-accent-black outline-accent-white  rounded-md" />
                        <input type="password" placeholder="password" className="pb-1 pl-2 outline-1 dark:outline-accent-black outline-accent-white  rounded-md" />
                    </div>
                    <div className="flex justify-center "><input type="submit"  className={"outline-1 dark:outline-accent-black outline-accent-white py-1 px-2 rounded-md"} value={"Signup"} /></div>
                </form>
            </div>
        </div>
    )
}