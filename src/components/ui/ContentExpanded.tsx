import { useState } from "react";
import { Eye } from "../../assets/icons/eye";
import { Edit } from "../../assets/icons/edit";
import { Check } from "../../assets/icons/check";
import { useParams } from "react-router-dom";
import { useContent, type Content } from "../../hooks/useContent";
import { BrainLogo } from "../../assets/icons/logo";
import { LinkEmbed } from "../linkEmbed";

const defaultStyles = `dark:bg-background-black bg-background-white `

export const ContentExpanded = ()=>{
    const {contentId} = useParams();
    if(!contentId){
        return <BadUrl />;
    }
    const {loading,refetch,userId, ...props} = useContent(contentId);
    const {username} = userId||{};
    return(
        <>
        <div className='absolute top-4 left-4 flex gap-2'>
            <div className='w-8'>< BrainLogo /></div>
            <p className='font-bold text-xl'>Open Brain</p>
        </div>
        <div className={`flex items-center h-screen 
            ${defaultStyles}`}>
            <div className="lg:h-[85vh] h-[80vh]   rounded-md p-4 outline-2 dark:outline-accent-black  outline-accent-black lg:w-2/3 
            mx-auto 
            relative
            custom-scrollbar
            ">
                {loading?<Loading />:<Display isOwner={username==localStorage.getItem('username')} username={username} {...props}/>}
            </div>
        </div>
        </>
    )
}
const BadUrl = ()=>{
    return(
        <div>
            Bad URL ...
        </div>
    )
}

interface DisplayInterface
    {
    title: string, createdAt: number, isPublic: boolean,
    tags?: string[], thoughts?: string,type: string, link: string 
    isOwner: boolean;
    username: string;
}
const Display = ({isOwner, title,createdAt,isPublic,tags, thoughts, type, link,username}: DisplayInterface)=>{
    const [text,setText] = useState(thoughts);
    const [visible,setVisible] = useState(isPublic);
    const [editable,setEditable] = useState(false);
    const date = new Date(createdAt).toDateString()||'';
    return(
        <>
        {isOwner&&<div className="w-8 h-8 flex items-center justify-center
        absolute top-4 right-4 hover:cursor-pointer 
        rounded-lg outline-2 dark:outline-accent-white outline-accent-white ">
            <Edit width="w-6"  />
        </div>}
        <div className="w-full px-4">
            {tags&&<div className="flex gap-2">
                {tags.map((val,idx)=>val)}
            </div>}
            <p className="mb-8
            hover:cursor-pointer text-2xl dark:outline-accent-black outline-accent-white rounded-md items-center ">{title}</p>
            <div className="flex justify-between">
                <p>Added by: {username}</p>
                {isOwner&&<div><p>{visible?'eye':'no eye'}  {isPublic?'public':'private'}</p></div>}
            </div>
            <p>Created: {date}</p>
            <div className="mx-auto p-2 lg:w-1/2">
                <LinkEmbed link={link} type={type}/>
            </div>
            <div className="relative flex-grow " >
                <p className="focus:outline-1 dark:outline-accent-black outline-accent-white rounded-md p-1  
                whitespace-pre-line " tabIndex={-1}>{text}</p>
            </div>
        </div>
        </>
    )
}

const Loading = ()=>{
    return(
        <div>
            Loading the contents
        </div>
    )
}