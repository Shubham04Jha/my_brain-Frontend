import { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { baseUrl } from '../config';
import {  Posts } from '../components/posts';
import { type Post } from '../hooks/usePosts';
import { OpenBrainLogo } from '../components/ui/brainlogo';

export const DetailedSharedBrain = () => {
  const { username } = useParams();
  const [loading,setLoading] = useState<boolean>(false);
  const [error,setError] = useState<string|null>(null);
  const [posts,setPosts] = useState<Post[]>([]);
  const [toggle,setToggle] = useState<boolean>();
  useEffect(()=>{
    const func = async ()=>{
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/user/share/${username}`);
            if(!response.ok){
                if(response.status==403){
                    setError('User has not allowed sharing their brain');
                }else if(response.status==404){
                    setError('User not found');
                }else{
                    setError('Some Unexpected Error Occured... we are trying to fix it...');
                }
                return;
            }
            const parsedResponse =  await response.json();
            setPosts(parsedResponse.content);
            setError(null);
            console.log(parsedResponse.content);
            
        } catch (e) {
            if(e instanceof Error){ console.error(e.message);setError(e.message)}
            else {console.error('Unexpected Error Occured');setError('Unexpected Error Occured')}
        }finally{
            setLoading(false);
        }
    }
    func();
  },[toggle]);
  if(loading){
    return(
        <div className='w-full h-screen flex justify-center items-center'>
            Loading Brian...
        </div>
    )
  }else if(error){
    return(
        <>
        <div className="absolute top-4 left-4">
            <OpenBrainLogo />
        </div>
        <div className='w-full h-screen flex justify-center items-center'>
            {error}
        </div>
        </>
        
    )
  }
  return (
    <>
    <div className='absolute top-2 left-12'>
          <OpenBrainLogo />
    </div>
    <Posts posts={posts} loading={loading} error={error} refetch={()=>setToggle(b=>!b)} sideBarOpen={false} />
    </>
  );
//  return <div>This is  {username}'s Brian</div>
};
