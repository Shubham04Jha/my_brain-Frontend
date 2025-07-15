import {defaultUserSvg} from '../../assets/defaultUser.tsx';

interface ProfilePicPropInterface{
    srcLink?: string;
    size?: 'xs'|'sm'|'md'|'lg'|'xl'
}




export const ProfilePic = ({
    srcLink
}: ProfilePicPropInterface)=>{
    return(
        <div className="rounded-full aspect-square outline-2 dark:outline-accent-black outline-accent-white
        bg-sky-400 w-full">
            {srcLink?<img src={srcLink} alt="profile pic" className="w-full rounded-full object-cover aspect-square"/>:defaultUserSvg}
        </div>
    )
}