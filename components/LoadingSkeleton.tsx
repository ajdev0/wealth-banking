import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="   p-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-6 gap-4">
              <div className="h-10 bg-slate-200 rounded col-span-2"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-10 bg-slate-200 rounded col-span-2"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-32 bg-slate-200 rounded col-span-2"></div>
            </div>
            <div className="h-10 bg-slate-200 rounded"></div>
            <div className="h-20 bg-slate-200 rounded"></div>
            <div className="h-10 bg-slate-200 rounded"></div>
            <div className="h-20 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
