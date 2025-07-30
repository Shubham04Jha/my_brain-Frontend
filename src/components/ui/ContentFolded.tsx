import { useState } from "react";
import { Eye } from "../../assets/icons/eye";
import { useSetPublic } from "../../hooks/useSetPublic";

interface ContentFoldedProps{
    tags?: string[];
    thoughts?: string;
    title: string;
    username: string;
    isOwner?: boolean;
    isPublic: boolean;
    contentId: string;
}

const defaultStyles = `

outline-2 dark:outline-accent-black outline-accent-white w-full 
aspect-square
lg:rounded-xl rounded-lg
md:p-4 p-2 space-y-4 flex-col 
overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
`

export const ContentFolded = ({
    tags,
    thoughts,
    title,
    username,
    isOwner,
    isPublic,
    contentId

}:ContentFoldedProps)=>{
    const [visible,setVisible] = useState<boolean>(isPublic);
    const {setPublic} = useSetPublic();
    const handleVisible = async ()=>{
        const data = await setPublic(contentId,visible);
        setVisible(data);
    }
    return (
        <div className={`${defaultStyles} `}>
            {tags&&<div className="flex gap-2">{tags.map((tag,idx)=><p key={idx} className="dark:text-accent-black text-accent-white">#{tag}</p>)}</div>}
            <div className="flex gap-4 justify-center">
                <p className="p-2 text-4xl dark:outline-accent-black outline-accent-white rounded-md items-center ">{title}</p>
                {isOwner&&<div className="hover:cursor-pointer flex items-center -mb-1" onClick={handleVisible}><Eye isPublic={visible} /></div>}
            </div>
            <p>Author: {username}</p>
            <div className="relative flex-grow " >
                <hr className=" dark:text-accent-dark text-accent-white "/>
                <p className="focus:outline-1 dark:outline-accent-black outline-accent-white rounded-md p-4 
                whitespace-pre-line " tabIndex={-1}>{thoughts}</p>
            </div>
        </div>
    )
}