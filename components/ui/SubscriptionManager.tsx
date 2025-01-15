import React from "react";
import { Card } from "@/components/ui/card"

interface Subscription {
  name: string;
  dueDate: string;
  isRenewed: boolean; // Added a flag to track if the subscription is renewed
}

interface SubscriptionManagerProps {
  subscriptions: Subscription[];
  onRenew: (index: number) => void; // Function to handle renewal
}

const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({
  subscriptions,
  onRenew,
}) => {
  return (
    <div className="bg-gray-1200 p-6 rounded-lg shadow-lg mt-6">
      <h3 className="text-xl font-semibold text-white mb-4">Your Subscriptions</h3>
      {subscriptions.length === 0 ? (
        <div className="text-gray-400">No subscriptions added. Add one, and don't be a grumpy cat!</div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((sub, index) => (
            <Card
              key={index}
              className={`flex items-center gap-4 bg-gray-1100 p-4 rounded-lg ${sub.isRenewed ? "border-emerald-500 border" : ""}`}
            >
              <div className="flex-1">
                <span className="text-lg font-semibold text-white">{sub.name}</span>
                <div className="text-sm text-gray-400">Due: {sub.dueDate}</div>
              </div>
              <button
                onClick={() => onRenew(index)}
                className={`${
                  sub.isRenewed ? "bg-gray-500 text-white" : "bg-emerald-500 text-white"
                } py-2 px-4 rounded-md`}
              >
                {sub.isRenewed ? "Renewed" : "Renew"}
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionManager;
