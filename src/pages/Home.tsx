import { useState } from "react";
import { BrainLogo } from "../assets/icons/logo";
import { PlusIcon } from "../assets/icons/plux";
import { CreateContent } from "../components/createContent";
import { Posts } from "../components/posts";
import { SideBar } from "../components/SideBar";
import { usePosts } from "../hooks/usePosts";
import { AddContentButton } from "../components/ui/addContentButton";



interface HomeProps {
  showAddContentButton?: boolean;
}

export const Home = ({showAddContentButton}: HomeProps)=>{
  const {posts,loading,error,refetch} = usePosts();
  const [sideBarOpen,setSideBarOpen] = useState<boolean>(true);
  const [creatingContent,setCreatingContent] = useState<boolean>(false);
  return(
    <>
      {!sideBarOpen&&
        <div className='absolute top-2 left-12 flex gap-2'>
          <div className='w-8'>< BrainLogo /></div>
          <p className='font-bold text-xl'>Open Brain</p> {/*logo */}
        </div>
      }
      <CreateContent refetch={refetch} creatingContent={creatingContent} setCreatingContent={setCreatingContent} />
      
      <div className='grid grid-cols-12 relative'>

        <div className={`${sideBarOpen?'col-span-2':''} lg:static absolute `}>
          {<SideBar extended={sideBarOpen} onClick={()=>setSideBarOpen((b)=>!b)}/>}
        </div>
        <Posts posts={posts} loading={loading} error={error} refetch={refetch} sideBarOpen={sideBarOpen} />
      </div>

      {showAddContentButton&&<AddContentButton handleClick={()=>setCreatingContent(true)} />}
    </>
  )
}