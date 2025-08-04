import { useEffect, useState } from "react"
import { baseUrl } from "../config"
import { toast } from "react-toastify";


export const usePublicShareQuery = ()=>{
    const [publicShare,setPublicShare] = useState(false);
    const [statusLoading,setStatusLoading] = useState<boolean>(false);
    const [isError,setIsError] = useState<boolean>(false);
    useEffect(()=>{
        const func = async ()=>{
            try {
                setStatusLoading(true);
                const username = localStorage.getItem('username');
                if(!username) return;
                const response = await fetch(`${baseUrl}/checkPublicStatus/${username}`);
                if(!response.ok){
                    setPublicShare(false);
                    setStatusLoading(false);
                    setIsError(true);
                }
                const parsedResponse = await response.json();
                setPublicShare(parsedResponse.publicShare);
                setStatusLoading(false);
            } catch (error) {
                console.error('error');
                toast.error('Something Unexpected happened');
            }
        }
        func();
    },[])
    return {publicShare,isError,statusLoading};
}