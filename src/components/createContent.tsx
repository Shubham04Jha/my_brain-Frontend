import React from "react";
import { CrossIcon } from "../assets/icons/sideBarButton";
import { Input } from "./ui/Input";
import { Check } from "../assets/icons/check";



interface CreateContentProps{
    creatingContent: boolean;
    setCreatingContent: (x: boolean)=>void;
}
const defaultStles = `outline-2 dark:outline-accent-dark outline-accent-white rounded-lg
             h-96 w-96 overflow-y-auto
            scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
            flex justify-center 
            absolute z-20
            dark:bg-background-black/90 bg-background-white/90 
`;
export const CreateContent: React.FC<CreateContentProps> = ({creatingContent,setCreatingContent})=>{
    return(
        creatingContent&&<div className=" w-full h-screen absolute z-11 left-0 top-0 dark:bg-background-black/50 bg-background-white/50
        flex justify-center items-center" onClick={()=>setCreatingContent(false)}>
            
            <div className={`${defaultStles}`} onClick={(e: React.MouseEvent)=>{e.stopPropagation()}}>
            
                <div className=" w-3/4 my-2 space-y-4 py-4">
                    <div className=" w-8 text-red-400 hover:outline-1 outline-red-400 rounded-md absolute right-1 top-1
                    hover:cursor-pointer"
                    onClick={()=>setCreatingContent(false)}><CrossIcon/></div>
                    <Input type="text" placeholder="Link" additionalStyles="w-full" />
                    <Input type="text" placeholder="Title" additionalStyles="w-full" />
                    {/* <div className="bg-green-200 h-144"></div> */}
                    <Input type="textBox" placeholder="Thoughts..?" additionalStyles="w-full min-h-24 max-h-144" />
                    <div className=" w-8 text-green-400 hover:outline-1 outline-green-400 rounded-lg absolute right-1 bottom-1
                    hover:cursor-pointer pl-1 pt-1"
                    onClick={()=>console.log('clicked')}><Check/></div>
                </div>
            </div>
            
        </div>
    )
}