import type { ReactNode } from "react";
import useResponsive from "../../hooks/useResponsive";


interface ButtonProps{
    startIcon? : ReactNode;
    text?: string;
    endIcon? : ReactNode;
    
}


const responsiveButton = ()=>{
    const {isMobile} = useResponsive();
    return(
        <div>
            
        </div>
    )
}