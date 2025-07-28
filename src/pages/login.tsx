import { useRef, useState, type ChangeEvent } from "react"
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { baseUrl } from "../config";
import { Button } from "../components/ui/Button";

import {Navigate, useNavigate} from 'react-router-dom';


interface LoginProps{
    setIsAuthenticated: (b:boolean)=>void;
};

export const Login: React.FC<LoginProps> = ({setIsAuthenticated})=>{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const handleLogin = async (endpoint: 'signup'|'signin'): Promise<void> =>{
        const url = baseUrl+'/'+ endpoint;
        const data = {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value
        }
        try{
            const response = await fetch(url,{
                headers:{
                    'Content-Type':'application/json'
                },
                method: 'post',
                body: JSON.stringify(data)
            })
            const parsedResponse = await response.json();
            if(response.status==200){
                toast.success(parsedResponse.message);
                if(parsedResponse.token){
                    localStorage.setItem('token',`Bearer ${parsedResponse.token}`);
                    setIsAuthenticated(true);
                    navigate('/');
                }
            }else{
                toast.error(parsedResponse.message);
            }
        }catch(error){
            if (error instanceof Error){
                console.error(error.message);
            }else{
                console.error('Unexpected Error Occurred!');
            }
        }
    }
    return(
        <div className="h-screen w-full flex justify-center items-center">
            <div className="lg:w-64 w-56 ">
                <div 
                className="outline-2 dark:outline-primary-black outline-primary-white px-4 py-8 rounded-md flex-col gap-4 flex " >
                    <div className="flex flex-col gap-4">
                        <input type="text" placeholder="username" ref={usernameRef} required={true} name="username" className="pb-1 pl-2 outline-1 dark:outline-primary-black outline-primary-white  rounded-md" />
                        <input type="password" ref={passwordRef} placeholder="password" required={true} name="password" className="pb-1 pl-2 outline-1 dark:outline-primary-black outline-primary-white  rounded-md" />
                    </div>
                    <div className="flex justify-around items-center h-16">
                        <Button text={"Signup"} isLoading={isLoading} onClick={()=>{
                            handleLogin('signup');
                        }} variant="regular" additionalStyles="rounded-md" />
                        <Button text={"Signin"} isLoading={isLoading} onClick={()=>{
                            handleLogin('signin');
                        }} variant="regular" additionalStyles="rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    )
}