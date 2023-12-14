import {NextResponse} from 'next/server'
import mercadopago from "mercadopago";

export async function POST(request){

    try {
        const notifications = await request.json()


        if(notifications.type === 'payment'){
            const mpResponse = await mercadopago.payment.findById(notifications.data.id)
            const statusApproved = mpResponse.body.status

            if(statusApproved === 'approved') return NextResponse.json({status:204})
        }

        return NextResponse.json({status:200})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json(error,{status:500})
    }

    
}