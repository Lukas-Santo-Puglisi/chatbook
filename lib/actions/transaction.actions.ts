"use server"

import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { connectToDatabase } from '../database/mongoose';
import Transaction from '../database/models/transaction.model';
import { updateCredits } from './user.actions';
import { handleError } from '../utils';
//process checkout and payment with stripe
// ! is the non-null-assertion-operator of typescript. tells compiler that this variable is guaranteed to be non-null
export async function checkoutCredits(transaction: CheckoutTransactionParams){

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const amount = Number(transaction.amount) * 100
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    unit_amount: amount,
                    product_data: {
                        name: 'transaction.plan',
                    },
                },
                quantity: 1,
            },
        ],
        metadata: {
            plan: transaction.plan,
            credits: transaction.credits,

            userId: transaction.buyerId
        },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
    redirect(session.url!);
}

// creates transaction record in the database and attribute the credits to the user.
export async function createTransaction(transaction : CreateTransactionParams){
    try{
        await connectToDatabase();
        // create a new transaction with a buyer id
        const newTransaction = await Transaction.create({
            ...transaction,
            buyer : transaction.buyerId
        }
        ) 
        await updateCredits(transaction.buyerId, transaction.credits);
        return JSON.parse(JSON.stringify(newTransaction));
    }
    catch(error){
        handleError(error)
    }
}