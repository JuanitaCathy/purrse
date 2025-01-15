import prisma from "@/lib/prisma";
import { OverviewQuerySchema } from "@/schema/overview";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    // Fetch the current user
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
    }

    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    // Validate the query parameters using the schema
    const queryParams = OverviewQuerySchema.safeParse({ from, to });
    if (!queryParams.success) {
        return new Response(
            JSON.stringify({ error: queryParams.error.message }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    // Fetch balance stats based on the validated query parameters
    const stats = await getBalanceStats(
        user.id,
        queryParams.data.from,
        queryParams.data.to
    );

    // Return the stats as JSON
    return new Response(JSON.stringify(stats), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

// Type for the stats response
export type getBalanceStatsResponseType = Awaited<ReturnType<typeof getBalanceStats>>;

// Function to fetch balance stats from the database
async function getBalanceStats(userId: string, from: Date, to: Date) {
    const totals = await prisma.transaction.groupBy({
        by: ["type"],
        where: {
            userId,
            date: {
                gte: from,
                lte: to,
            },
        },
        _sum: {
            amount: true,
        },
    });

    return {
        expense: totals.find((t) => t.type === "expense")?._sum.amount || 0,
        income: totals.find((t) => t.type === "income")?._sum.amount || 0,
    };
}
