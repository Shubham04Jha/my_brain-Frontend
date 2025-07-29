import { useEffect, useState } from "react";
import { baseUrl } from "../config"

interface Post{
    isOwner?:boolean,
    title:string,
    username:string,
    thoughts:string,
    tags?: string[]
}

export const usePosts = (): {posts: Post[],loading: boolean, error: string|null, refetch: ()=>void} =>{
    const[posts,setPosts] = useState<Post[]>([]);
    const[loading,setLoading] = useState<boolean>(false);
    const[error,setError] = useState<string|null>(null);
    const[trigger,setTrigger] = useState<boolean>(false);

    useEffect(()=>{
        async function fetchPosts(){
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${baseUrl}/content`,{
                    method:'get',
                    headers:{
                        'content-type':'application/json',
                        'authorization':localStorage.getItem('token')||''
                    }
                })
                if(!response.ok){
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
            } catch (error: any) {
                setError(error.message || 'Something went wrong');
                console.error("Error fetching posts:", error);
            }finally{
                setLoading(true);
            }
        }
        fetchPosts();
    },[trigger])

    const refetch = ()=>{
        setTrigger(b=>!b);
    }

    return{
        posts,
        loading,
        error,
        refetch
    }
} 

export const usePOsts= async()=>{
    const [posts,setPosts] = useState([]);
    try {
        const response = await fetch(`${baseUrl}/contents`,{
            method: 'get',
            headers:{
                'content-type':'application/json',
                'authorization':localStorage.getItem('token')||''
            },
        }) 
        setPosts(await response.json());
    } catch (error) {
        if(error instanceof Error)console.error(error.message);
        else console.error('something went wrong');
    }
    return {posts};
}