import { OpenBrainLogo } from "../components/ui/brainlogo"


export const PageNotFound = ()=>{
    return(
        <>
        <div className="absolute left-4 top-4">
            <OpenBrainLogo /> 
        </div>
        <div className="dark:bg-background-black bg-background-white w-full h-screen flex justify-center items-center">
            
            <div>
                <h1>404 Page not found...</h1>
                <h3>Try checking the url...</h3>
            </div>
        </div>
        </>
        
    )
}