export const LoadingState = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-5 border-l-4 border-l-gray-300 animate-pulse"
        >
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-gray-300" />
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="flex gap-2">
                <div className="h-6 bg-gray-300 rounded w-20" />
                <div className="h-6 bg-gray-300 rounded w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
