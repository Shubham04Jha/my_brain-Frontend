import { useContext } from "react";
import {type Post } from "../hooks/usePosts";
import { SearchBar } from "./SearchBar";
import { ContentFolded } from "./ui/ContentFolded";
import { OpenBrainContext } from "../context";


interface PostsProps{
    sideBarOpen: boolean;
    posts:Post[];
    loading:boolean;
    error:string|null;
    refetch: ()=>void
}
export const Posts: React.FC<PostsProps> =  ({sideBarOpen, posts, loading, error, refetch})=>{
    return(
        <>
            
            <div className={`${sideBarOpen?'lg:col-start-3':''} col-start-0 col-span-full 
                grid grid-cols-12 grid-rows-[4vh_auto]
                lg:gap-8 gap-4 
                pl-8 pr-2 py-2
                overflow-y-auto h-screen scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
                `}>
                <SearchBar/>
                <Display posts={posts} loading={loading} error={error} refetch={refetch} />
            </div>
        </>
    )
}

interface DisplayProps{
    posts:Post[];
    loading:boolean;
    error:string|null;
    refetch: ()=>void
}
export const Display = ({posts,loading,error,refetch}: DisplayProps)=>{
    const {username} = useContext(OpenBrainContext);
    console.log(posts.length);
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
        posts.length>0?posts.map((post,idx)=>{
            const Postusername = post.userId.username;
            return(
                <Post link={post.link} type={post.type} title={post.title} username={username} thoughts={post.thoughts} tags={post.tags} isOwner={username==Postusername} isPublic={post.isPublic} contentId={post._id} key={idx}/>
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
    link:string;
    type: string;
    isOwner:boolean;
    isPublic: boolean;
    title: string;
    username:string;
    thoughts:string;
    tags?:string[];
    contentId: string;
} 

const Post = (props:PostProps)=>{
    return(
        <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2  '>
            <ContentFolded {...props} />
        </div>
    )
}