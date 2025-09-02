import { useCallback, useRef, useState, type RefObject } from "react"
import { SearchIcon } from "../assets/icons/search"
import { baseUrl } from "../config";
import { toast } from "react-toastify";
import type { Post } from "../hooks/usePosts";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

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
    const inputRef = useRef<HTMLInputElement|null>(null);
    const {elementRef,doFocus} = useFocus();
    const [searchResults,setSearchResults] = useState<Post[]>([]);
    const handleVectorSearch = async ()=>{
        const searchText = inputRef.current?.value;
        if (!searchText?.trim()) {
            setSearchResults([]);
            return;
        }
        try {
            const response = await fetch(baseUrl+'/content/search/vectorSearch',{
                method:'post',
                headers:{
                    "authorization":localStorage.getItem("token")||" "
                },
                body: JSON.stringify({
                    query: searchText
                })
            })
            if(response.ok){
                const parsedResponse = await response.json();
                setSearchResults(parsedResponse.results);
            }else{
                toast.error("An error occured",{autoClose:1500});
            }
        } catch (error) {
            if(error instanceof Error) console.log(error.message);
            else console.log("error Occured");
            toast.error("An error occured",{autoClose:1500});
        }

    }
    const handleSearch = useCallback(async ()=>{
        const searchText = inputRef.current?.value;
        if (!searchText?.trim()) {
            setSearchResults([]);
            return;
        }
        try {
            const response = await fetch(baseUrl+'/content/search/'+searchText,{
                method:'get',
                headers:{
                    "authorization":localStorage.getItem("token")||" "
                }
            })
            if(response.ok){
                const parsedResponse = await response.json();
                setSearchResults(parsedResponse.results);
            }else{
                toast.error("An error occured",{autoClose:1500});
            }
        } catch (error) {
            if(error instanceof Error) console.log(error.message);
            else console.log("error Occured");
            toast.error("An error occured",{autoClose:1500});
        }

    },[])
    const debounceCall = useDebounce(handleSearch,300);
    return(
        <div className="h-12 col-span-full">
            <div className="col-span-full  h-12">
                <div className={` absolute ${positioning} bg-gray-dark dark:bg-gray opacity-50 h-8 rounded-md flex items-center px-2`}
                    onClick={doFocus} >
                    <div className=' w-6 dark:text-text-dark text-text-white'>
                        <SearchIcon/>
                    </div>
                    <input
                        ref = {node=>{
                            elementRef.current = node;
                            inputRef.current = node;
                        }}
                        onChange={debounceCall}
                        type="text"
                        className="flex-1 bg-transparent text-sm placeholder-gray-400 focus:outline-none items-center -mt-1 ml-4 w-full"
                        placeholder={placeholder}
                    />
                </div>
            </div>
            {searchResults.length>0&&<ShowResults searchResults={searchResults} />}
        </div>
    )
}

const ShowResults = ({searchResults}:{searchResults: Post[] })=>{
    return <div className="absolute w-full h-max bg-gray-200 dark:bg-gray-500">
        <div className="max-h-50vh overflow-y-auto  ">
            {searchResults.map((val,idx)=>{
                return(
                    <div className="hover:cursor-pointer hover:dark:bg-backgound-black hover:bg-background-white hover:text-black" key={idx}>
                        <Link to={"/content/"+val._id}> <p className="">{val.title}</p> </Link >
                    </div>
                )
            })}
        </div>
    </div>
}