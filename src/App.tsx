import './App.css'
import { Button } from './components/ui/Button'
import { ProfileCard } from './components/ui/ProfileCard'

function App() {

  return (
    <div className='dark
        
        dark:text-text-white text-text-black 
        dark:bg-background-black bg-background-white
        my-auto h-screen
        px-10 py-2'>
      <ProfileCard variant='extended' username={'shubham@123'}/>
    </div>
  )
}

export default App
