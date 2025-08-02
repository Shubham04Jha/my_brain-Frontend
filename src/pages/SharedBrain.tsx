import { useState } from "react";
import { FallBack } from "../components/FallBack";
import { NoContent } from "../components/NoContent";
import { AddContentButton } from "../components/ui/addContentButton";
import { useSharedBrains } from "../hooks/useSharedBrains"
import { BlurredForm } from "../components/ui/BlurredForm";

export const SharedBrains = ()=>{
    const {sharedBrains} = useSharedBrains();
    const [addingBrain,setAddingBrian] = useState<boolean>(false);
    return(
        <>
        <BlurredForm blur={addingBrain as boolean} handleClick={()=>{setAddingBrian(false)}}>
            
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

