import {NextResponse} from 'next/server'
import mercadopago from 'mercadopago'

export async function POST(request){

    const data = await request.json()

    const {description,cost} = data

    
    mercadopago.configure({
        access_token:"TEST-1084855897201649-120607-c094eb19fa4169fc5951ac0ca2c63725-832461865",
    })

    const result = await mercadopago.preferences.create({
        items: [
            {
                title: description,
                unit_price:Number(cost),
                currency_id: "ARS",
                quantity:1
            }
        ],
        
        notification_url:"https://1820-191-81-161-95.ngrok.io/api/mercadoPago/webhook",
        
        back_urls:{
            success: 'http://localhost:3000/Reserv',
            failure: 'http://localhost:3000/Reserv'
        }
    })

    console.log('result',result)
    return NextResponse.json(result.body)

}