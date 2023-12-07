import {NextResponse} from 'next/server'
import prisma from '@/libs/prisma'

export async function POST(request){
    try {
        const data = await request.json()

        console.log('data',data)
        const{hour,day,pay,cost,userId,service} = data


        const reservExist = await prisma.shift.findFirst({
            where:{
                day,
                hour,
                pay,
                userId,
                service
            }
        })

        if(reservExist){
            return NextResponse.json({
                message:'El turno ya fue reservado',
                reserva:false
            },{
                status:404
            })
        }

        const createReserv = await prisma.shift.create({
            data:{
                hour,
                day,
                pay,
                cost,
                service,
                user:{
                    connect:{ id : userId }
                }
                
            }
        })

        console.log('reserva',createReserv)

        return NextResponse.json(createReserv)
    
    } catch (error) {
        return NextResponse.json({
            message: error.message
        },{
            status:500
        })
    }
}