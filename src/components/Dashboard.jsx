import React, { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import { Plus, Search } from "lucide-react";
import ProfileCard from "./ProfileCard";
import Header from "./Header";
import AddEditProfile from "./AddEditProfile";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../app/ProfileSlice";
import DashboardShimmer from "./shimmer/DashboardShimmer";

export default function Dashboard({ setUser }) {
  const dispatch = useDispatch();
  const [editingProfile, setEditingProfile] = useState(null);
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { profiles, loading } = useSelector((state) => state.profiles);

  useEffect(() => {
    // Component load hote hi data fetch karo
    dispatch(fetchProfiles());
  }, [dispatch]);

  const filterProfile = profiles.filter((item) => {
    return item.fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const viewMode = "grid";

  const handleUpdateFormData = (editingProfile) => {
    setEditingProfile(editingProfile);
    setShowAddEdit(true);
  };

  const handleCancel = () => {
    setShowAddEdit((prev) => !prev);
    setEditingProfile(null);
  };
  if (showAddEdit) {
    return (
      <AddEditProfile
        handleCancel={handleCancel}
        editingProfile={editingProfile}
      />
    );
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header setUser={setUser} />
        <DashboardShimmer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        setUser={setUser}
        handleCancel={handleCancel}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {profiles.length === 0 ? (
          <EmptyState handleCancel={handleCancel} />
        ) : filterProfile.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-600 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-900">Your Profiles</h2>
                <p className="text-gray-600">
                  {filterProfile.length} saved{" "}
                  {filterProfile === 1 ? "profile" : "profiles"}
                </p>
              </div>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filterProfile.map((profile) => (
                <ProfileCard
                  key={profile.$id}
                  profile={profile}
                  handleUpdateFormData={handleUpdateFormData}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Floating Add Button (Mobile) */}
      <button
        onClick={() => handleCancel()}
        className="fixed bottom-6 right-6 w-14 h-14 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center sm:hidden hover:scale-110 active:scale-95"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
