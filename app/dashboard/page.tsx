import React from 'react';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import CreateTransactionDialog from './_components/CreateTransactionDialog';
import Overview from './_components/Overview';
import IncomeExpenseChart from './_components/IncomeExpenseChart';


async function page() {
    const user = await currentUser()
    if(!user){
        redirect("/sign-in")
    }

    const userSettings = await prisma.userSettings.findUnique({
        where:{
            userId: user.id,
            currency: 'INR',
        },
    });

    const data = [
        { month: "Jan 1-7", income: 1200, expense: 800, balance: 400 },
        { month: "Jan 8-14", income: 1400, expense: 600, balance: 800},
      ];

    return <div className='h-full bg-background'>
        <div className="border-b bg-card">
            <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
                <p className="text-2xl font-bold ml-6">Hello, {user.firstName}!👋</p>
                <div className="flex items-center gap-3">
                    <CreateTransactionDialog trigger={<Button variant={"outline"} className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white">Money Source 🤑 </Button>} type='income' />
                    <CreateTransactionDialog trigger={<Button variant={"outline"} className="border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white">Money Expense 😤 </Button>} type='expense' />
                </div>
            </div>
        </div>
        <Overview userSettings={userSettings} />
       <IncomeExpenseChart data={data} />
    </div>
}

export default page;