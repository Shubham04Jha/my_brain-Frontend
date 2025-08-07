

export const NoContent = ({items}:{items: string})=>{
    return(
        <div className="w-full h-full flex justify-center items-center">
            <h1>No {items} yet...</h1>
        </div>
    )
}