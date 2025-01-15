"use client"
import React, { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload } from "lucide-react";

interface ReceiptData {
  date: string;
  store: string;
  amount: string;
  items?: string[];
}

const ReceiptUploader: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));
    setError(null);
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = (reader.result as string).split(',')[1];
      await analyzeReceipt(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const analyzeReceipt = async (base64Image: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/receiptUpload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to analyze receipt');
      }

      setReceiptData(data);
    } catch (error) {
      console.error('Error analyzing receipt:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze receipt');
      setReceiptData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Receipt Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceiptUploader;