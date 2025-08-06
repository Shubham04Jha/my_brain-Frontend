import { useEffect, useState } from "react"
import type { Post } from "./usePosts";
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

export const useContent = (contentId: string)=>{
    const [toggle,setToggle] = useState<boolean>(false);
    const [data, setData] = useState<Content>();
    const [loading,setLoading] = useState<boolean>(false);
    useEffect(()=>{
        async function func(){
            try {
                setLoading(true);
                const response = await fetch(`${baseUrl}/shareContent/${contentId}`);
                const parsedResponse = await response.json();
                setData(parsedResponse.content as Content);
            } catch (error) {
                if(error instanceof Error) console.error(error.message);
                else{
                    console.error('Unexpected Exception Occurred');
                }
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