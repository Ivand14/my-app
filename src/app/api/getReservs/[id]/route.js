import {NextResponse} from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(request,{params}){

    const findReservs = await prisma.shift.findMany({
        where:{userId:params.id},
    })


    return NextResponse.json(findReservs,{status:200})
}