import { auth } from "@clerk/nextjs"
import { db } from "./db"
import { userSubscription } from "./db/schema"
import { eq } from "drizzle-orm"


const DAY_IN_YEAR = 1000 * 60 * 60 * 24

export const checkSubscription = async () => {
    const {userId} = await auth() 
    if(!userId) return false

    const _userSubscription = await db.select().from(userSubscription).where(eq(userSubscription.userId, userId))

    if(!_userSubscription[0]){return false}

    const userSubrciption = _userSubscription[0]

    const isValid = userSubrciption.stripePriceId && userSubrciption.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_YEAR > Date.now()
    
    return !!isValid
}

