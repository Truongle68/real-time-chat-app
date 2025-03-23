import { Image, Send, X } from "lucide-react";
import React, { useRef, useState } from "react";
import {toast} from "react-hot-toast"

const ChatInput = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState("");

  //useRef: lưu tham chiếu đến phần tử DOM && k gây re-render
  const fileInputRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setImagePreview(null)
    if(fileInputRef.current) fileInputRef.current.value = ""
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />

            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center cursor-pointer
              hover:scale-105"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="type message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full input input-bordered input-sm sm:input-md"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
          ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
