import { db } from "@/lib/db";
import { userSubscription } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";



const return_url = process.env.NEXT_BASE_URL + '/'

export async function GET() {

    try {
    
        const {userId} = await auth()
        const user  = await currentUser()
        
        if(!userId){return new NextResponse('Unauthorized', { status: 401 })}
        
        const _userSubscription = await db.select().from(userSubscription).where(eq(userSubscription.userId, userId))

        if(_userSubscription[0] && _userSubscription[0].stripeCustomerId){
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: _userSubscription[0].stripeCustomerId,
                return_url,  
            })
            return NextResponse.json({url: stripeSession.url})
        }

        // first time subscribers 
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: return_url,
            cancel_url: return_url,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection: "auto",
            customer_email: user?.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: 'Chatify Pro',
                            description: 'Chatify Pro unlimeted PDF session'
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1

                }
            ],
            metadata:{
                userId
            }
        })
        return NextResponse.json({url: stripeSession.url})

    } catch (error) {
        console.log("STIPE_ERROR:", error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}