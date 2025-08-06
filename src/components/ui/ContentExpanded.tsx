import { useState } from "react";
import { Eye } from "../../assets/icons/eye";
import { Edit } from "../../assets/icons/edit";
import { Check } from "../../assets/icons/check";
import { useParams } from "react-router-dom";
import { useContent, type Content } from "../../hooks/useContent";

const defaultStyles = `dark:bg-background-black bg-background-white 
w-full p-4 outline-2 rounded-2xl inline-flex shadow-lg dark:shadow-accent-black shadow-accent-white`
export const ContentExpanded = ()=>{
    const {contentId} = useParams();
    if(!contentId){
        return <BadUrl />;
    }
    const {loading,refetch,userId, ...props} = useContent(contentId);
    const {username} = userId||{};
    return(
        <>
            {loading?<Loading />:<Display isOwner={username==localStorage.getItem('username')} username={username} {...props}/>}
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
        {isOwner&&<div className="w-6
        absolute bottom-4 right-4 hover:cursor-pointer 
        rounded-full">
            <Edit/></div>}
        <div className="w-full">
            {tags&&<div className="flex gap-2">
                {tags.map((val,idx)=>val)}
            </div>}
            <p className="hover:cursor-pointer text-xl dark:outline-accent-black outline-accent-white rounded-md items-center ">{title}</p>
            <div className="flex justify-between">
                <p>Added by: {username}</p>
                {isOwner&&<div><p>{visible?'eye':'no eye'}  {isPublic?'public':'private'}</p></div>}
            </div>
            <p>Created: {date}</p>
            <div>
                {type}
                {link}
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