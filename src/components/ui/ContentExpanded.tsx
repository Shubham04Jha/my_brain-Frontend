import { useState } from "react";
import { Eye } from "../../assets/icons/eye";
import { Edit } from "../../assets/icons/edit";
import { Check } from "../../assets/icons/check";

interface ContentExpandedProps{
    tags?: string[];
    thoughts?: string;
    title: string;
    link: string;
    type: string;
    username: string;
    createdAt: number;
    isPublic?: boolean;
    isOwner?:boolean
}

const defaultStyles = `dark:bg-background-black bg-background-white 
w-full p-4 outline-2 rounded-2xl inline-flex shadow-lg dark:shadow-accent-black shadow-accent-white`
export const ContentExpanded = ({
    tags, thoughts, 
    title, link, type, 
    username, createdAt, 
    isPublic, isOwner
}: ContentExpandedProps)=>{
    const [text,setText] = useState(thoughts);
    const [visible,setVisible] = useState(isPublic)
    const [editable,setEditable] = useState(false);
    return(
        <div className={`${defaultStyles} gap-y-4 flex-col flex`}>
            {tags&&<div className="flex gap-2 dark:text-gray-300 text-gray-600">{tags.map((tag,idx)=>{return <p key={idx}>#{tag}</p>})}</div>}
            <div className="flex gap-4 ">
                <a href={`${link}` } target="_blank" className="underline dark:text-accent-black text-accent-white">Content Link</a>
                <p>{`Type: ${type}`}</p>
            </div>
            <p>{username}</p>
            <p>{new Date(createdAt).toDateString()}</p>
            <div className="flex justify-center gap-4 items-center ">
                <p className={`p-2 text-4xl dark:outline-accent-black outline-accent-white rounded-md items-center `}>{title}</p>
                {isOwner&&<div onClick={()=>setVisible(b=>!b)} className="hover:cursor-pointer"><Eye width="w-8 -mb-2" isPublic={visible} /></div>}
            </div>
            <div className="outline-1 dark:outline-accent-black outline-accent-white p-2 rounded-md flex flex-col">
                {editable?
                    <>
                        <textarea
                            className="h-50 resize-none outline-none border-none bg-transparent"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <div className=" outline-1 dark:outline-accent-black outline-accent-white p-2 rounded-md inline-flex ml-auto
                            aspect-square hover:cursor-pointer"
                            onClick={()=>setEditable(false)}>{<Check width="w-4"/>}
                        </div>
                    </>
                :
                <>
                    <p className=" h-50 whitespace-pre-line">{text}</p>
                    {isOwner&&
                    <div className=" outline-1 dark:outline-accent-black outline-accent-white p-2 rounded-md inline-flex ml-auto
                        hover:cursor-pointer
                        aspect-square"
                        onClick={()=>setEditable(true)}>{<Edit width="w-6"/>}
                    </div>}
                </>
                }
            </div>
        </div>
    )
}