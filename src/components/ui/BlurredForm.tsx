
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

export const BlurredForm = ({blur,children,handleClick}: {blur: boolean,children?: React.ReactNode,handleClick: ()=>void})=>{
    return(
        blur&&<div className="absolute z-11 dark:bg-background-black/50 bg-background-white/50 
        w-full h-screen flex justify-center items-center" onClick={handleClick}>
            <FormContainer>
                {children}
            </FormContainer>
        </div>
    )
}