import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import ReservationClient from './ReservationClient';

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();
    
    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title='Unauthorized'
                    subTitle='Please login'
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if(reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='No reservations found'
                    subTitle='Looks like you have no reservations on your properties'
                />
            </ClientOnly>
        )
    }


  return (
    <ClientOnly>
        <ReservationClient
            reservations={reservations}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default ReservationsPage