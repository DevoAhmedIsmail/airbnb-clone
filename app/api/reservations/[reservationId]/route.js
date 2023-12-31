import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE (request, {params}){
 const currentUser = await getCurrentUser();
 
 if(!currentUser) {
    return NextResponse.error();
 }

 const { reservationId } = params;

 if(!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid reservation  id")
 }

 const reservation = await prisma.reservation.deleteMany({
    where: {
        id: reservationId,
        OR: [
            { userId: currentUser.id},
            { listing: { userId: currentUser.id } }
        ]

    },
 })

 return NextResponse.json(reservation)
}