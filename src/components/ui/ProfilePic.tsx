
interface ProfilePicPropInterface{
    srcLink?: string;
    size?: 'xs'|'sm'|'md'|'lg'|'xl'
}



export const ProfilePic = ({srcLink="vite.svg"}: ProfilePicPropInterface)=>{
    return(
        <div className="rounded-full aspect-square outline-2 dark:outline-accent-black outline-accent-white
        bg-sky-400 w-full">
            <img src={srcLink} alt="profile pic" className="w-full rounded-full object-cover aspect-square"/>
        </div>
    )
}