import { useState } from "react";
import { FallBack } from "../components/FallBack";
import { NoContent } from "../components/NoContent";
import { AddContentButton } from "../components/ui/addContentButton";
import { useSharedBrains } from "../hooks/useSharedBrains"

const defaultStyles = `outline-2 dark:outline-accent-dark outline-accent-white rounded-lg
             h-96 md:w-96 w-72 overflow-y-auto
            scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
            flex justify-center 
            absolute z-20
            dark:bg-background-black/90 bg-background-white/90 
`;

const FormContainer = ({children}:{children?: React.ReactNode})=>{
    return(
        <div className={`${defaultStyles}`} 
        onClick={(e: React.MouseEvent)=>{e.stopPropagation()}}>
            {children}
        </div>
    )
}

export const BlurredForm = ({blur,children}: {blur: boolean,children: React.ReactNode})=>{
    return(
        <div className="absolute z-11 dark:bg-background-black/50 bg-background-white/50 
        w-full h-screen flex justify-center items-center">
            <FormContainer>
                {children}
            </FormContainer>
        </div>
    )
}

export const SharedBrains = ()=>{
    const {sharedBrains} = useSharedBrains();
    const [addingBrain,setAddingBrian] = useState<boolean>(false);
    return(
        <>
        <BlurredForm blur={addingBrain as boolean} >
            <FormContainer>
                
            </FormContainer>
        </BlurredForm>
        <div className="h-screen w-full dark:bg-background-black  p-4 flex gap-4">
            {sharedBrains&&sharedBrains.length>0?sharedBrains.map((val,idx)=>{
                return(
                    <div className="w-24 h-24 bg-background-grey-300" key={idx}>
                        {val}
                    </div>
                )
            }):
                (sharedBrains&&sharedBrains.length==0)?<NoContent items="SharedBrains" />:<FallBack />
            }
        </div>
        <div className="relative -mt-4 mr-4">
            <AddContentButton handleClick={()=>{setAddingBrian(b=>!b)}} />
        </div>
        </>
    )
}

