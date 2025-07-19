import './App.css'
import { Button } from './components/ui/Button'
import { ProfileCard } from './components/ui/ProfileCard'
import { ResponsiveButton } from './components/ui/ResponsiveButton'
import { shareSvg } from "./assets/icons/share";
import { ContentExpanded } from './components/ui/ContentExpanded';
import { ContentFolded } from './components/ui/ContentFolded';

function App() {

  return (
    <div className='
        dark:text-text-white text-text-black 
        dark:bg-background-black bg-background-white
        min-h-screen
        px-10 py-10'>
      {/* <ProfileCard variant='extended' username={'shubham@123'}/> */}
      {/* <ResponsiveButton text="Share Brain" size='md' padding='px-4 py-2' startIcon={shareSvg}/> */}
      {/* <ContentExpanded tags={['politics','entertainment']} title={`First Content`} link='https://www.google.com' 
      type='website' createdAt={Date.now()} username='shubham@123' thoughts='some thoughts I have for this test...'
      isPublic isOwner
      /> */}
      <div className='grid grid-cols-12 lg:gap-8 gap-8'>
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
        <div className='lg:col-span-4 sm:col-span-6 col-span-10 sm:col-start-0 col-start-2  '>
          <ContentFolded isOwner title='This is Title' username='shubahm03jha' thoughts='This is some thoughts' tags={['entertainment','politics']}/>
        </div>
      </div>
    </div>
  )
}

export default App
