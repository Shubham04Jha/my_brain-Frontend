import type { ReactNode } from "react";

const variants = {
    primary:'',
    secondary:' rounded-md ',
    circular: 'rounded-full aspect-square',
    square:'aspect-square rounded-xl',
    regular:''
}

const sizes = {
    xs:'w-4',
    sm: 'min-w-8 px-1 hover:ring-2 outline-1',
    md: 'min-w-16 hover:ring-2 outline-1',
    lg:'min-w-32 py-2 px-4 hover:ring-2 border-2 outline-2',
    xl:'min-w-48 py-4 px-8 hover:ring-4 border-2 outline-2',
    '2xl':'w-64 py-8 px-16 hover:ring-4 border-4 outline-4'
}

const buttonTextStyle = {
    xs:'font-semibold text-xs',
    sm: 'font-semibold text-sm',
    md: 'font-semibold text-md',
    lg:'font-semibold text-4xl',
    xl:'font-bold text-xl'
}

const IconSize = {
    xs:'w-2',
    sm:'w-4',
    md:'w-8',
    lg:'w-16',
    xl:'w-32'
}

interface ButtonProps{
    variant: 'primary'|'secondary'|'circular'|'square'|'regular',
    size?: 'xs'|'sm'|'md'|'lg' |'xl';
    startIcon?: ReactNode;
    text?: string;
    endIcon?: ReactNode;
    onClick?: ()=> void;
    additionalStyles?: string;
    iconContainerStyle?: string;
}


export const Button = ({
    size= 'md',
    text,
    startIcon,
    endIcon,
    variant = 'secondary', 
    additionalStyles,
    iconContainerStyle,
    onClick

}: ButtonProps)=>{
    return (
        variant=='regular'?
        <button 
            onClick={onClick}
            className={`${additionalStyles} dark:bg-primary-dark bg-primary-white 
            hover:border-2 
            font-semibold
            hover-ring-border-subtle 
            flex justify-start pl-1 gap-2 items-center`}>
                {startIcon&&
                    <div className={`${iconContainerStyle} `}>
                        {startIcon}
                    </div>
                }
                {text}
        </button>
        :
        <button
            onClick={onClick}
            className={` flex gap-2 justify-around 
                dark:bg-secondary-black bg-secondary-white 
                dark:outline-white outline-black
                dark:border-accent-black border-accent-white
                hover:ring-border-subtle
                ${variants[variant]} ${sizes[size]}`}
        >
            {startIcon&&
            <div className={`${IconSize[size]} align-center mx-auto`}>
                {startIcon}
            </div>
            }
            {text&&
            <div className={` ${buttonTextStyle[size]} py-2`}>
                {text}
            </div>
            }
            {endIcon&&
            <div className={`${IconSize[size]} align-center mx-auto`}>
                {endIcon}
            </div>
            }
        </button>
    )
}
