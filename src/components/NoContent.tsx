

export const NoContent = ({items}:{items: string})=>{
    return(
        <div className="w-full h-full">
            <h1>No {items} yet...</h1>
        </div>
    )
}