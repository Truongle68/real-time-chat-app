import React, { useEffect, useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import imageCompression from "browser-image-compression";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState("");

  const { authUser, isUpdatingProfile, upload } = useAuthStore();

  async function compressImage(file) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image: ", error);
    }
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressedFile = await compressImage(file);
  
      if (!compressedFile || !(compressedFile instanceof Blob)) {
        throw new Error("Compressed file is invalid.");
      }
  
      const reader = new FileReader();
  
      reader.readAsDataURL(compressedFile);
  
      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        await upload({ profilePic: base64Image });
      };
      
    } catch (error) {
      console.error("Error handling image upload:", error);
    }

  };

  const prefetchImage = (url) => {
    const img = new Image();
    img.src = url;
  };
  
  useEffect(() => {
    //This will download the image in the background and store it in the browser cache.
    prefetchImage(authUser?.profilePic);
  });
  

  return (
    <div className="min-h-screen pt-20 text-base-content/50">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
                rel="preload"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="size-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadImage}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to upload your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <User className="size-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 border rounded-lg">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Mail className="size-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 border rounded-lg bg-base-200">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 p-6 rounded-xl bg-base-300">
            <h2 className="font-medium text-lg mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0] || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span>Account status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
