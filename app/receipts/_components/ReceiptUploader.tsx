"use client";
import React, { useState, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

interface ReceiptData {
  date: string;
  store: string;
  amount: string;
  items?: string[];
}

const ReceiptUploader: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [savedReceipts, setSavedReceipts] = useState<ReceiptData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));

    // Convert image to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = (reader.result as string).split(",")[1];
      await analyzeReceipt(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const analyzeReceipt = async (base64Image: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/receiptUpload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ReceiptData = await response.json();
      setReceiptData(data);
    } catch (error) {
      console.error("Error analyzing receipt:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveReceipt = () => {
    if (receiptData) {
      setSavedReceipts((prev) => [...prev, { ...receiptData }]);
      setReceiptData(null); // Reset current data
      setSelectedImage(null); // Reset selected image
      setImageUrl(""); // Reset image preview
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Receipt Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {imageUrl && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Uploaded Receipt</h3>
              <div className="relative w-full h-64">
                <img
                  src={imageUrl}
                  alt="Uploaded receipt"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}

          {isLoading && <p className="text-center">Analyzing receipt...</p>}

          {receiptData && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Extracted Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Date:</p>
                  <p>{receiptData.date}</p>
                </div>
                <div>
                  <p className="font-medium">Store:</p>
                  <p>{receiptData.store}</p>
                </div>
                <div>
                  <p className="font-medium">Total Amount:</p>
                  <p>{receiptData.amount}</p>
                </div>
                {receiptData.items && (
                  <div>
                    <p className="font-medium">Items:</p>
                    <ul className="list-disc pl-4">
                      {receiptData.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                onClick={handleSaveReceipt}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-green-400"
              >
                Save Receipt
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Receipts Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">My Receipts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedReceipts.map((receipt, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{receipt.store}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <span className="font-medium">Date:</span> {receipt.date}
                </p>
                <p>
                  <span className="font-medium">Amount:</span> {receipt.amount}
                </p>
                {receipt.items && (
                  <div>
                    <p className="font-medium">Items:</p>
                    <ul className="list-disc pl-4">
                      {receipt.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReceiptUploader;
