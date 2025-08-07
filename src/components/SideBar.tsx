
import { HomeIcon } from "../assets/icons/home";
import { SharedBrainsIcon } from "../assets/icons/sharedBrains";
import { SideBarButton } from "../assets/icons/sideBarButton";
import { Button } from "./ui/Button";
import {LogoutLogo} from "../assets/icons/logout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseFrontEnd, baseUrl } from "../config";
import { CopyIcon } from "../assets/icons/copy";
import { useEffect, useState } from "react";
import { Eye } from "../assets/icons/eye";
import { usePublicShareQuery } from "../hooks/usePublicShareQuery";
import { OpenBrainLogo } from "./ui/brainlogo";


interface SideBarProps{
    extended?:boolean;
    onClick?: ()=>void;
}

const outerStyle = ` relative h-150 mt-2 lg:w-full w-48 
dark:bg-background-black bg-background-white dark:outline-accent-black 
outline-accent-white outline-2 
z-10
rounded-md`

type IconNames = 'Home'  | 'Shared Brains' | 'Copy BrianLink'| 'Logout';
type IconMap = {
    [key in IconNames]: React.ComponentType;
}

const textToIcon: IconMap = {
    'Home':HomeIcon,
    'Shared Brains': SharedBrainsIcon,
    'Copy BrianLink': CopyIcon,
    'Logout': LogoutLogo,
}
type textToFunctionType={
    [key in IconNames]: ()=>void;
}

const Options = ()=>{
    const {publicShare,statusLoading,isError} = usePublicShareQuery();
    const navigate = useNavigate();
    const [isPublic, setIsPublic] = useState<boolean>(false);
    useEffect(()=>{
        setIsPublic(publicShare);
    },[publicShare])
    const [loading,setLoading] = useState<boolean>(false);
    const handlePublic = async()=>{
        if(loading) return;
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/share`,{
                method: 'post',
                headers:{
                    'content-type':'application/json',
                    'authorization':localStorage.getItem('token')||''
                },
                body:JSON.stringify({share:!isPublic})
            });
            if(response.ok){
                toast.success(isPublic?'status set to private':'status set to public',{autoClose:1500});
                setIsPublic(prev=>!prev);
            }else{
                toast.error('couldn\'t change the public status');
            }
        } catch (error) {
            if(error instanceof Error){
                console.error(error.message);
                toast.error(error.message,{autoClose:2000});
            }else{
                console.error('Something went wrong');
                toast.error('Unexpected error occurred');
            }
        }finally{
            setLoading(false);
        }
    }
    const textToFunction: textToFunctionType = {
        'Home': ()=>{
            navigate('/');
        },
        'Shared Brains': ()=>{
            navigate('/shared')
        },
        'Copy BrianLink': async ()=>{
            await navigator.clipboard.writeText(`${baseFrontEnd}/shared/`+localStorage.getItem('username'));
            toast.success('Brain Link Copied!',{autoClose:2000});
        },
        'Logout': ()=>{
            localStorage.removeItem('token');
            navigate('/login');
        }
    }
    return (
        <div className="flex flex-col justify-around items-center gap-8 w-full mt-24" >
            {
                Object.entries(textToIcon).map
                (([key,val])=>{
                    const IconComponent = val;
                    return (
                        <>
                        <div key={key} className="w-3/4 " onClick={textToFunction[key as IconNames]}>
                            <Button variant="regular" additionalStyles={`w-full rounded-md text-sm min-h-8 hover:cursor-pointer `} iconContainerStyle={`w-6`} startIcon={<IconComponent/>} text={key}/>
                        </div>
                        {key=='Home'&&
                            <div key={'public private'+key} className="w-3/4" onClick={handlePublic}>
                                <Button variant='regular' additionalStyles={`w-full rounded-md text-sm min-h-8 hover:cursor-pointer `} iconContainerStyle={`w-6 `} startIcon={<Eye isPublic={isPublic} />} text={'Publics'} />
                            </div>
                        }
                        </>
                    )
                })
            }
        </div>
    )
}

export const SideBar = ({extended=true, onClick}:SideBarProps)=>{
    return(
        extended?
            <div className={`${outerStyle} `}>
                <div className='absolute top-8 left-4 '>
                    <OpenBrainLogo />
                </div>
                <div className="lg:static absolute w-full flex justify-center items-center h-2/3">
                    <div className="w-8 absolute dark:bg-background-black bg-background-white text-red-400
                     right-1 top-1 
                    hover:dark:bg-background-black hover:bg-background-white hover:cursor-pointer hover:outline-1 
                    hover:cursor-pointer hover:outline-1 dark:outline-accent-black outline-accent-white
                    rounded-md p-1" onClick={onClick}><SideBarButton extended={extended}/></div>
                    <Options/>
                </div>
            </div>
        :

            <div className="w-4  absolute left-6">
                <div className="w-8 absolute right-1 top-1 
                    opacity-100
                    dark:bg-background-black bg-background-white hover:cursor-pointer hover:outline-1 
                    dark:outline-accent-black outline-accent-white 
                    rounded-md p-1" 
                    onClick={onClick}>
                    <SideBarButton extended={extended}/>
                </div>
            </div>
        )
}

