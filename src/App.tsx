import './App.css'
import { Button } from './components/ui/Button'
import { ProfileCard } from './components/ui/ProfileCard'
import { ResponsiveButton } from './components/ui/ResponsiveButton'
import { shareSvg } from "./assets/icons/share";

function App() {

  return (
    <div className='dark
        flex items-center justify-center 
        dark:text-text-white text-text-black 
        dark:bg-background-black bg-background-white
        h-screen
        px-10 py-2'>
      {/* <ProfileCard variant='extended' username={'shubham@123'}/> */}
      <ResponsiveButton text="Share Brain" size='md' padding='px-4 py-2' startIcon={shareSvg} showFull/>
    </div>
  )
}

export default App
