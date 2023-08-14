import React from 'react'
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoritesClient from './FavoritesClient';
import getCurrentUser from '../actions/getCurrentUser';

const FavoritesPage = async() => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='No favourite found'
                    subTitle='Look like you have no favorite listings'
                />
            </ClientOnly>
        )
    }

    
  return (
    <ClientOnly>
        <FavoritesClient
            listings={listings}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default FavoritesPage