import {NextResponse} from 'next/server'
import bcrypt from 'bcrypt'
import prisma from '@/libs/prisma'

export async function POST(request){
    try {
        const data = await request.json()


        const findEmail = await prisma.user.findUnique({
            where:{
                email:data.email
            }
        })

        const findName = await prisma.user.findUnique({
            where:{
                name:data.name
            }
        })

        if(findEmail){
            return NextResponse.json({
                message:'El email ya existe'
            },{
                status:400
            })
        }

        if(findName){
            return NextResponse.json({
                message:'El Nombre ya existe'
            },{
                status:400
            })
        }

        const hashPass = await bcrypt.hash(data.password,8)

        const newUser = await prisma.user.create({
            data:{
                email:data.email,
                name:data.email,
                password:hashPass
            }
        })
        console.log(data)
        console.log(newUser)

        const{password: _, ...user} = newUser

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({
            message: error.message
        },{
            status:500
        })
    }

}