

interface InputProps{
    placeholder?: string;
    type?: 'text'|'textBox';
    additionalStyles?: string;
}
//for additionalStyles provide tailwind-css classname only

const defaultStyles = 'outline-1 dark:outline-primary-dark outline-primary-white px-2 py-1 rounded-md';

export const Input: React.FC<InputProps> = ({placeholder,type='text',additionalStyles} )=>{
    return(
        <div>
            <input type={type} placeholder={placeholder} className={`${defaultStyles} ${additionalStyles}`}/>
        </div>
    )
}