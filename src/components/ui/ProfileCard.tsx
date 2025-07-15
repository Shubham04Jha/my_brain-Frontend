import type { ReactNode } from "react"
import { ProfilePic } from "./ProfilePic"
import { Button } from "./Button";
import { shareSvg } from "../../assets/icons/share";
import useResponsive from "../../hooks/useResponsive";

interface ProfileCardProps{
    variant: 'folded'|"extended";
    username: string;
    profilePicLink?: string;
}



const defaultStyles: string = ` 
                                rounded-xl p-2
                                
                                gap-2
                                dark:outline-accent-dark outline-accent-white outline-2`;

export const ProfileCard = ({
    variant='folded',
    username="username",
    profilePicLink

}: ProfileCardProps): ReactNode=>{
    const {isMobile} = useResponsive();
    // if else case because folded will have different number of childrens then extended. 
    if(variant=='folded'){ 
        return(
            <div className={`${defaultStyles} dark:bg-primary-black bg-primary-white
             items-center flex min-h-32 min-w-48 max-w-72`}>
                <div className="max-w-1/3 w-1/3">
                    <ProfilePic {...profilePicLink&&{srcLink: profilePicLink}}/>
                </div>
                <div className="max-w-2/3 min-w-1/3 ">
                    <div className={`rounded-md items-center dark:bg-secondary-black bg-secondary-white px-2
                                w-full min-h-4 
                                whitespace-normal break-words flex-shrink text-sm 
                                mx-auto mb-2
                                outline-2
                                dark:outline-accent-white outline-accent-black`}>
                        {username}
                    </div>
                    <div><Button startIcon={shareSvg} variant="secondary" size="sm" text="Share"/></div>
                </div>
            </div>
        )
    }else if(isMobile){
        return(
            <>
                <div className={`${defaultStyles} dark:bg-background-black bg-background-white min-h-1/2 w-full`}>
                    <div className="flex ">
                        <div className="max-w-3/5 min-w-3/5">
                            <ProfilePic {...profilePicLink&&{srcLink: profilePicLink}}/>
                        </div>
                        <div className="w-full items-end flex justify-end">
                            <Button startIcon={shareSvg} variant="square" size="md"/>
                        </div>
                    </div>
                    <div className="my-4 flex justify-center dark:bg-primary-black bg-primary-white w-full rounded-md
                                    outline-2
                                    dark:outline-accent-white outline-accent-black"
                    >{username}</div>
                </div>
            </>
        )
    }else{
        return(
            <div className={`${defaultStyles} dark:bg-background-black bg-background-white h-screen w-full`}>
                <div className="flex p-8">
                    <div className="max-w-1/2 min-w-1/2">
                        <ProfilePic {...profilePicLink&&{srcLink: profilePicLink}}/>
                    </div>
                    <div className="w-full items-center flex justify-center">
                        <Button startIcon={shareSvg} variant="secondary" size="lg" text="Share Brain"/>
                    </div>
                </div>
                <div className="my-16 mx-auto w-2/3 text-6xl p-4
                
                dark:bg-primary-black bg-primary-white 
                rounded-xl outline-2 dark:outline-accent-white outline-accent-black
                text-text-black text-bold"
                ><p>{username}</p></div>
            </div>
        )
    }
}