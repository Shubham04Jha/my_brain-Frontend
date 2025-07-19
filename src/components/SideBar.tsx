
import { SideBarButton } from "../assets/icons/sideBarButton";


interface SideBarProps{
    extended?:boolean;
    onClick?: ()=>void
}

const outerStyle = ` relative h-150 mt-2 lg:w-full w-48 
dark:bg-background-black bg-background-white dark:outline-accent-black 
outline-accent-white outline-2 
z-10
rounded-md`



export const SideBar = ({extended=true, onClick}:SideBarProps)=>{
    return(
        extended?
            <div className={`${outerStyle} `}>
                <div className="lg:static absolute w-full">
                    <div className="w-8 absolute bg-pink-300 right-1 top-1 
                    hover:dark:bg-background-black hover:bg-background-white hover:cursor-pointer hover:outline-1 
                    hover:cursor-pointer hover:outline-1 dark:outline-accent-black outline-accent-white
                    rounded-md p-1" onClick={onClick}><SideBarButton extended={extended}/></div>
                    <div className=" " ></div>
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