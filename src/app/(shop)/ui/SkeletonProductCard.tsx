export const SkeletonProductCard = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-white w-70 overflow-hidden animate-pulse">
        <div className="w-70 h-80 bg-gray-200 rounded-[6px]" />
        <div className="py-2 space-y-2">
          <div className="flex justify-between items-center">
            <div className="h-4 w-2/3 bg-gray-300 rounded" />
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
          </div>
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
          <div className="flex items-center gap-2">
            <div className="w-full h-8 bg-gray-300 rounded" />
            <div className="w-10 h-8 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
