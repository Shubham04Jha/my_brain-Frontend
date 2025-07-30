import { useContext, useState } from "react";
import { BrainLogo } from "../assets/icons/logo";
import { PlusIcon } from "../assets/icons/plux";
import { CreateContent } from "../components/createContent";
import { Posts } from "../components/posts";
import { SideBar } from "../components/SideBar";
// import { OpenBrainContext } from "../context";
import { toast } from "react-toastify";



interface HomeProps {
  isOwner?: boolean;
}

export const Home = ({isOwner}: HomeProps)=>{
  const [sideBarOpen,setSideBarOpen] = useState<boolean>(true);
  const [creatingContent,setCreatingContent] = useState<boolean>(false);
  // const {username} = useContext(OpenBrainContext);
  // console.log(OpenBrainContext);
  // console.log('Home: '+username);
  return(
    <>
      {!sideBarOpen&&
        <div className='absolute top-2 left-12 flex gap-2'>
          <div className='w-8'>< BrainLogo /></div>
          <p className='font-bold text-xl'>Open Brain</p> {/*logo */}
        </div>
      }
      <CreateContent creatingContent={creatingContent} setCreatingContent={setCreatingContent} />
      
      <div className='grid grid-cols-12 relative'>

        <div className={`${sideBarOpen?'col-span-2':''} lg:static absolute `}>
          {<SideBar extended={sideBarOpen} onClick={()=>setSideBarOpen((b)=>!b)}/>}
        </div>

        <Posts sideBarOpen={sideBarOpen} />
      </div>

      {isOwner&&<div className='absolute right-4 bottom-4 w-16 dark:outline-accent-black outline-accent-white
      hover:outline-2 outline-1 rounded-full dark:bg-background-black bg-background-white'
      onClick={()=>setCreatingContent(true)}><PlusIcon/></div>}
    </>
  )
}