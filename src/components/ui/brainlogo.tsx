import { useNavigate } from "react-router-dom";
import { BrainLogo } from "../../assets/icons/logo"


export const OpenBrainLogo = ()=>{
    const navigate = useNavigate();
    return(
        <div className="flex gap-2 hover:cursor-pointer" onClick={()=>navigate('/')} >
            <div className='w-8'>< BrainLogo /></div>
            <p className='font-bold text-xl'>Open Brain</p>
        </div>
    )
}