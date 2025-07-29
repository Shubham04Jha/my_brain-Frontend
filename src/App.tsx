import './App.css'
import { Button } from './components/ui/Button'
import { ProfileCard } from './components/ui/ProfileCard'
import { ResponsiveButton } from './components/ui/ResponsiveButton'
import { shareSvg } from "./assets/icons/share";
import { ContentExpanded } from './components/ui/ContentExpanded';
import { ContentFolded } from './components/ui/ContentFolded';
import { SideBar } from './components/SideBar';
import { useEffect, useState } from 'react';
import { PlusIcon } from './assets/icons/plux';
import { SearchIcon } from './assets/icons/search';
import { SearchBar } from './components/SearchBar';
import { Login } from './pages/login';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { CreateContent } from './components/createContent';
import { BrainLogo } from './assets/icons/logo';
// import { Posts } from './components/posts';
import { Posts } from './pages/Test';

import {BrowserRouter, Routes, Route, Outlet, Navigate, useNavigate} from 'react-router-dom';
import { baseUrl } from './config';
import { PageNotFound } from './pages/PageNotFound';
import { Home } from './pages/Home';

const ProtectedRoute = ({isAuthenticated,isLoading}: {isAuthenticated: boolean,isLoading: boolean})=>{
  if (isLoading) {
    return <div className="text-2xl">Loading...</div>; // or your custom loader
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

const checkAuthentication = async(): Promise<boolean> =>{
  const token = localStorage.getItem('token');
  const url = baseUrl+'/isAuthenticated';
  if(!token) return false;
  try {
    const response = await fetch(url,{
      method:'get',
      headers:{
        'Content-Type':'application/json',
        'authorization': token
      }
    })
    return response.status==200;
  } catch (error) {
    if(error instanceof Error) console.error(error.message);
  }
  return false;
}

function App() {
  const [isOwner,setIsOwner] = useState<boolean>(true);
  const [isAuthenticated,setIsAuthenticated] = useState<boolean>(false);
  const [isLoading,setIsLoading] = useState<boolean>(true);
  
  useEffect(()=>{
    setIsLoading(true);
    const temp = async()=>{
      const loggedIn = await checkAuthentication();
      if(loggedIn){
        setIsAuthenticated(true);
      }else{
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    }
    temp();
  },[])

  return (
    <div className='dark
        dark:text-text-white text-text-black 
        dark:bg-background-black bg-background-white h-screen
        '>
      {/* <ProfileCard variant='extended' username={'shubham@123'}/> */}
      {/* <ResponsiveButton text="Share Brain" size='md' padding='px-4 py-2' startIcon={shareSvg}/> */}
      {/* <ContentExpanded tags={['politics','entertainment']} title={`First Content`} link='https://www.google.com' 
      type='website' createdAt={Date.now()} username='shubham@123' thoughts='some thoughts I have for this test...'
      isPublic isOwner
      /> */}
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading} />}>
            <Route path='/' element={<Home isOwner={isOwner}/>}/>
          </Route>
          <Route path='*' element ={<PageNotFound/>}/>
          <Route path='/test' element ={<Posts sideBarOpen={false} />}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        />
    </div>
  )
}


export default App
