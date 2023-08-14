import prisma from "@/app/libs/prismadb";

export default async function getListings(params) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category
    } = params;

    let query = {};

    if(userId) {
      query.userId = userId;
    }

    if(category) {
      query.category = category;
    }

    if(roomCount) {
      query.roomCount = {
        gte: +roomCount
      };
    }

    if(bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      };
    }

    if(guestCount) {
      query.guestCount = {
        gte: +guestCount
      };
    }

    if(locationValue) {
      query.locationValue = locationValue;
    }

    if(startDate && endDate) {
      query.NOT = {
        reservation: {
          some: {
            OR: [
              {
                endDate: {gte: startDate},
                startDate: {lte: endDate}
              },
              {
                startDate: {lte: endDate},
                endDate: {gte: endDate},
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeListings = listings.map((listing) => ({
        ... listing,
        createdAt: listing.createdAt.toISOString()
    }))
    return safeListings;
  } catch (error) {
    throw new Error(error);
  }
}
