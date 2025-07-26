
import { HomeIcon } from "../assets/icons/home";
import { SharedBrainsIcon } from "../assets/icons/sharedBrains";
import { ProfileIcon } from "../assets/icons/profile";
import { ShareIcon } from "../assets/icons/share";
import { SideBarButton } from "../assets/icons/sideBarButton";
import { Button } from "./ui/Button";
import { BrainLogo } from "../assets/icons/logo";
import {LogoutLogo} from "../assets/icons/logout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


interface SideBarProps{
    extended?:boolean;
    onClick?: ()=>void
}

const outerStyle = ` relative h-150 mt-2 lg:w-full w-48 
dark:bg-background-black bg-background-white dark:outline-accent-black 
outline-accent-white outline-2 
z-10
rounded-md`

type IconNames = 'Home' | 'Profile' | 'Shared Brains' | 'Share Brain'| 'Logout';
type IconMap = {
    [key in IconNames]: React.ComponentType;
}

const textToIcon: IconMap = {
    'Home':HomeIcon,
    'Profile':ProfileIcon,
    'Shared Brains': SharedBrainsIcon,
    'Share Brain': ShareIcon,
    'Logout': LogoutLogo
}

type textToFunctionType={
    [key in IconNames]: ()=>void;
}

const Options = ()=>{
    const navigate = useNavigate();
    const textToFunction: textToFunctionType = {
        'Home': ()=>{},
        'Profile': ()=>{},
        'Shared Brains': ()=>{},
        'Share Brain': async ()=>{
            await navigator.clipboard.writeText('http://localhost:3000/api/v1/share/'+localStorage.getItem('username'));
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
                        <div key={key} className="w-3/4 " onClick={textToFunction[key as IconNames]}>
                            <Button variant="regular" additionalStyles={`w-full rounded-md text-sm min-h-8 hover:cursor-pointer `} iconContainerStyle={`w-6`} startIcon={<IconComponent/>} text={key}/>
                        </div>
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
                <div className='absolute top-8 left-4 flex gap-2'>
                    <div className='w-8'>< BrainLogo /></div>
                    <p className='font-bold text-xl'>Open Brain</p>
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

