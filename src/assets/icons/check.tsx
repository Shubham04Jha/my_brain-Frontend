
const check = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

const defaultStyle = `rounded-md aspect-square`;

interface CheckProps{
    width?: string;
}

export const Check = ({width='w-8'}: CheckProps)=>{
    return(
        <div className={`${defaultStyle} ${width} `}>
            {check}
        </div>
    )
}