import React from "react";
import { Card } from "@/components/ui/card"

interface Debt {
  friendName: string;
  amount: string;
  dueDate: string;
  isPaid: boolean; // Added a flag to track if the debt is paid
}

interface MicroDebtManagerProps {
  debts: Debt[];
  onPay: (index: number) => void; // Function to handle payment
}

const MicroDebtManager: React.FC<MicroDebtManagerProps> = ({
  debts,
  onPay,
}) => {
  return (
    <div className="bg-gray-1200 p-6 rounded-lg shadow-lg mt-6">
      <h3 className="text-xl font-semibold text-white mb-4">Your Micro-Debts</h3>
      {debts.length === 0 ? (
        <div className="text-gray-400">No debts added. Maybe it's time to be a better friend, huh? 🐾</div>
      ) : (
        <div className="space-y-4">
          {debts.map((debt, index) => (
            <Card
              key={index}
              className={`flex items-center gap-4 bg-gray-1100 p-4 rounded-lg ${debt.isPaid ? "border-emerald-500 border" : ""}`}
            >
              <div className="flex-1">
                <span className="text-lg font-semibold text-white">{debt.friendName}</span>
                <div className="text-sm text-gray-400">${debt.amount}</div>
                <div className="text-xs text-gray-500">Due: {debt.dueDate}</div>
              </div>
              <button
                onClick={() => onPay(index)}
                className={`${
                  debt.isPaid ? "bg-gray-500 text-white" : "bg-emerald-500 text-white"
                } py-2 px-4 rounded-md`}
              >
                {debt.isPaid ? "Paid" : "Pay"}
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MicroDebtManager;
