import './App.css'
import { Button } from './components/ui/Button'
import { ProfileCard } from './components/ui/ProfileCard'

function App() {

  return (
    <div className='dark
        flex items-center justify-around
        dark:text-text-white text-text-black 
        dark:bg-background-black bg-background-white
        my-auto min-h-200'>
      <ProfileCard variant='folded' username={'shubham@123'}/>
      <ProfileCard variant='folded' username={'shubham'}/>
    </div>

  )
}

export default App
