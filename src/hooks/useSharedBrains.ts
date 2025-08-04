import { useEffect, useState } from "react";
import { baseUrl } from "../config";

export const useSharedBrains = ()=>{
    const [sharedBrains,setSharedBrains] = useState<string[] | null> (null);
    const [error,setError] = useState<string|null>(null);
    const [loading,setLoading] = useState<boolean>(false);
    const [temp, setTemp] = useState<boolean>(false);
    useEffect(()=>{
        const getUsers = async(): Promise<void> =>{
            try {
                setLoading(true);
                const response = await fetch(`${baseUrl}/sharedBrains`,{
                    method: 'get',
                    headers:{
                        'authorization':localStorage.getItem('token')||'',
                        'content-type':'application/json'
                    }
                })
                const data = await response.json();
                if(response.ok){
                    setSharedBrains(data.sharedBrains);
                }else{
                    let parse = await data.json();
                    setError(parse.message||'Unknown error occured ');
                }
            } catch (error) {
                if(error instanceof Error){ 
                    setError(error.message);
                    console.error(error.message);
                }
                else{ 
                    console.error('something unexpected happened');
                    setError('Unknow error occured');
                }
            }finally{
                setLoading(false);
            }
        }
        getUsers();
    },[temp]);
    const refetch = ()=>{
        setTemp(b=>!b);
    }

    return {sharedBrains,loading,error,refetch}
}