import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'
import bcrypt from 'bcrypt'
import prisma from '@/libs/prisma'

const authOptions = {
    providers:[
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials,req){
                
                const userFound = await prisma.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                })

                if(!userFound) throw new Error('Usuario no encontrado')

                const matchPass = await bcrypt.compare(credentials.password,userFound.password)

                if(!matchPass)  throw new Error('Contraseña incorrecta')

                console.log('user',userFound)

                return{
                    id: userFound.id,
                    name: userFound.name,
                    email:userFound.email
                }
                
            }
        })
    ],
    pages:{
        signIn:"/auth/login"
    }
}

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST}
