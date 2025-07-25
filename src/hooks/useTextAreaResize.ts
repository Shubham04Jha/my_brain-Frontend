import { useRef, type RefObject } from "react";

interface useTextAreaResizeReturn{
    textAreaRef:RefObject<HTMLTextAreaElement|null>;
    handleResize: ()=>void
}

function autoResize(textArea: HTMLTextAreaElement){
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
}
export const useTextAreaResize = (): useTextAreaResizeReturn =>{
    const textAreaRef = useRef<HTMLTextAreaElement|null>(null);
    const handleResize=():void =>{
        if(textAreaRef.current){
            autoResize(textAreaRef.current);
        }
    }
    return {textAreaRef,handleResize}
}