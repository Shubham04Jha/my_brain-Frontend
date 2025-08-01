import './App.css'
import { useContext, useEffect, useState } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import {BrowserRouter, Routes, Route, Outlet, Navigate, useNavigate} from 'react-router-dom';

import { baseUrl } from './config';
import { Login } from './pages/login';
import { Posts } from './pages/Test';
import { PageNotFound } from './pages/PageNotFound';
import { Home } from './pages/Home';
import { OpenBrainContext, OpenBrainProvider } from './context';

const ProtectedRoute = ({isAuthenticated,isLoading}: {isAuthenticated: boolean,isLoading: boolean})=>{
  if (isLoading) {
    return <div className="text-2xl">Loading...</div>; // or your custom loader
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

const checkAuthentication = async(setUsername: (x: string)=>void, username: string): Promise<boolean> =>{''
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
    if(!(response.status==200)){
      console.error(response.status==404?'Username not found':'Token invalid');
      return false;
    }
    const data = await response.json();
    setUsername(data.username);
    return true;
  } catch (error) {
    if(error instanceof Error) console.error(error.message);
  }
  return false;
}

const useRoutesAssets = ()=>{
    const [isAuthenticated,setIsAuthenticated] = useState<boolean>(false);
    const [isLoading,setIsLoading] = useState<boolean>(true);
    const {setUsername,username} = useContext(OpenBrainContext);
    useEffect(()=>{
      setIsLoading(true);
      const temp = async()=>{
        const loggedIn = await checkAuthentication(setUsername, username);
        if(loggedIn){
          setIsAuthenticated(true);
        }else{
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }
      temp();
    },[])

    return{
      isAuthenticated,
      setIsAuthenticated,
      isLoading,
    }
}

function AppContent() {
  const { isAuthenticated, setIsAuthenticated, isLoading } = useRoutesAssets();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading} />}>
          <Route path='/' element={<Home showAddContentButton={true}/>}/>
        </Route>
        <Route path='*' element ={<PageNotFound/>}/>
        <Route path='/test' element ={<Posts sideBarOpen={false} />}/>
      </Routes>
    </BrowserRouter>
  )
}

function App(){
  return(
    <div className='dark
        dark:text-text-white text-text-black 
        dark:bg-background-black bg-background-white h-screen
        '>
        <OpenBrainProvider>
          <AppContent/>
        </OpenBrainProvider>
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

const garbage = ()=>{
      {/* <ProfileCard variant='extended' username={'shubham@123'}/> */}
      {/* <ResponsiveButton text="Share Brain" size='md' padding='px-4 py-2' startIcon={shareSvg}/> */}
      {/* <ContentExpanded tags={['politics','entertainment']} title={`First Content`} link='https://www.google.com' 
      type='website' createdAt={Date.now()} username='shubham@123' thoughts='some thoughts I have for this test...'
      isPublic isOwner
      /> */}
}

export default App
