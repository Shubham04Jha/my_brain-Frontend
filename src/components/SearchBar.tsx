import { useRef, type RefObject } from "react"
import { SearchIcon } from "../assets/icons/search"

const positioning = `left-64 sm:right-8 right-2`
const placeholder = 'search'

interface useFocusReturn{
    elementRef: RefObject<HTMLInputElement|null>;
    doFocus: ()=>void;
}
const useFocus = (): useFocusReturn =>{
    const elementRef = useRef<HTMLInputElement|null>(null);
    const doFocus = ()=>{
        if(elementRef.current){
            elementRef.current.focus();
        }
    }
    return {elementRef,doFocus};
}

export const SearchBar = ()=>{
    const {elementRef,doFocus} = useFocus();
    return(
        <div className="col-span-full  h-12">
            <div className={` fixed ${positioning} bg-gray-dark dark:bg-gray opacity-50 h-8 rounded-md flex items-center px-2`}
            onClick={doFocus} >
                <div className=' w-6 dark:text-text-dark text-text-white'><SearchIcon/></div>
                <input
                    ref = {elementRef}
                    type="text"
                    className="flex-1 bg-transparent text-sm placeholder-gray-400 focus:outline-none items-center -mt-1 ml-4 w-full"
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}