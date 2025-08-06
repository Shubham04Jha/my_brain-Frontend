import { useState } from "react";
import { Eye } from "../../assets/icons/eye";
import { useSetPublic } from "../../hooks/useSetPublic";
import {Tweet} from "react-tweet";
import { OpenBookIcon } from "../../assets/icons/open";
import { useNavigate } from "react-router-dom";

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

function extractYouTubeVideoId(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    const host: string = url.host;
    const pathname: string = url.pathname;

    // Case 1: Standard watch URL with ?v=VIDEO_ID
    if (url.searchParams.has("v")) {
      return url.searchParams.get("v");
    }

    // Case 2: Shortened URL - youtu.be/VIDEO_ID
    if (host === "youtu.be") {
      return pathname.slice(1); // remove leading slash
    }

    // Case 3: Embed URL - /embed/VIDEO_ID
    if (pathname.startsWith("/embed/")) {
      return pathname.split("/")[2];
    }

    // Case 4: Shorts URL - /shorts/VIDEO_ID
    if (pathname.startsWith("/shorts/")) {
      return pathname.split("/")[2];
    }

    return null; // No matching format
  } catch (error) {
    // Invalid URL or parsing failure
    return null;
  }
}

function extractTweetId(rawUrl: string): string | null{
    try{
        const url = new URL(rawUrl);
        const pathname: string = url.pathname;
        const xRegex = /status\/(\d+)/i;
        const match = pathname.match(xRegex);
        return match?match[1] : null;
    }catch(error){
        return null;
    }
}

const handleHost = (link: string): string=>{
    const {host} = new URL(link);
    switch (host) {
        case 'youtu.be':
        case 'www.youtube.com':
            return extractYouTubeVideoId(link) || 'couldn\'d parse url...';
        case 'www.twitter.com':
        case 'x.com':
        case 'www.x.com':
            return extractTweetId(link)||'couldn\'d parse url...'
        default:
            return link
    }
}
const LinkEmbed = ({link,type}:{link:string,type: string})=>{
    const resource_id = handleHost(link);
    switch (type) {
        case 'youtube':
            return(
                <div className="w-full static">
                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${resource_id}`} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            )
        case 'x':
            return(
                <div className="w-full h-full static">
                    <Tweet id={resource_id}  />
                </div>
            )
        default:
            return(
                <div className="w-full">
                    <a href={link}>{link}</a>
                </div>
            )
    }
}

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