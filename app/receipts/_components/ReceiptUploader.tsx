"use client";
import React, { useState } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";

interface Receipt {
  imageUrl: string;
  extractedData: string;
}

const ReceiptUploader = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Send the file to the API route for further processing
        const response = await axios.post("/api/receiptUpload", formData);

        const extractedData = response.data.extracted_data; // Adjust based on the actual response structure
        const imageUrl = URL.createObjectURL(file);

        setReceipts((prevReceipts) => [
          ...prevReceipts,
          { imageUrl, extractedData },
        ]);
      } catch (error) {
        console.error("Error uploading receipt:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Plus Icon for Upload */}
      <div className="flex justify-center">
        <label htmlFor="file-upload" className="cursor-pointer text-purple-600">
          <PlusCircle className="h-12 w-12" />
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Receipts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {receipts.map((receipt, index) => (
          <div key={index} className="card bg-white shadow-md rounded-lg p-4">
            {/* Receipt Image */}
            <img src={receipt.imageUrl} alt="Receipt" className="w-full h-auto rounded-lg" />

            {/* Extracted Data */}
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Extracted Data</h3>
              <pre className="text-sm mt-2">{receipt.extractedData}</pre>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {isLoading && <div className="text-center text-purple-600">Processing...</div>}
    </div>
  );
};

export default ReceiptUploader;
