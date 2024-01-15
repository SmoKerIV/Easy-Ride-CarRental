export async function GET(req,{params}){

let {id}=params

    let data = [
        {
            id:1,
            carName:"bmw",
            plateNumber:"1234"
        },
        {
            id:2,
            carName:"mercedus",
            plateNumber:"2468"
        },
        {
            id:3,
            carName:"ferrari",
            plateNumber:"3579"
        },
        {
            id:4,
            carName:"lemo",
            plateNumber:"9876"
        },
        {
            id:5,
            carName:"lexus",
            plateNumber:"5432"
        },
    ]
    return Response.json({data:data.find((el)=> el.id === parseInt(id))})
}