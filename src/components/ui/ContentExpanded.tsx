import { useEffect, useRef, useState } from "react";
import { Eye } from "../../assets/icons/eye";
import { Edit } from "../../assets/icons/edit";
import { Check } from "../../assets/icons/check";
import { useParams } from "react-router-dom";
import { useContent, type Content } from "../../hooks/useContent";
import { LinkEmbed } from "../linkEmbed";
import { useSetPublic } from "../../hooks/useSetPublic";
import { OpenBrainLogo } from "./brainlogo";

const defaultStyles = `dark:bg-background-black bg-background-white `

export const SharedContentExpanded = ()=>{
    const {contentId} = useParams();
    if(!contentId){
        return <BadUrl />;
    }
    const {loading,refetch,userId, ...props} = useContent(contentId);
    const {username} = userId||{};
    return(
        <>
        <div className='absolute top-4 left-4'>
            <OpenBrainLogo />
        </div>
        <div className={`flex items-center h-screen 
            ${defaultStyles}`}>
            <div className="lg:h-[85vh] h-[80vh]   rounded-md p-4 outline-2 dark:outline-accent-black  outline-accent-black lg:w-2/3 
            mx-auto 
            relative
            custom-scrollbar
            ">
                {loading?<Loading />:<Display contentId={contentId} isOwner={false} username={username} {...props}/>}
            </div>
        </div>
        </>
    )
}

export const ContentExpanded = ()=>{
    const {contentId} = useParams();
    if(!contentId){
        return <BadUrl />;
    }
    const {loading,refetch,userId, ...props} = useContent(contentId,true);
    const {username} = userId||{};
    return(
        <>
        <div className='absolute top-4 left-4' >
            <OpenBrainLogo />
        </div>
        <div className={`flex items-center h-screen 
            ${defaultStyles}`}>
            <div className="lg:h-[85vh] h-[80vh]   rounded-md p-4 outline-2 dark:outline-accent-black  outline-accent-black lg:w-2/3 
            mx-auto 
            relative
            custom-scrollbar
            ">
                {loading?<Loading />:<Display contentId={contentId} isOwner={username==localStorage.getItem('username')} username={username} {...props}/>}
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
    tags?: string[], thoughts?: string,type: string, link: string ;
    contentId: string;
    isOwner: boolean;
    username: string;
}
const Display = ({isOwner, title,createdAt,isPublic,tags, thoughts, type, link,username, contentId}: DisplayInterface)=>{
    const [text,setText] = useState(thoughts);
    const [visible,setVisible] = useState(isPublic);
    const [editable,setEditable] = useState(false);
    const [titleText,setTitle] = useState<string>(title);
    const [editTitle,setEditTitle] = useState<boolean>(false);
    const date = new Date(createdAt).toDateString()||'';
    const titleRef = useRef<HTMLInputElement>(null);
    const thoughtsRef = useRef<HTMLTextAreaElement>(null);

    const {setPublic} = useSetPublic();
    const handleVisible = async ()=>{
        const data = await setPublic(contentId,visible);
        setVisible(data);
    }
    useEffect(()=>{
       if(editTitle) titleRef.current?.focus();
    },[editTitle]);
    useEffect(()=>{
            if (editable && thoughtsRef.current) {
            const el = thoughtsRef.current;
            el.focus();
            el.setSelectionRange(el.value.length, el.value.length);
            el.scrollTop = el.scrollHeight;
        }
    },[editable]);
    return(
        <>
        <div className="w-full px-4">
            {tags&&<div className="flex gap-2">
                {tags.map((val,idx)=><p key={idx}>{val}</p>)}
            </div>}
            {editTitle?
                <div className="flex justify-between gap-4 mb-8">
                    <div className="w-full ">
                        <input className=" w-full
                        focus:outline-1
                        hover:cursor-pointer text-2xl dark:outline-accent-black outline-accent-white rounded-md items-center " type="text" value={titleText} 
                        onChange={(e) =>{ setTitle(e.target.value);}}
                        ref={titleRef}/>
                    </div>
                    <div className="outline-1 dark:outline-accent-black outline-accent-white p-2 rounded-md inline-flex ml-auto
                        hover:cursor-pointer h-10
                        aspect-square -mt-1"
                        onClick={()=>{setEditTitle(false);}}>{<Check width="w-6"/>}
                    </div>
                </div>
                :
                <div className="flex justify-between">
                    <p className="mb-8
                    hover:cursor-pointer text-2xl dark:outline-accent-black outline-accent-white rounded-md items-center ">{titleText}
                    </p>
                    {isOwner&&
                    <div className="h-10 outline-1 dark:outline-accent-black outline-accent-white p-2 rounded-md inline-flex ml-auto
                        hover:cursor-pointer
                        aspect-square -mt-1"
                        onClick={()=>setEditTitle(true)}>{<Edit width="w-6"/>}
                    </div>}
                </div>
                }
            <div className="flex justify-between">
                <p>Added by: {username}</p>
                {isOwner&&<div className="flex gap-2 hover:cursor-pointer" onClick={handleVisible}><div className="w-6"><Eye isPublic={visible} /></div><p>{visible?'public':'private'}</p></div>}
            </div>
            <p>Created: {date}</p>
            <div className="mx-auto p-2 lg:w-1/2">
                <LinkEmbed link={link} type={type}/>
            </div>
            <div className="outline-1 dark:outline-accent-black outline-accent-white p-2 rounded-md flex flex-col">
                {editable?
                    <>
                        <textarea
                            className="h-50 resize-none outline-none border-none bg-transparent
                            custom-scrollbar"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            ref={thoughtsRef}
                        />
                        <div className=" outline-1 dark:outline-accent-black outline-accent-white p-2 rounded-md inline-flex ml-auto
                            aspect-square hover:cursor-pointer"
                            onClick={()=>setEditable(false)}>{<Check width="w-4"/>}
                        </div>
                    </>
                :
                <>
                    <p className=" h-50 whitespace-pre-line custom-scrollbar">{text}</p>
                    {isOwner&&
                    <div className=" outline-1 dark:outline-accent-black outline-accent-white p-2 rounded-md inline-flex ml-auto
                        hover:cursor-pointer
                        aspect-square "
                        onClick={()=>setEditable(true)}>{<Edit width="w-6"/>}
                    </div>}
                </>
                }
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