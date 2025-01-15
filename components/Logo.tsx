import { Cat } from "lucide-react";
import React, { useState } from "react";
import confetti from "canvas-confetti";

function Logo() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [catImage, setCatImage] = useState("");
  const [quote, setQuote] = useState("");

  const financeQuotes = [
    "Saving today, secures your tomorrow!",
    "A budget is more than numbers on a page; it is your life goals.",
    "Don't count your coins, make your coins count!",
    "Invest in yourself, you’re worth it!",
    "Financial freedom is one step away, plan and save!",
  ];

  // Fetch random cat image
  const fetchCatImage = async () => {
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await response.json();
      setCatImage(data[0]?.url || null);
    } catch (error) {
      console.error("Error fetching cat image:", error);
    }
  };

  // Generate a random quote
  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * financeQuotes.length);
    setQuote(financeQuotes[randomIndex]);
  };

  // Launch confetti
  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 }, // Center of the screen
      colors: ["#bb0000", "#ffffff", "#ffbb00", "#00bbff"],
    });
  };

  const handleLogoClick = () => {
    setModalOpen(true);
    launchConfetti(); // Trigger confetti on click
    fetchCatImage();
    generateRandomQuote();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div onClick={handleLogoClick} className="cursor-pointer">
        <Cat className="w-11 h-11 mt-5 text-purple-200" />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                ✖
              </button>
            </div>
            <div className="text-center">
              <img
                src={catImage}
                alt="Random Cat"
                className="rounded-lg mb-4 w-64 h-64 object-cover mx-auto"
              />
              <h2 className="text-lg font-semibold mb-2">
                Hey there, finance wizard! 🐾
              </h2>
              <p className="text-gray-400 italic mb-4">{quote}</p>
              <button
                onClick={handleCloseModal}
                className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Logo;
