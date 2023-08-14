export {default } from "next-auth/middleware"

// to void error when hand written the url
export const config = {
    matcher: [
        "/trips",
        "/reservations",
        "/properties",
        "/favorites",
    ]
}