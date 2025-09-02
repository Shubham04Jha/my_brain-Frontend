import { useCallback, useEffect, useRef } from "react"

export const useDebounce = (callback: ()=>void,delay: number)=>{

    const timerRef = useRef<ReturnType<typeof setTimeout>|null>(null);
    const debounceCall = useCallback(()=>{
        if(timerRef.current){
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(callback,delay);
    },[callback,delay])
    useEffect(()=>{
        return ()=>{
            if(timerRef.current) clearTimeout(timerRef.current);
        }
    },[])
    return(
        debounceCall
    )
}