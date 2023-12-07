import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';
import prisma from '@/libs/prisma';

export async function POST(request) {

    const savedUserInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    console.log(savedUserInfo)

    try {
        
        const payment = await request.json();        


        if (payment.type === "payment") {
            const data = await mercadopago.payment.findById(payment.data.id);
            console.log('DATA STATUS',data.body.status);
            // if(data.body.status === 'approved'){
            //     await prisma.shift.update({where:{userId},data:{pay:true}})
            // }
        }

        return NextResponse.json(data.body.status, { status: 200 });
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Ocurrió un error en el pago' }, { status: 500 });
    }
}
