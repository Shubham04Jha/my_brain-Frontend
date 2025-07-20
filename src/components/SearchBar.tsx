import { SearchIcon } from "../assets/icons/search"

const positioning = `left-16 right-16 md:left-32 md:right-32 lg:left-64 lg:right-64`
const placeholder = 'search through the contents...'

export const SearchBar = ()=>{
    return(
        <div className="col-span-full  h-8">
            <div className={` fixed ${positioning} bg-gray-dark dark:bg-gray opacity-50 h-8 rounded-md flex items-center px-2`} >
                <div className='w-6 dark:text-text-dark text-text-white'><SearchIcon/></div>
                <input
                    type="text"
                    className="flex-1 bg-transparent text-sm placeholder-gray-400 focus:outline-none items-center -mt-1 ml-4"
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}