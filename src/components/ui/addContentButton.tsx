import { PlusIcon } from "../../assets/icons/plux"

export const AddContentButton = ({handleClick}: {handleClick: ()=>void})=>{
    return(
        <div className='absolute right-4 bottom-4 w-16 dark:outline-accent-black outline-accent-white
            hover:outline-2 outline-1 rounded-full dark:bg-background-black bg-background-white'
            onClick={()=>handleClick()}><PlusIcon/>
        </div>
    )
}