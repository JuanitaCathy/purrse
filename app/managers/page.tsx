"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react"; // Notification Bell Icon
import { Card } from "@/components/ui/card"; // Assuming ShadCN is set up in your project
import { toast } from "sonner";

const Managers: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [debts, setDebts] = useState<any[]>([]);

  // Form state
  const [subscriptionForm, setSubscriptionForm] = useState({ name: "", amount: "", dueDate: "" });
  const [debtForm, setDebtForm] = useState({ friendName: "", amount: "", debtDueDate: "" });

  // Handle adding a Subscription
  const handleAddSubscription = (name: string, dueDate: string, amount: string) => {
    const newSubscription = { name, dueDate, amount, isRenewed: false };
    setSubscriptions([...subscriptions, newSubscription]);
    toast.success("Subscription added! 🐾");

    // Clear the subscription form
    setSubscriptionForm({ name: "", amount: "", dueDate: "" });
  };

  // Handle adding a Micro-Debt
  const handleAddDebt = (friendName: string, amount: string, dueDate: string) => {
    const newDebt = { friendName, amount, dueDate, isPaid: false };
    setDebts([...debts, newDebt]);
    toast.success("Debt added! 🐱");

    // Clear the debt form
    setDebtForm({ friendName: "", amount: "", debtDueDate: "" });
  };

  // Handle renewing a subscription
  const handleRenewSubscription = (index: number) => {
    const updatedSubscriptions = [...subscriptions];
    updatedSubscriptions[index].isRenewed = true;
    setSubscriptions(updatedSubscriptions);
    toast.success("Subscription Renewed! 😸");
  };

  // Handle paying a debt
  const handlePayDebt = (index: number) => {
    const updatedDebts = [...debts];
    updatedDebts[index].isPaid = true;
    setDebts(updatedDebts);
    toast.success("Debt Paid! 🐾");
  };

  // Function to format amount in INR
  const formatCurrency = (amount: string) => {
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(Number(amount));
    return formattedAmount;
  };

  return (
    <div className="container mx-auto py-6">
      {/* Notification Bell Icon - Positioned at the bottom-right */}
      <div className="absolute bottom-6 right-6">
        <Bell className="text-emerald-500 h-8 w-8 cursor-pointer" />
      </div>

      {/* 2-Column Layout: Subscription Manager and Micro-Debt Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Subscription Manager */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold text-white mb-4">SUBSCRIPTION</h3>
          <Card className="flex flex-col gap-6 p-6 bg-gray-1200 shadow-lg rounded-lg w-full lg:w-[500px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const name = formData.get("name") as string;
                const dueDate = formData.get("dueDate") as string;
                const amount = formData.get("amount") as string;
                handleAddSubscription(name, dueDate, amount);
              }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm text-gray-400">Subscription Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={subscriptionForm.name}
                  onChange={(e) => setSubscriptionForm({ ...subscriptionForm, name: e.target.value })}
                  className="mt-2 p-3 w-full bg-gray-800 text-white rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm text-gray-400">Amount (INR)</label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  required
                  value={subscriptionForm.amount}
                  onChange={(e) => setSubscriptionForm({ ...subscriptionForm, amount: e.target.value })}
                  className="mt-2 p-3 w-full bg-gray-800 text-white rounded-md"
                  placeholder="Enter amount"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dueDate" className="block text-sm text-gray-400">Due Date</label>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  required
                  max={new Date().toISOString().split('T')[0]} // Setting max date to today
                  value={subscriptionForm.dueDate}
                  onChange={(e) => setSubscriptionForm({ ...subscriptionForm, dueDate: e.target.value })}
                  className="mt-2 p-3 w-full bg-gray-800 text-white rounded-md"
                />
              </div>
              <div className="flex justify-between space-x-4">
                <button
                  type="submit"
                  className="bg-emerald-500 text-white py-2 px-4 rounded-md w-full"
                >
                  Add Subscription
                </button>
              </div>
            </form>
          </Card>

          {/* Subscriptions Added Section */}
          <div className="text-white bg-gray-1100 p-6 rounded-lg mt-6">
            <h4 className="text-lg font-semibold mb-4">Subscriptions Added</h4>
            {subscriptions.length === 0 ? (
              <p>No subscriptions added yet. Add one above! 🐱</p>
            ) : (
              <ul className="space-y-2">
                {subscriptions.map((sub, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{sub.name} (Due: {sub.dueDate})</span>
                    <span>{formatCurrency(sub.amount)}</span>
                    <button
                      onClick={() => handleRenewSubscription(index)}
                      className="bg-emerald-500 text-white py-1 px-3 rounded-md"
                    >
                      {sub.isRenewed ? "Renewed" : "Renew"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Micro-Debt Manager */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-semibold text-white mb-4">MICRO DEBTS</h3>
          <Card className="flex flex-col gap-6 p-6 bg-gray-1200 shadow-lg rounded-lg w-full lg:w-[500px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const friendName = formData.get("friendName") as string;
                const amount = formData.get("amount") as string;
                const debtDueDate = formData.get("debtDueDate") as string;
                handleAddDebt(friendName, amount, debtDueDate);
              }}
            >
              <div className="mb-4">
                <label htmlFor="friendName" className="block text-sm text-gray-400">Friend's Name</label>
                <input
                  id="friendName"
                  name="friendName"
                  type="text"
                  required
                  value={debtForm.friendName}
                  onChange={(e) => setDebtForm({ ...debtForm, friendName: e.target.value })}
                  className="mt-2 p-3 w-full bg-gray-800 text-white rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm text-gray-400">Amount (INR)</label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  required
                  value={debtForm.amount}
                  onChange={(e) => setDebtForm({ ...debtForm, amount: e.target.value })}
                  className="mt-2 p-3 w-full bg-gray-800 text-white rounded-md"
                  placeholder="Enter amount"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="debtDueDate" className="block text-sm text-gray-400">Due Date</label>
                <input
                  id="debtDueDate"
                  name="debtDueDate"
                  type="date"
                  required
                  max={new Date().toISOString().split('T')[0]} // Setting max date to today
                  value={debtForm.debtDueDate}
                  onChange={(e) => setDebtForm({ ...debtForm, debtDueDate: e.target.value })}
                  className="mt-2 p-3 w-full bg-gray-800 text-white rounded-md"
                />
              </div>
              <div className="flex justify-between space-x-4">
                <button
                  type="submit"
                  className="bg-emerald-500 text-white py-2 px-4 rounded-md w-full"
                >
                  Add Debt
                </button>
              </div>
            </form>
          </Card>

          {/* Debts Section */}
          <div className="text-white bg-gray-1100 p-6 rounded-lg mt-6">
            <h4 className="text-lg font-semibold mb-4">Debts</h4>
            {debts.length === 0 ? (
              <p>No debts added yet. Add some above! 🐾</p>
            ) : (
              <ul className="space-y-2">
                {debts.map((debt, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span> You owe {debt.friendName} ₹{debt.amount}</span>
                    <button
                      onClick={() => handlePayDebt(index)}
                      className="bg-emerald-500 text-white py-1 px-3 rounded-md"
                    >
                      {debt.isPaid ? "Paid" : "Pay"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Managers;
