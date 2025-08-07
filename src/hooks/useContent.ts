import { useEffect, useState } from "react"
import { baseUrl } from "../config";

export interface Content{
    createdAt: number;
    isPublic: boolean;
    userId:{
        _id: string,
        username: string
    };
    tags?: [];
    title: string;
    thoughts: string;
    type: string;
    link: string;
}

export const useContent = (contentId: string,isOwner?: boolean)=>{
    const [toggle,setToggle] = useState<boolean>(false);
    const [data, setData] = useState<Content>();
    const [loading,setLoading] = useState<boolean>(false);
    useEffect(()=>{
        async function func(){
            try {
                setLoading(true);
                const response = await fetch(`${baseUrl}/${isOwner?'content':'shareContent'}/${contentId}`,{
                    method:'get',
                    headers:{
                        'authorization': localStorage.getItem('token')||''
                    }
                });
                const parsedResponse = await response.json();
                if(!response.ok){
                    console.log(parsedResponse.message);
                }else
                    setData(parsedResponse.content as Content);
            } catch (error) {
                if(error instanceof Error) console.log('Error message: '+error.message);
                console.error(error);
            }finally{
                setLoading(false);
            }
        }
        func();
    },[toggle])
    const refetch=() =>{
        setToggle(b=>!b);
    }
    return{
        ...data as Content,
        refetch,
        loading
    }
}