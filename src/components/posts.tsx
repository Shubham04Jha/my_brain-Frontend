import { SearchBar } from "./SearchBar";
import { ContentFolded } from "./ui/ContentFolded";


interface PostsProps{
    sideBarOpen: boolean;
}
export const Posts: React.FC<PostsProps> = ({sideBarOpen})=>{
    return(
        <>
            
            <div className={`${sideBarOpen?'lg:col-start-3':''} col-start-0 col-span-full grid grid-cols-12 lg:gap-x-8 gap-x-4 gap-y-2
                pl-8 pr-2 py-2
                overflow-y-auto h-screen scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
                grid-rows-[8vh_auto]
                `}>
                <SearchBar/>
                <Post isOwner title='This is Title' username='shubham03jha' thoughts='This is some thoughts' />
                
                
            </div>
        </>
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