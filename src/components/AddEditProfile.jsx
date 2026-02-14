import {
  X,
  Save,
  Upload,
  User,
  AtSign,
  Link as LinkIcon,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createProfile, updateProfile } from "../app/ProfileSlice";

export default function AddEditProfileUI({ handleCancel, editingProfile }) {
  const isEditMode = Boolean(editingProfile);
  console.log(isEditMode);
  // console.log(editingProfile);

  // const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    plateform: "",
    profileLink: "",
    note: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (editingProfile) {
      setFormData({
        fullName: editingProfile.fullName || "",
        username: editingProfile.username || "",
        plateform: editingProfile.plateform || "Instagram",
        profileLink: editingProfile.profileLink || "",
        note: editingProfile.note || "",
        imageUrl: editingProfile.imageUrl || "",
      });
    }
  }, [editingProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlatformClick = (plateform) => {
    setFormData((prev) => ({
      ...prev,
      plateform: plateform,
    }));
  };

  useEffect(() => {
    if (formData.username && formData.plateform) {
      const links = {
        Instagram: `https://instagram.com/${formData.username}`,
        Facebook: `https://facebook.com/${formData.username}`,
        Twitter: `https://twitter.com/${formData.username}`,
        LinkedIn: `https://linkedin.com/in/${formData.username}`,
        YouTube: `https://youtube.com/@${formData.username}`,
        TikTok: `https://tiktok.com/@${formData.username}`,
      };

      setFormData((prev) => ({
        ...prev,
        profileLink: links[prev.plateform] || "",
      }));
    }
  }, [formData.username, formData.plateform]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      dispatch(
        updateProfile({
          documentId: editingProfile.$id, // 👈 IMPORTANT
          data: {
            fullName: formData.fullName,
            username: formData.username,
            plateform: formData.plateform || "Instagram",
            profileLink: formData.profileLink,
            note: formData.note,
            imageUrl: formData.imageUrl,
          },
        }),
      );
    } else {
      dispatch(
        createProfile({
          fullName: formData.fullName,
          username: formData.username,
          plateform: formData.plateform,
          profileLink: formData.profileLink,
          note: formData.note,
          imageUrl: formData.imageUrl,
        }),
      );

      setFormData({
        fullName: "",
        username: "",
        plateform: "",
        profileLink: "",
        note: "",
        imageUrl: "",
      });
    }

    handleCancel();
  };

  const platforms = [
    "Instagram",
    "Facebook",
    "Twitter",
    "LinkedIn",
    "YouTube",
    "TikTok",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-900">Add New Profile</h1>
            <button
              onClick={() => handleCancel()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md shadow-gray-200/70 p-6 sm:p-8"
        >
          {/* Profile Image Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-3">Profile Image</label>
            <div className="flex items-center gap-6">
              {formData.imageUrl ? (
                <img
                  src={formData.imageUrl}
                  alt="Profile preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  readOnly
                  placeholder="Enter image URL"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="text-gray-500 text-sm mt-1">
                  It is not working currently so you leave it
                  {/* Paste an image URL or leave blank */}
                </p>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Username */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username *
            </label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <p className="text-gray-500 text-sm mt-1">Enter without @ symbol</p>
          </div>

          {/* Platform */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-3">Platform *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {platforms.map((plateform) => (
                <button
                  key={plateform}
                  type="button"
                  // value={formData.plateform}
                  onClick={() => handlePlatformClick(plateform)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all ${
                    formData.plateform === plateform
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {plateform}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Link */}
          <div className="mb-6">
            <label htmlFor="profileLink" className="block text-gray-700 mb-2">
              Profile Link
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="profileLink"
                type="url"
                name="profileLink"
                value={formData.profileLink}
                onChange={(e) =>
                  setFormData({ ...formData, profileLink: e.target.value })
                }
                placeholder="https://..."
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50"
                readOnly
              />
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Auto-generated based on plateform and username
            </p>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <label htmlFor="notes" className="block text-gray-700 mb-2">
              Notes
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                id="note"
                value={formData.note}
                onChange={handleChange}
                name="note"
                placeholder="Add any note about this person..."
                rows={4}
                maxLength={50}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => handleCancel()}
              type="button"
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Save className="w-5 h-5" />
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
