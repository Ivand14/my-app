import {NextResponse} from 'next/server'
import mercadopago from 'mercadopago'

export async function POST(request){
    
    const data = await request.json()

    console.log(data)
    
    mercadopago.configure({
        access_token:process.env.MERCADOPAGO_ACCESSTOKEN
    })

    try {
        
        const result = await mercadopago.preferences.create({
            
            items:[
                {
                    title:data.description,
                    unit_price:Number(data.cost),
                    currency_id:'ARS',
                    quantity:1
                }
            ],
            
            notification_url:'https://4d39-191-81-188-192.ngrok.io/api/mercadopago/webhook',
            
            back_urls:{
                success:'/Reserv',
                failure:'/Reserv'
            },

        })

        return NextResponse.json(result)

    } catch (error) {
        console.log(error)
        return NextResponse.json(error,{status:500})
    }
    
}