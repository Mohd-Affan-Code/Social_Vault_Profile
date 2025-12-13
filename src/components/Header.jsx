import { useState } from "react";
import { Search, Plus, Lock } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* App Logo and Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-gray-900 hidden sm:block">
              Social Contact Vault
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search saved profiles…"
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Add Profile Button */}
          <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
