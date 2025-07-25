import React from "react";
import { CrossIcon } from "../assets/icons/sideBarButton";
import { Input } from "./ui/Input";



interface CreateContentProps{
    creatingContent: boolean;
    setCreatingContent: (x: boolean)=>void;
}
const basicStyles = 'outline-1 dark:outline-primary-dark outline-primary-white ';
export const CreateContent: React.FC<CreateContentProps> = ({creatingContent,setCreatingContent})=>{
    return(
        creatingContent&&<div className=" w-full h-screen absolute z-11 left-0 top-0 dark:bg-background-black/50 bg-background-white/50
        flex justify-center items-center" onClick={()=>setCreatingContent(false)}>
            <div className="opacity-90 h-96 w-96 overflow-y-auto flex justify-center items-center
            absolute z-20
             outline-2 dark:outline-primary-dark outline-primary-white rounded-md
             dark:bg-background-black bg-background-white " onClick={(e: React.MouseEvent)=>{e.stopPropagation()}}>
                <div className="flex flex-col gap-8">
                    <div className="absolute w-8 text-red-400 hover:outline-1 outline-red-400 rounded-md absolute right-4 top-4
                    hover:cursor-pointer"
                    onClick={()=>setCreatingContent(false)}><CrossIcon/></div>
                    <Input type="text" placeholder="Link" additionalStyles="" />
                    <Input type="text" placeholder="Title" additionalStyles="" />
                    <Input type="textBox" placeholder="Thoughts..?" additionalStyles="" />
                </div>
            </div>
        </div>
    )
}