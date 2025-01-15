// components/ui/SkeletonWrapper.tsx
import React from "react";

interface SkeletonWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
        <div className="h-24 w-full rounded bg-gray-800 animate-pulse" />
        <div className="h-24 w-full rounded bg-gray-800 animate-pulse" />
        <div className="h-24 w-full rounded bg-gray-800 animate-pulse" />
      </div>
    );
  }

  return <>{children}</>;
};

export default SkeletonWrapper;
