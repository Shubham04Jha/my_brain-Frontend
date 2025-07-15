import type { ReactNode } from "react";

const variants = {
    primary:'',
    secondary:' rounded-md ',
    circular: 'rounded-full aspect-square',
    square:'aspect-square rounded-2xl'
}

const sizes = {
    xs:'w-4',
    sm: 'w-8  hover:ring-4',
    md: 'w-16 py-2 px-4 hover:ring-4 ',
    lg:'w-32 py-2 px-4 hover:ring-4',
    xl:'w-48 py-4 px-8 hover:ring-4 ',
    '2xl':'w-64 py-8 px-16 hover:ring-4'
}

const buttonTextStyle = {
    xs:'font-semibold text-sm',
    sm: 'font-semibold text-md',
    md: 'font-semibold text-lg',
    lg:'font-semibold text-xl',
    xl:'font-bold text-2xl'
}

interface ButtonProps{
    variant: 'primary'|'secondary'|'circular'|'square',
    size: 'xs'|'sm'|'md'|'lg' |'xl';
    startIcon?: ReactNode;
    text?: string;
    endIcon?: ReactNode;
    onClick?: ()=> void;
}

export const Button = ({
    size= 'md',
    text,
    startIcon,
    endIcon,
    variant = 'secondary', 
    onClick

}: ButtonProps)=>{
    return (
        <button
            onClick={onClick}
            className={`
                dark:bg-secondary-black bg-secondary-white 
                outline-2  dark:outline-white outline-black
                border-2 dark:border-black border-white
                hover:ring-border-subtle
                ${variants[variant]} ${sizes[size]}`}
        >
            {startIcon}
            {text&&
            <div className={`truncate ${buttonTextStyle[size]}`}>
                {text}
            </div>
            }
            {endIcon}
        </button>
    )
}
