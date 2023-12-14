import {NextResponse} from 'next/server'
import prisma from '@/libs/prisma'

export async function  POST(request){

    const userData = await request.json()

    const{description,hour,cost,day,userId} = userData
    
    if(userData){
        await prisma.shift.create({
                data:{
                service:description,
                hour,
                cost:Number(cost),
                day,
                userId,
                pay:true
            }
        })

        return NextResponse.json('Reserva Creada',{status:200})
        
    }

    return NextResponse.json({status:200})
}