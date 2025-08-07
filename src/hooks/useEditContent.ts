import { useState } from "react"
import { baseUrl } from "../config";


export const useEditContent = (contentId: string)=>{
    const [error,setError] = useState<String|null>(null); 
    const [loading,setLoading] = useState<boolean>(false);
    async function editFunc({title,thoughts}: {title: string, thoughts: string}){
        const data = {title,thoughts};
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/content/${contentId}`,{
                method:'put',
                headers:{
                    'authorization':localStorage.getItem('token')||'',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            
            if(!response.ok){
                const parsedResponse = await response.json();
                setError(parsedResponse.message);
            }else{
                setError(null);
            }
        } catch (error) {
            if(error instanceof Error){
                setError(error.message);
            }else{
                setError('Unable to perform edit');
            }
        }finally{
            setLoading(false);
        }
    }
    return({ error, loading,editFunc })
}