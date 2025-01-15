// components/GroceryOptimizer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface GroceryItem {
  name: string;
  price: number;
}

const GroceryOptimizer: React.FC = () => {
  const [groceryBudget, setGroceryBudget] = useState<string>(""); // Initialize as an empty string
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [remainingBudget, setRemainingBudget] = useState<number>(0);
  const [customItemName, setCustomItemName] = useState<string>("");
  const [customItemPrice, setCustomItemPrice] = useState<number | null>(null);
  const [suggestedItems, setSuggestedItems] = useState<GroceryItem[]>([]);

  // Fetching suggested student staples
  useEffect(() => {
    const fetchStudentStaples = async () => {
      try {
        // Simulated API call (replace with real API if available)
        const response = await new Promise<GroceryItem[]>((resolve) =>
          setTimeout(
            () =>
              resolve([
                { name: "Notebooks", price: 100 },
                { name: "Pens", price: 20 },
                { name: "Snacks", price: 150 },
                { name: "Stationery Set", price: 200 },
              ]),
            1000
          )
        );
        setSuggestedItems(response);
      } catch (error) {
        console.error("Failed to fetch staples:", error);
      }
    };

    fetchStudentStaples();
  }, []);

  const handleGroceryBudgetSave = () => {
    const budget = parseFloat(groceryBudget);
    if (!isNaN(budget) && budget > 0) {
      setRemainingBudget(budget);
    } else {
      alert("Please enter a valid budget!");
    }
  };

  const handleAddGroceryItem = (name: string, price: number) => {
    if (price <= remainingBudget) {
      setGroceryItems([...groceryItems, { name, price }]);
      setRemainingBudget(remainingBudget - price);
    } else {
      alert("You don't have enough budget for this item!");
    }
  };

  const handleAddCustomItem = () => {
    if (customItemName && customItemPrice !== null) {
      handleAddGroceryItem(customItemName, customItemPrice);
      setCustomItemName("");
      setCustomItemPrice(null);
    } else {
      alert("Please enter a valid name and price!");
    }
  };

  return (
    <Card className="bg-gray pl-6 pr-6 rounded-lg shadow-xl max-w-md mx-auto">
        <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl text-emerald-400">
          Student Staples Optimizer
        </CardTitle>
        <CardDescription className="text-lg text-gray-600">
          To list out the staples under your budget!
        </CardDescription>
        </CardHeader>
      <input
        type="number"
        value={groceryBudget}
        onChange={(e) => setGroceryBudget(e.target.value)}
        placeholder="Set your grocery budget"
        className="mb-4 p-3 w-full bg-gray-700 text-white rounded-md"
      />
      <Button
        onClick={handleGroceryBudgetSave}
        className="bg-emerald-500 text-white hover:bg-emerald-400 py-2 px-4 rounded-md w-full"
      >
        Save Budget
      </Button>

      <div className="mt-6">
        <h4 className="text-white font-semibold">Remaining Budget: ₹{remainingBudget}</h4>
        <div className="w-full bg-gray-600 rounded-full h-4 mt-2 overflow-hidden">
          <div
            style={{
              width: `${groceryBudget && remainingBudget ? (remainingBudget / parseFloat(groceryBudget)) * 100 : 0}%`,
            }}
            className="bg-emerald-500 h-4"
          ></div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-white font-semibold">Suggested Student Staples</h4>
        {suggestedItems.length > 0 ? (
          suggestedItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleAddGroceryItem(item.name, item.price)}
              className="bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded-md w-full mt-2"
            >
              Add {item.name} (₹{item.price})
            </button>
          ))
        ) : (
          <p className="text-gray-400 mt-2">Loading staples...</p>
        )}
      </div>

      <div className="mt-6">
        <h4 className="text-white font-semibold">Your Grocery Items</h4>
        {groceryItems.length > 0 ? (
          groceryItems.map((item, index) => (
            <p key={index} className="text-white mt-2">
              {item.name} - ₹{item.price}
            </p>
          ))
        ) : (
          <p className="text-gray-400 mt-2">No items added yet.</p>
        )}
      </div>

      <div className="mt-6">
        <h4 className="text-white font-semibold">Add Custom Item</h4>
        <input
          type="text"
          value={customItemName}
          onChange={(e) => setCustomItemName(e.target.value)}
          placeholder="Item Name"
          className="mt-2 p-3 w-full bg-gray-700 text-white rounded-md"
        />
        <input
          type="number"
          value={customItemPrice ?? ""}
          onChange={(e) => setCustomItemPrice(Number(e.target.value))}
          placeholder="Item Price"
          className="mt-2 p-3 w-full bg-gray-700 text-white rounded-md"
        />
        <Button
          onClick={handleAddCustomItem}
          className="bg-rose-500 text-white hover:bg-rose-400 py-2 px-4 rounded-md w-full mt-4"
        >
          Add Custom Item
        </Button>
      </div>
    </Card>
  );
};

export default GroceryOptimizer;
