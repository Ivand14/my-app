import {NextResponse} from 'next/server'
import mercadopago from 'mercadopago'

export async function POST(request){
    
    const data = await request.json()

    
    mercadopago.configure({
        access_token:'TEST-1084855897201649-120607-c094eb19fa4169fc5951ac0ca2c63725-832461865'
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
                success:'http://localhost:3000/Reserv',
                failure:'http://localhost:3000/Reserv'
            },

        })

        return NextResponse.json(result)

    } catch (error) {
        console.log(error)
        return NextResponse.json(error,{status:500})
    }
    
}