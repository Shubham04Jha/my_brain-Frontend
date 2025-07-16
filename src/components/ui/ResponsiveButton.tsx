import type { ReactNode } from "react";
import useResponsive from "../../hooks/useResponsive";


interface ButtonProps{
    size: 'sm'|'md'|'lg'
    startIcon? : ReactNode;
    text: string;
    endIcon? : ReactNode;
    width?: string;
    padding?: string;
    showFull?: boolean;
}

const IconSize = {
    sm:'w-4',
    md:'w-8',
    lg:'w-16'
}

const TextSize = {
    sm:'text-xl',
    md:'text-2xl',
    lg:'text-4xl'
}

const defaultStyle = `dark:bg-secondary-black bg-secondary-white 
                        rounded-md inline-flex`

export const ResponsiveButton = ({
    size='md',
    startIcon,
    text,
    endIcon,
    width,
    padding,
    showFull
}: ButtonProps)=>{
    const {isMobile} = useResponsive();
    return(
        <div className={`${defaultStyle} ${width} ${padding} `}>
            <div className="justify-center flex gap-4 items-center">
                {startIcon&&<div className={`${IconSize[size]}`}>{startIcon}</div>}
                {(!isMobile||showFull)&&
                <div className={` flex items-center -mt-1 ${TextSize[size]}`}>
                    {text}
                </div>}
                {endIcon&&<div className={`${IconSize[size]}`}>{endIcon}</div>}
            </div>
        </div>
    )
}