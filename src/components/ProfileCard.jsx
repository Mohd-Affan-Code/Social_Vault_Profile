import {
  Copy,
  ExternalLink,
  Edit2,
  Trash2,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Music,
} from "lucide-react";

import { useDispatch } from "react-redux";
// import { removeProfile } from "../features/ProfileData/ProfileDataSlice";
import { deleteProfile } from "../app/ProfileSlice";

export default function ProfileCard({ profile, handleUpdateFormData }) {
  const dispatch = useDispatch();
  const getPlatformIcon = (plateform) => {
    switch (plateform) {
      case "Instagram":
        return <Instagram className="w-5 h-5" />;
      case "Facebook":
        return <Facebook className="w-5 h-5" />;
      case "Twitter":
        return <Twitter className="w-5 h-5" />;
      case "LinkedIn":
        return <Linkedin className="w-5 h-5" />;
      case "YouTube":
        return <Youtube className="w-5 h-5" />;
      case "TikTok":
        return <Music className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  const getPlatformColor = (plateform) => {
    switch (plateform) {
      case "Instagram":
        return "from-pink-500 to-purple-600";
      case "Facebook":
        return "from-blue-600 to-blue-700";
      case "Twitter":
        return "from-sky-400 to-blue-500";
      case "LinkedIn":
        return "from-blue-700 to-blue-800";
      case "YouTube":
        return "from-red-600 to-red-700";
      case "TikTok":
        return "from-gray-900 to-gray-800";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(profile.username);
  };

  const handleOpenProfile = () => {
    window.open(profile.profileLink, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md shadow-gray-200/70 hover:shadow-lg hover:shadow-gray-300/70 transition-all duration-300 overflow-hidden group">
      {/* Profile Header */}
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {/* Profile Image */}
          {profile.imageUrl ? (
            <img
              src={profile.imageUrl}
              alt={profile.fullName}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 shadow-sm"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white shadow-sm">
              {profile.fullName.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Name and Username */}
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 truncate mb-1">{profile.fullName}</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="truncate">@{profile.username}</span>
            </div>
          </div>
        </div>

        {/* Platform Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r ${getPlatformColor(
              profile.plateform,
            )} text-white shadow-sm`}
          >
            {getPlatformIcon(profile.plateform)}
            <span className="text-sm">{profile.plateform}</span>
          </div>
        </div>

        {/* Notes */}
        {profile.note && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-gray-600 text-sm line-clamp-2">{profile.note}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
            <Copy className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700" onClick={handleCopyUsername}>
              Copy
            </span>
          </button>
          <button
            onClick={handleOpenProfile}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700">Open</span>
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 flex items-center justify-end gap-2">
        <button
          onClick={() => handleUpdateFormData({ ...profile })}
          className="p-2 hover:bg-white rounded-lg transition-colors group/edit cursor-pointer"
        >
          <Edit2 className="w-4 h-4 text-gray-500 group-hover/edit:text-blue-600 transition-colors" />
        </button>
        <button
          onClick={() => dispatch(deleteProfile(profile.$id))}
          className="p-2 hover:bg-white rounded-lg transition-colors group/delete cursor-pointer"
        >
          <Trash2 className="w-4 h-4 text-gray-500 group-hover/delete:text-red-600 transition-colors" />
        </button>
      </div>
    </div>
  );
}
