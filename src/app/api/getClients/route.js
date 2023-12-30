import {NextResponse} from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(){
    
    const getAllClients = await prisma.user.findMany()


    return NextResponse.json(getAllClients,{status:200})
    
}