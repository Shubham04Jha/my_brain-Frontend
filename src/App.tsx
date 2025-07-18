import './App.css'
import { Button } from './components/ui/Button'
import { ProfileCard } from './components/ui/ProfileCard'
import { ResponsiveButton } from './components/ui/ResponsiveButton'
import { shareSvg } from "./assets/icons/share";
import { ContentExpanded } from './components/ui/ContentExpanded';

function App() {

  return (
    <div className='dark
        dark:text-text-white text-text-black 
        dark:bg-background-black bg-background-white
        h-screen
        px-10 py-10'>
      {/* <ProfileCard variant='extended' username={'shubham@123'}/> */}
      {/* <ResponsiveButton text="Share Brain" size='md' padding='px-4 py-2' startIcon={shareSvg}/> */}
      <ContentExpanded tags={['politics','entertainment']} title={`First Content`} link='https://www.google.com' 
      type='website' createdAt={Date.now()} username='shubham@123' thoughts='some thoughts I have for this test...'
      isPublic isOwner
      />
    </div>
  )
}

export default App
