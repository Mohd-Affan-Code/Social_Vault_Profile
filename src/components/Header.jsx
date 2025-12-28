import { useState } from "react";
import { Search, Plus, Lock, LogOut, User } from "lucide-react";
import { authService } from "../services/appwrite/auth";
export default function Header({ handleCancel, user, onLogout, setUser }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  async function handleLogout() {
    try {
      await authService.logout();
      window.location.reload();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* App Logo and Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 hidden sm:block">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              />
            </div>
          </div>

          {/* Right Side: Add Button + User Menu */}
          <div className="flex items-center gap-3">
            {/* Add Profile Button */}
            <button
              onClick={() => handleCancel()}
              className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Profile</span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
              >
                <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700">
                  {user?.name || "User"}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
