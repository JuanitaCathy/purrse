"use client";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card"; // Custom Card component or UI library
import { toast } from "sonner";
import GroceryOptimizer from "@/components/GroceryOptimizer";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button"; // Assuming you have a custom Button component
import { AcademicFinanceTracker} from "@/components/AcademicOrganizer";


const Fund: React.FC = () => {
  const [goal, setGoal] = useState<number | undefined>(undefined); // Goal state
  const [goalInput, setGoalInput] = useState<string>(""); // Temporary goal input value
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [amountToAdd, setAmountToAdd] = useState<number>(0); // For manual amount input
  const [savingsList, setSavingsList] = useState<{ amount: number; date: string }[]>([]);
  const [goalReached, setGoalReached] = useState<boolean>(false);
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false); // Flag for editing goal
  const [showCongratsModal, setShowCongratsModal] = useState<boolean>(false); // For displaying the congrats modal

  // Handle adding savings to the fund
  const handleAddAmount = () => {
    if (amountToAdd <= 0) {
      toast.error("Please enter a valid amount to add! 🐾");
      return;
    }

    const newAmount = currentAmount + amountToAdd;
    setCurrentAmount(newAmount);

    // Save the log
    const dateAdded = new Date().toLocaleString();
    setSavingsList([...savingsList, { amount: amountToAdd, date: dateAdded }]);

    // Show a cute toast message
    toast.success(`Purrfect! You've added ₹${amountToAdd} to your fund! 🐾`);

    // Check if goal is reached
    if (newAmount >= (goal || 0)) {
      setGoalReached(true);
      triggerConfetti();
      setShowCongratsModal(true); // Show the congrats modal
    }

    setAmountToAdd(0); // Clear the input field after adding the amount
  };

  // Confetti animation for goal reached
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Progress calculation
  const progress = goal ? Math.min((currentAmount / goal) * 100, 100) : 0;

  // Handle editing the goal
  const handleEditGoal = () => {
    setIsEditingGoal(true);
    setGoalInput(goal?.toString() || ""); // Pre-fill the input field with the current goal
  };

  // Handle saving the new goal
  const handleSaveGoal = () => {
    if (goalInput && !isNaN(Number(goalInput))) {
      setGoal(Number(goalInput)); // Save the goal only when the button is clicked
      setIsEditingGoal(false); // Exit the editing mode
    }
  };

  // Handle adding a new goal
  const handleAddNewGoal = () => {
    setGoal(undefined);
    setCurrentAmount(0);
    setGoalReached(false);
    setSavingsList([]);
    setShowCongratsModal(false); // Close the congrats modal
  };

  return (
    <div className="p-8 bg-gray-1200">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Cat-strophic Fund</h2>
      <Card className="p-6 bg-gray-900 rounded-lg shadow-xl max-w-[1200px] mx-auto w-full grid grid-cols-2 gap-8 h-full">

        {/* Left section: Goal and Progress */}
        <div className="flex flex-col">
          {/* Goal and Progress */}
          <div className="mb-4 text-center">
            {goal !== undefined && !isEditingGoal ? (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl text-white">{`Goal: ₹${goal}`}</h3>
                </div>
                <Progress value={progress} max={100} className="h-3 rounded-md bg-emerald-500" />
                <p className="text-sm text-gray-400 mt-2">
                  Saved: ₹{currentAmount} | {Math.round(progress)}% complete
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl text-white mb-2">{isEditingGoal ? "Edit Your Goal" : "Set Your Monthly Goal:"}</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number" // Keep type="number" to allow only numeric input
                    value={goalInput} // Use goalInput for the input value
                    onChange={(e) => setGoalInput(e.target.value)} // Update only goalInput here
                    className="mt-2 p-3 w-full bg-gray-800 text-white rounded-md"
                    placeholder="Enter your goal"
                    min="0"
                  />
                  <button
                    onClick={handleSaveGoal}
                    className="bg-emerald-500 text-white py-3 px-4 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Add Amount Section */}
          <div className="mb-6 text-center">
            <input
              type="number"
              value={amountToAdd || ""}
              onChange={(e) => setAmountToAdd(Number(e.target.value))}
              className="mt-2 p-3 w-full bg-gray-800 text-white rounded-md"
              placeholder="Amount to add"
              min="0"
            />
            <div className="flex gap-4 mt-4 justify-center">
              {/* Edit Goal Button (if goal is set and not in editing mode) */}
              {goal !== undefined && !isEditingGoal && (
                <Button
                  onClick={handleEditGoal}
                  className="bg-gray-800 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-gray-700 w-full"
                >
                  Edit Goal
                </Button>
              )}

              {/* Add Funds Button */}
              <button
                onClick={handleAddAmount}
                className="bg-rose-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-rose-400 w-full"
              >
                Add Funds
              </button>
            </div>
          </div>

          {/* Catty Motivation */}
          {currentAmount > 0 && !goalReached && (
            <p className="text-emerald-500 text-center animate-pulse">
              Keep going, you're doing paw-some! 🐾
            </p>
          )}

          {/* Congrats Modal when Goal is Reached */}
          {showCongratsModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-gray-900 p-6 rounded-lg shadow-xl text-center">
                <p className="text-2xl font-semibold text-emerald-500">Congrats! You reached your goal! 😺🎉</p>
                <img
                  src="/cat-happy.gif" // Replace with a cute cat gif
                  alt="Happy Cat"
                  className="mx-auto mt-4 w-32 h-32 rounded-full"
                />
                <button
                  onClick={handleAddNewGoal}
                  className="mt-6 bg-rose-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-rose-400"
                >
                  Start New Goal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right section: Savings Log */}
        <div className="bg-gray-1100 p-6 rounded-lg shadow-lg overflow-y-auto max-h-96">
          <h3 className="text-lg text-white font-semibold mb-4">Savings Log</h3>
          {savingsList.length === 0 ? (
            <p>No savings added yet! Start adding funds 🐾</p>
          ) : (
            <ul>
              {savingsList.map((saving, index) => (
                <li key={index} className="flex justify-between mb-2 text-white">
                  <span>₹{saving.amount}</span>
                  <span>{saving.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <AcademicFinanceTracker />
        <GroceryOptimizer />
      </div>
    </div>
  );
};

export default Fund;
