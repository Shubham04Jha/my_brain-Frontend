import { OpenBrainLogo } from "./ui/brainlogo"


export const FallBack = ()=>{
    return(
        <>
        <div className="absolute left-4 top-4">
            <OpenBrainLogo /> 
        </div>
        <div className="w-full h-full">
            <h1>Something went wrong...</h1>
        </div>
        </>
        
    )
}