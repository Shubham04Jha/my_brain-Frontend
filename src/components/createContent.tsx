import React, { useRef } from "react";
import { CrossIcon } from "../assets/icons/sideBarButton";
import { Input } from "./ui/Input";
import { Check } from "../assets/icons/check";
import { baseUrl } from "../config";
import { toast } from "react-toastify";



interface CreateContentProps{
    creatingContent: boolean;
    setCreatingContent: (x: boolean)=>void;
    refetch: ()=>void;
}
const defaultStles = `outline-2 dark:outline-accent-dark outline-accent-white rounded-lg
             h-96 w-96 overflow-y-auto
            scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
            flex justify-center 
            absolute z-20
            dark:bg-background-black/90 bg-background-white/90 
`;
export const CreateContent: React.FC<CreateContentProps> = ({creatingContent,setCreatingContent, refetch})=>{
    const LinkRef = useRef<HTMLInputElement>(null);
    const TitleRef = useRef<HTMLInputElement>(null);
    const ThoughtsRef = useRef<HTMLTextAreaElement>(null);

    const identifyType = (link: string): string | null =>{
        const allowedTypes = ['www.youtube.com','youtu.be','www.x.com','x.com','www.twitter.com'];
        const hostToType: Record<string,string> = {'www.youtube.com':'youtube','youtu.be':'youtube',
            'www.x.com':'x','x.com':'x','www.twitter.com':'x'};
        try {
            const url = new URL(link);
            const host = url.host;
            if(!allowedTypes.includes(host)){
                throw new Error("Content not supported");
            }
            return hostToType[host] || null ;
        } catch (error) {
            console.error(error);
            throw new Error("Something unexpected happened");
        }
    }
    const handleSubmit = async ()=>{
        try {
            const data = {
                title: TitleRef.current?.value||'',
                type: identifyType(LinkRef.current?.value||''),
                link: LinkRef.current?.value||'',
                thoughts:ThoughtsRef.current?.value||'',
            }
            const response = await fetch(`${baseUrl}/content`,{
                method:'post',
                headers:{
                    'content-type':'application/json',
                    'authorization': localStorage.getItem('token')||' '
                },
                body:JSON.stringify(data)
            })
            if(response.ok){
                toast.success('Succesfully uploaded',{autoClose:1000});
                setCreatingContent(false);
                refetch();
            }else{
                const parseRespone = await response.json();
                toast.error('Failed to upload',{autoClose:1500});
                console.error(parseRespone.message);
            }
        } catch (error) {
            toast.error('Couldn\'t post the content',{autoClose:2000});
            if(error instanceof Error){
                console.error(error.message);
            }else{
                console.error('Something Unexpected happened while Sending post to backend');
            }
        }
    }
    return(
        creatingContent&&<div className=" w-full h-screen absolute z-11 left-0 top-0 dark:bg-background-black/50 bg-background-white/50
        flex justify-center items-center" onClick={()=>setCreatingContent(false)}>
            
            <div className={`${defaultStles}`} onClick={(e: React.MouseEvent)=>{e.stopPropagation()}}>
            
                <div className=" w-3/4 my-2 space-y-4 py-4">
                    <div className=" w-8 text-red-400 hover:outline-1 outline-red-400 rounded-md absolute right-1 top-1
                    hover:cursor-pointer"
                    onClick={()=>setCreatingContent(false)}><CrossIcon/></div>
                    <Input ref={LinkRef} type="text" placeholder="Link" additionalStyles="w-full" />
                    <Input ref={TitleRef} type="text" placeholder="Title" additionalStyles="w-full" />
                    {/* <div className="bg-green-200 h-144"></div> */}
                    <Input ref={ThoughtsRef} type="textBox" placeholder="Thoughts..?" additionalStyles="w-full min-h-24 max-h-144" />
                    <div className=" w-8 text-green-400 hover:outline-1 outline-green-400 rounded-lg absolute right-1 bottom-1
                    hover:cursor-pointer pl-1 pt-1"
                    onClick={()=>handleSubmit()}><Check/></div>
                </div>
            </div>
            
        </div>
    )
}