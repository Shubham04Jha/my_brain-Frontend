import { useTextAreaResize } from "../../hooks/useTextAreaResize";
import React from "react";


interface InputProps{
    placeholder?: string;
    type?: 'text'|'textBox';
    additionalStyles?: string;
}
//for additionalStyles provide tailwind-css classname only

const defaultStyles = 'outline-1 dark:outline-primary-dark outline-primary-white px-2 py-1 rounded-md ';

export const Input = React.forwardRef<HTMLInputElement,InputProps>(({placeholder,type='text',additionalStyles},ref )=>{
    const {textAreaRef,handleResize} = useTextAreaResize();
    return(
        <div>
            {type=='text'?
                <input ref={ref} type='text' placeholder={placeholder} className={`${defaultStyles} ${additionalStyles}`}/>
                :
                <textarea ref={textAreaRef} onInput={handleResize} placeholder={placeholder} className={`${defaultStyles} 
                overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
                ${additionalStyles}`} />
            }
        </div>
    )
})