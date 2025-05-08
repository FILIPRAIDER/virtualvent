export const SkeletonStoreCard = () => (
  <div className="flex justify-center">
    <div className="w-60 sm:w-72 animate-pulse">
      <div className="w-full h-72 bg-gray-200 rounded-[6px]" />
      <div className="h-4 bg-gray-300 rounded mt-2 w-3/4 mx-auto" />
      <div className="h-3 bg-gray-200 rounded mt-1 w-1/2 mx-auto" />
    </div>
  </div>
);
