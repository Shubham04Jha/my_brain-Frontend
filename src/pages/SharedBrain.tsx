import { FallBack } from "../components/FallBack";
import { NoContent } from "../components/NoContent";
import { useSharedBrains } from "../hooks/useSharedBrains"


export const SharedBrains = ()=>{
    const {sharedBrains} = useSharedBrains();
    return(
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
    )
}

