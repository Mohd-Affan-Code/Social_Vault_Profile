import React from "react";
import { UserPlus, Lock, Users, Sparkles } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="min-h-[60vh]  flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 rounded-full flex items-center justify-center relative">
            {/* Decorative circles */}
            <div
              className="absolute top-0 right-8 w-12 h-12 bg-blue-200 rounded-full opacity-50 animate-pulse"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute bottom-4 left-4 w-16 h-16 bg-purple-200 rounded-full opacity-50 animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-8 left-0 w-8 h-8 bg-pink-200 rounded-full opacity-50 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />

            {/* Main icon */}
            <div className="relative z-10 w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg rotate-12 hover:rotate-0 transition-transform duration-300">
              <Lock className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Floating icons */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
            <div
              className="flex gap-2 animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-gray-900 mb-3">Your vault is empty</h2>
        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
          You haven{"'"}t saved any profiles yet. Start building your social
          contact vault by adding your first profile.
        </p>

        {/* Action Button */}
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:scale-[1.05] active:scale-[0.98]">
          <UserPlus className="w-5 h-5" />
          Add Your First Profile
        </button>

        {/* Features List */}
        <div className="mt-12 grid gap-4 text-left">
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Secure Storage</h3>
              <p className="text-gray-600 text-sm">
                Keep all your social contacts in one safe place
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Easy Organization</h3>
              <p className="text-gray-600 text-sm">
                Search and find profiles quickly when you need them
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Personal Notes</h3>
              <p className="text-gray-600 text-sm">
                Add context and remember important details
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
