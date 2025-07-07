export async function POST(request){
    const {email, password} = await request.json()

    if(email==="desire@gmail.com" && password==="abc@123"){
        return Response.json({ success: true});
    }

    return Response.json({ success: false}, {status: "401"});
}