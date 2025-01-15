// components/GroceryOptimizer.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const GroceryOptimizer: React.FC = () => {
  const [groceryBudget, setGroceryBudget] = useState<number>(0);
  const [groceryItems, setGroceryItems] = useState<{ name: string; price: number }[]>([]);
  const [remainingBudget, setRemainingBudget] = useState<number>(0);

  const handleGroceryBudgetSave = () => {
    setRemainingBudget(groceryBudget);
  };

  const handleAddGroceryItem = (name: string, price: number) => {
    if (price <= remainingBudget) {
      setGroceryItems([...groceryItems, { name, price }]);
      setRemainingBudget(remainingBudget - price);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
      <h3 className="text-xl text-white mb-4">Simplified Grocery Optimizer</h3>
      <input
        type="number"
        value={groceryBudget}
        onChange={(e) => setGroceryBudget(Number(e.target.value))}
        placeholder="Set your grocery budget"
        className="mb-4 p-3 w-full bg-gray-800 text-white rounded-md"
      />
      <Button onClick={handleGroceryBudgetSave} className="bg-emerald-500 text-white py-2 px-4 rounded-md">
        Save Budget
      </Button>
      <div className="mt-6">
        <h4 className="text-white">Remaining Budget: ₹{remainingBudget}</h4>
        <div>
          {groceryItems.map((item, index) => (
            <p key={index} className="text-white">
              {item.name} - ₹{item.price}
            </p>
          ))}
        </div>
        <div className="mt-4">
          <button
            onClick={() => handleAddGroceryItem("Apples", 50)}
            className="bg-rose-500 text-white py-2 px-4 rounded-md w-full"
          >
            Add Apples (₹50)
          </button>
          <button
            onClick={() => handleAddGroceryItem("Chips", 30)}
            className="bg-rose-500 text-white py-2 px-4 rounded-md w-full mt-2"
          >
            Add Chips (₹30)
          </button>
        </div>
        <p className="text-white mt-2">
          Do you really need those chips?!
        </p>
      </div>
    </div>
  );
};

export default GroceryOptimizer;
