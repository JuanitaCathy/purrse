import React from 'react';
import ReceiptUploader from './_components/ReceiptUploader';


const Page = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mt-5 mb-6">Receipts Hub - Track your Receipts!</h1>
      {/* Render the Receipt Uploader Component */}
      <ReceiptUploader />
    </div>
  );
};

export default Page;
