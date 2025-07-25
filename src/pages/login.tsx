import { useState, type ChangeEvent } from "react"
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { baseUrl } from "../config";
import { Button } from "../components/ui/Button";


interface LoginProps{};

interface dataProps{
    username: string;
    password: string;
}


export const Login: React.FC<LoginProps> = ()=>{
    const [data,setData] = useState<dataProps>({
        username:'',
        password:''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleLogin = async (endpoint: 'signup'|'signin'): Promise<void> =>{
        setIsLoading(true);
        const url = baseUrl+'/'+ endpoint;
        try{
            const response = await fetch(url,{
                headers:{
                    'Content-Type':'application/json'
                },
                method: 'post',
                body: JSON.stringify(data)
            })
            const parsedResponse = await response.json();
            console.log(parsedResponse.message);
            if(parsedResponse.status==200){
                toast.success(parsedResponse.message);
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
        setIsLoading(false);
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>{
        const {name,value} = e.target;
        setData({
            ...data,
            [name]:value
        })
    }
    return(
        <div className="h-screen w-full flex justify-center items-center">
            <div className="lg:w-64 w-56 ">
                <div 
                className="outline-2 dark:outline-primary-black outline-primary-white px-4 py-8 rounded-md flex-col gap-4 flex " >
                    <div className="flex flex-col gap-4">
                        <input type="text" placeholder="username" onChange={(e: ChangeEvent<HTMLInputElement>)=>handleChange(e)} required={true} name="username" className="pb-1 pl-2 outline-1 dark:outline-primary-black outline-primary-white  rounded-md" />
                        <input type="password" onChange={(e: ChangeEvent<HTMLInputElement>)=>handleChange(e)} placeholder="password" required={true} name="password" className="pb-1 pl-2 outline-1 dark:outline-primary-black outline-primary-white  rounded-md" />
                    </div>
                    <div className="flex justify-around items-center h-16">
                        <Button text={"Signup"} onClick={()=>{
                            handleLogin('signup');
                        }} variant="regular" additionalStyles="rounded-md" />
                        <Button text={"Signin"} onClick={()=>{
                            handleLogin('signin');
                        }} variant="regular" additionalStyles="rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    )
}