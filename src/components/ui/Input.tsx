import { useTextAreaResize } from "../../hooks/useTextAreaResize";
import React from "react";


interface InputProps{
    placeholder?: string;
    type?: 'text'|'textBox';
    additionalStyles?: string;
}
//for additionalStyles provide tailwind-css classname only

const defaultStyles = 'outline-1 dark:outline-primary-dark outline-primary-white px-2 py-1 rounded-md ';

export const Input = React.forwardRef<HTMLInputElement|HTMLTextAreaElement,InputProps>(({placeholder,type='text',additionalStyles},ref )=>{
    const {textAreaRef,handleResize} = useTextAreaResize();
    const setRef = (el:HTMLTextAreaElement|HTMLInputElement|null) =>{
        if (el && el.tagName === 'TEXTAREA') {
            textAreaRef.current = el as HTMLTextAreaElement;
        }
        if (typeof ref === 'function') {
            ref(el);
        } else if (ref && 'current' in ref) {
            (ref).current = el;
        }
    }
    return(
        <div>
            {type=='text'?
                <input ref={setRef} type='text' placeholder={placeholder} className={`${defaultStyles} ${additionalStyles}`}/>
                :
                <textarea ref={setRef} onInput={handleResize} placeholder={placeholder} className={`${defaultStyles} 
                overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-track-sky-300
                ${additionalStyles}`} />
            }
        </div>
    )
})