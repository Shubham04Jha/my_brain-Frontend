import type { ReactNode } from "react"
import { ProfilePic } from "./ProfilePic"

interface ProfileCardProps{
    variant: 'folded'|"extended";
    username: string;
}



const defaultStyles: string = `dark:bg-primary-black bg-primary-white 
                                rounded-xl p-2
                                min-h-32 min-w-48 max-w-72
                                gap-2
                                dark:outline-accent-dark outline-accent-white outline-2`;

export const ProfileCard = ({
    variant='folded',
    username="username"

}: ProfileCardProps): ReactNode=>{
    // if else case because folded will have different number of childrens then extended. 
    if(variant=='folded'){ 
        return(
            <div className={`${defaultStyles} items-center flex `}>
                <div className="max-w-1/3 w-1/3">
                    <ProfilePic/>
                </div>
                <div className={`rounded-md items-center dark:bg-secondary-black bg-secondary-white px-2
                            max-w-2/3 min-w-1/3 min-h-4 whitespace-normal 
                            break-words flex-shrink text-sm 
                            mx-auto
                            outline-2
                            dark:outline-accent-white outline-accent-black`}>
                    {username}
                </div>
            </div>
        )
    }else{
        return(
            <div className={`${defaultStyles} `}>
                
            </div>
        )
    }
}