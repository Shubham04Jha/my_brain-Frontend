import { useState } from "react";
import { Eye } from "../../assets/icons/eye";
import { useSetPublic } from "../../hooks/useSetPublic";

import { OpenBookIcon } from "../../assets/icons/open";
import { useNavigate } from "react-router-dom";
import { LinkEmbed } from "../linkEmbed";

interface ContentFoldedProps{
    link: string;
    type: string;
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
md:p-4 p-2 space-y-1 flex-col 
overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
`




export const ContentFolded = ({link,type,tags,thoughts,title,username,isOwner,isPublic,contentId}:ContentFoldedProps)=>{
    const [visible,setVisible] = useState<boolean>(isPublic);
    const {setPublic} = useSetPublic();
    const navigate = useNavigate();
    const handleVisible = async ()=>{
        const data = await setPublic(contentId,visible);
        setVisible(data);
    }
    const handleOpen = ()=>navigate(`/content/${contentId}`);
    return (
        <div className={`${defaultStyles} `}>
            {tags&&<div className="flex gap-2">{tags.map((tag,idx)=><p key={idx} className="dark:text-accent-black text-accent-white">#{tag}</p>)}</div>}
            <div className="flex gap-2 justify-between">
                <div className="min-w-6 max-w-6 hover:cursor-pointer" onClick={handleOpen}>
                    <OpenBookIcon />
                </div>
                <p onClick={handleOpen} className="hover:cursor-pointer text-xl dark:outline-accent-black outline-accent-white rounded-md items-center ">{title}</p>
                {isOwner&&<div className="hover:cursor-pointer flex items-center -mb-1 w-6" onClick={handleVisible}>
                        <div className="w-6">
                            <Eye isPublic={visible} />
                        </div>
                    </div>}
            </div>
            <div className="mb-2">
                <p>Added By: {username}</p>
                <hr className=" dark:text-accent-dark text-accent-white"/>
            </div>
            <div className="min-h-[200px] ">
                <LinkEmbed link={link} type={type}/>
            </div>
            <div className="relative flex-grow " >
                <p className="focus:outline-1 dark:outline-accent-black outline-accent-white rounded-md p-1  
                whitespace-pre-line " tabIndex={-1}>{thoughts}</p>
            </div>
        </div>
    )
}