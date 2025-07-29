import { SearchBar } from "../components/SearchBar";
import { ContentFolded } from "../components/ui/ContentFolded";



interface PostsProps{
    sideBarOpen: boolean;
}
export const Posts: React.FC<PostsProps> = ({sideBarOpen})=>{
    return(
        <div className="h-screen">
            <div className={` col-start-0 col-span-full grid grid-cols-12 
                overflow-y-auto h-screen scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
                grid-rows-[10vh_auto]`}>
                <div className=" bg-pink-300 col-span-full">
                </div>
                <div className="  col-span-3 bg-yellow-300">
                </div>
                <div className="  col-span-3 bg-yellow-300">
                </div>
                <div className="  col-span-3 bg-yellow-300">
                </div>
                <div className="  col-span-3 bg-yellow-300">
                </div>
                
            </div>
        </div>
    )
}

interface PostProps{
    isOwner?:boolean;
    title: string;
    username:string;
    thoughts:string;
    tags?:string[];
} 

const Post = ({isOwner=false,title,username,thoughts,tags}:PostProps)=>{
    return(
        <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2  '>
            <ContentFolded isOwner={isOwner} title={title} username={username} thoughts={thoughts} tags={tags}/>
        </div>
    )
}