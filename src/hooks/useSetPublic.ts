import { toast } from "react-toastify";
import { baseUrl } from "../config"


export const useSetPublic = ()=>{
    const setPublic = async(contentId: string,isPublic: boolean): Promise<boolean>=>{
        if (!contentId || contentId.length==0){
            console.error('invalid contentId');
        }
        try {
            const response = await fetch(`${baseUrl}/content/ispublic/${contentId}`,{
                method:'put',
                headers:{
                    'authorization':localStorage.getItem('token')||'',
                    'content-type': 'application/json'
                },
                body:JSON.stringify({'isPublic':!isPublic})
            });
            const data = await response.json();
            if(response.status!=200){
                console.error(data.message);
                return isPublic;
            }
            return !isPublic;
        } catch (error) {
            if(error instanceof Error) console.error(error.message);
            else console.error('Unexpected error occured!');
            toast.error('Failed to update the public status!');
        }
        return isPublic;
    }
    return {setPublic};
}