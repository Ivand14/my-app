import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(request,{params}) {
    try {
        // Recibir datos de los parámetros de consulta
        
        const findUser = await prisma.user.findUnique({
            where:{
                email: params.email
            }
        })

        if (!findUser) {
            return NextResponse.json({
                message: 'Usuario no encontrado'
            }, {
                status: 404
            })
        }

        const {password:_,...user} = findUser 

        return NextResponse.json(user,{status:200})
    } catch (error) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}
