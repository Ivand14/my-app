import {NextResponse} from 'next/server'
import mercadopago from 'mercadopago'

export async function GET(request){
    
    const data = request.json()

    const{paymentId} = data
    
    try{
        
        mercadopago.payment.get(paymentId)

    }catch(error){

    }

}