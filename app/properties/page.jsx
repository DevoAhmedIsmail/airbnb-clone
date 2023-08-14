import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import PropertiesClient from './PropertiesClient'
import getListings from '../actions/getListings'

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

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

    const listings = await getListings({
        userId: currentUser.id,
    });

    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='No properties found'
                    subTitle='Looks like you have no properties.'
                />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default PropertiesPage