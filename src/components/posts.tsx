import { usePosts } from "../hooks/usePosts";
import { SearchBar } from "./SearchBar";
import { ContentFolded } from "./ui/ContentFolded";


interface PostsProps{
    sideBarOpen: boolean;
}
export const Posts: React.FC<PostsProps> =  ({sideBarOpen})=>{
    return(
        <>
            
            <div className={`${sideBarOpen?'lg:col-start-3':''} col-start-0 col-span-full 
                grid grid-cols-12 grid-rows-[4vh_auto]
                lg:gap-8 gap-4 
                pl-8 pr-2 py-2
                overflow-y-auto h-screen scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
                `}>
                <SearchBar/>
                <Display />
            </div>
        </>
    )
}

const Display = ()=>{
    const {posts,loading,error,refetch} = usePosts();
    if (loading) {
        return <div>Loading posts...</div>;
    }
    if (error) {
        return (
        <div>
            <p>Error: {error}</p>
            <button onClick={refetch}>Retry</button>
        </div>
        );
    }
    return(
        posts.length>0?posts.map((post)=>{
            return(
                <Post title={post.title} username={post.title} thoughts={post.thoughts} tags={post.tags} />
            )
        })
        :<NoContent/>
    )
}

const NoContent = ()=>{
    return(
        <div className="col-span-full">
            No Contents yet!
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