import { baseUrl } from "../config"


export const usePosts= async()=>{
    let posts = [];
    try {
        const response = await fetch(`${baseUrl}/contents`,{
            method: 'get',
            headers:{
                'content-type':'application/json',
                'authorization':localStorage.getItem('token')||''
            },
        }) 
        posts = await response.json();
    } catch (error) {
        if(error instanceof Error)console.error(error.message);
        else console.error('something went wrong');
    }
    return( posts)
}