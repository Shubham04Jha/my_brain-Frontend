import React from "react";
import { CrossIcon } from "../assets/icons/sideBarButton";
import { Input } from "./ui/Input";



interface CreateContentProps{
    creatingContent: boolean;
    setCreatingContent: (x: boolean)=>void;
}
const defaultStles = `outline-1 dark:outline-primary-dark outline-primary-white rounded-lg
            opacity-90 h-96 w-96 overflow-y-auto
            scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
            flex justify-center 
            absolute z-20
            dark:bg-background-black bg-background-white 
`;
export const CreateContent: React.FC<CreateContentProps> = ({creatingContent,setCreatingContent})=>{
    return(
        creatingContent&&<div className=" w-full h-screen absolute z-11 left-0 top-0 dark:bg-background-black/50 bg-background-white/50
        flex justify-center items-center" onClick={()=>setCreatingContent(false)}>
            
            <div className={`${defaultStles}`} onClick={(e: React.MouseEvent)=>{e.stopPropagation()}}>
            
                <div className=" w-3/4 my-2 ">
                    {/* <div className=" w-8 text-red-400 hover:outline-1 outline-red-400 rounded-md absolute right-4 top-4
                    hover:cursor-pointer"
                    onClick={()=>setCreatingContent(false)}><CrossIcon/></div> */}
                    <Input type="text" placeholder="Link" additionalStyles="w-full" />
                    <Input type="text" placeholder="Title" additionalStyles="w-full" />
                    {/* <div className="bg-green-200 h-144"></div> */}
                    <Input type="textBox" placeholder="Thoughts..?" additionalStyles="w-full min-h-24 max-h-144" />
                </div>
            </div>
            
        </div>
    )
}