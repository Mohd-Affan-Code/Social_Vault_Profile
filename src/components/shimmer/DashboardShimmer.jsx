export default function DashboardShimmer() {
  return (
    <div className="bg-white p-4 rounded-xl shadow animate-pulse">
      {/* Image */}
      <div className="h-40 bg-gray-300 rounded-lg"></div>

      {/* Name */}
      <div className="h-4 bg-gray-300 rounded mt-4 w-3/4"></div>

      {/* Subtitle */}
      <div className="h-3 bg-gray-300 rounded mt-2 w-1/2"></div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
