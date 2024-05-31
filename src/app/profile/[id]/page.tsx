export default function UserProfile({params}:any){
    return(
        <>
        <h1 className="text-4xl text-wh">Profile</h1>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p className="taxt-4xl ">Profile Page 
            <span className="p-2 rounded bg-yellow-200 text-black">{params.id}</span></p>
            
        </div>
        </>
    )
}