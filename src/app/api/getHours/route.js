import {NextResponse} from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(){

    const getHours = await prisma.shift.findMany({
        include:{
            user:true
        }
    })

    return NextResponse.json(getHours,{status:200})

}