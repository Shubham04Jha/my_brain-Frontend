import './App.css'
import { Button } from './components/ui/Button'
import { ProfileCard } from './components/ui/ProfileCard'
import { ResponsiveButton } from './components/ui/ResponsiveButton'
import { shareSvg } from "./assets/icons/share";
import { ContentExpanded } from './components/ui/ContentExpanded';
import { ContentFolded } from './components/ui/ContentFolded';
import { SideBar } from './components/SideBar';
import { useState } from 'react';
import { PlusIcon } from './assets/icons/plux';
import { SearchIcon } from './assets/icons/search';
import { SearchBar } from './components/SearchBar';

function App() {
  const [sideBarOpen,setSideBarOpen] = useState(true);
  const [isOwner,setIsOwner] = useState(true);
  return (
    <div className='dark
        dark:text-text-white text-text-black 
        dark:bg-background-black bg-background-white px-2 h-screen
        '>
      {/* <ProfileCard variant='extended' username={'shubham@123'}/> */}
      {/* <ResponsiveButton text="Share Brain" size='md' padding='px-4 py-2' startIcon={shareSvg}/> */}
      {/* <ContentExpanded tags={['politics','entertainment']} title={`First Content`} link='https://www.google.com' 
      type='website' createdAt={Date.now()} username='shubham@123' thoughts='some thoughts I have for this test...'
      isPublic isOwner
      /> */}
      <div className='grid grid-cols-12 relative'>

        <div className={`${sideBarOpen?'col-span-2':''} lg:static absolute `}>
          {<SideBar extended={sideBarOpen} onClick={()=>setSideBarOpen(b=>!b)}/>}
        </div>

        <div className={`${sideBarOpen?'lg:col-start-3':''} col-start-0 col-span-full grid grid-cols-12 lg:gap-8 gap-4 
        pl-8 pr-2 py-2
        overflow-y-auto h-screen scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
        `}>
          <SearchBar/>
          <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2 '>
            <ContentFolded isOwner title='This is Title' username='shubahm03jha' thoughts='This is some thoughts' tags={['entertainment','politics']}/>
          </div>
          <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2  '>
            <ContentFolded isOwner title='This is Title' username='shubahm03jha' thoughts='This is some thoughts' tags={['entertainment','politics']}/>
          </div>
          <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2 hover:cursor-pointer'>
            <ContentFolded isOwner title='This is Title isnt it now? what do you think here asdfk asdf asfd some words for the title' username='shubahm03jha' thoughts='This is some thoughts
            lorem ipsum dollar sfdfad afa dfasf ada dfa sdfa dfasdf asdfadf a adfadsfadsfjahsdfadsf  afdjlasdjflas dfalsdfjs fddasdfasd fasdf adfads fasdf adf adfasdf adsfasdf adfadfadf a df afaf asf afasdfa dfas dfasdf aasfdasdf asf adf asdf asdf afdfasfadf adf sdfaf words are added' tags={['entertainment','politics']}/>
          </div>
          <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2  '>
            <ContentFolded isOwner title='This is Title' username='shubahm03jha' thoughts='This is some thoughts' tags={['entertainment','politics']}/>
          </div>
          <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2  '>
            <ContentFolded isOwner title='This is Title' username='shubahm03jha' thoughts='This is some thoughts' tags={['entertainment','politics']}/>
          </div>
          <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2 hover:cursor-pointer'>
            <ContentFolded isOwner title='This is Title isnt it now? what do you think here asdfk asdf asfd some words for the title' username='shubahm03jha' thoughts='This is some thoughts
            lorem ipsum dollar sfdfad afa dfasf ada dfa sdfa dfasdf asdfadf a adfadsfadsfjahsdfadsf  afdjlasdjflas dfalsdfjs fddasdfasd fasdf adfads fasdf adf adfasdf adsfasdf adfadfadf a df afaf asf afasdfa dfas dfasdf aasfdasdf asf adf asdf asdf afdfasfadf adf sdfaf words are added' tags={['entertainment','politics']}/>
          </div>
          <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2  '>
            <ContentFolded isOwner title='This is Title' username='shubahm03jha' thoughts='This is some thoughts' tags={['entertainment','politics']}/>
          </div>
          <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2  '>
            <ContentFolded isOwner title='This is Title' username='shubahm03jha' thoughts='This is some thoughts' tags={['entertainment','politics']}/>
          </div>
          
        </div>

      </div>
      {/* postButton */}
      {isOwner&&<div className='absolute right-4 bottom-4 w-16 dark:outline-accent-black outline-accent-white
      hover:outline-2 outline-1 rounded-full dark:bg-background-black bg-background-white'><PlusIcon/></div>}

    </div>
  )
}

export default App
