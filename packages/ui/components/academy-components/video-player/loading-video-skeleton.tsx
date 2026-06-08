export function LoadingVideoSkeleton() {
  return (
    <div className="w-full h-full animate-pulse bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 background-animate">
      <div className="flex items-center justify-center h-full">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full animate-spin border-t-white" />
        </div>
      </div>
    </div>
  );
}
