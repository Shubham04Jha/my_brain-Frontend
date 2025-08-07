import { useRef, useState } from "react";
import { FallBack } from "../components/FallBack";
import { NoContent } from "../components/NoContent";
import { AddContentButton } from "../components/ui/addContentButton";
import { useSharedBrains } from "../hooks/useSharedBrains"
import { BlurredForm } from "../components/ui/BlurredForm";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { baseFrontEnd, baseUrl } from "../config";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

export const Form = ({closeFunction}: {closeFunction: ()=>void})=>{
    const linkRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const [shareType,setShareType] = useState<'link'|'username'>('link');
    const handleSend = async ()=>{
        let username = usernameRef.current?.value;
        if(shareType=='link'){
            const link = linkRef.current?.value;
            if(!link){
                toast.error('link field cannot be empty',{autoClose:2000});
                return;
            }
            if(!(link.startsWith(`${baseFrontEnd}/shared`))){
                toast.error('broken link',{autoClose:2000});
                return;
            }
            username = link.split(`/shared/`)[1];
        }
        try {
            const response = await fetch(`${baseUrl}/sharedBrains`,{
                method:'post',
                headers:{
                    'content-type': 'application/json',
                    'authorization':localStorage.getItem('token')||''
                },
                body:JSON.stringify({sharedBrain:username})
            });
            if(response.ok){
                const parsedResponse = await response.json();
                toast.success(parsedResponse.message||'successfully added the brain',{autoClose:1500});
                closeFunction();
            }else{
                const parsedResponse = await response.json();
                console.error(parsedResponse.message);
                toast.error(parsedResponse.message||'couldn\'d add brain');
            }
        } catch (error) {
            if(error instanceof Error ) console.error(error.message);
            else console.log('unexpected error occured');
        }
    }
    const shareTypeStyle = `hover:cursor-pointer dark:outline-accent-black outline-accent-white`
    return(
        <div>
            <div className="flex p-1 gap-4">
                <p className={`${shareTypeStyle} ${shareType=='link'?'outline-1':''}`}
                onClick={()=>setShareType('link')}>link</p> 
                <p className={`${shareTypeStyle} ${shareType=='username'?'outline-1':''}`}
                onClick={()=>setShareType('username')}>username</p>
            </div>
            {shareType=='link'?
            <div>
                <Input ref={linkRef} type="text" placeholder="Enter the sharedBrain link" />
            </div>:
            <div>
                <Input ref={usernameRef} type="text" placeholder="Enter the username" />
            </div>}
            <Button variant={"regular"} text="Add Shared Brain" onClick={handleSend}  />
        </div>
    )
}

export const SharedBrains = ()=>{
    const {sharedBrains,refetch} = useSharedBrains();
    const [addingBrain,setAddingBrian] = useState<boolean>(false);
    const navigate = useNavigate();
    return(
        <>
        <BlurredForm blurBackground={addingBrain as boolean} handleClick={()=>{setAddingBrian(false)}}>
            <Form closeFunction={()=>{
                setAddingBrian(false);
                refetch()}
            }/>
        </BlurredForm>
        <div className="h-screen w-full dark:bg-background-black  p-4 flex gap-4">
            {sharedBrains&&sharedBrains.length>0?sharedBrains.map((val,idx)=>{
                return(
                    <div className="outline-1 dark:outline-accent-black outline-accent-white w-24 h-24 bg-background-grey-300
                    flex justify-center items-center hover:cursor-pointer" key={idx}
                    onClick={()=>{navigate(`/shared/${val}`)}}>
                        {val}
                    </div>
                )
            }):
                (sharedBrains&&sharedBrains.length==0)?<NoContent items="SharedBrains" />:<FallBack />
            }
        </div>
        <div className="relative -mt-4 mr-4">
            <AddContentButton handleClick={()=>{setAddingBrian(b=>!b)}} />
        </div>
        </>
    )
}

