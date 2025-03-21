import React from "react";
import { THEMES } from "../constant/themes";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  {id: 1, content: "Hey! How's it going?", isSent: false},
  {id: 2, content: "I'm doing great! Just working on some new feature.", isSent: true},
]

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className=" flex flex-col gap-1">
          <h2 className="text-lg font-bold">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your chat interface
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(t)}
            >
              <div
                className="relative h-8 w-full overflow-hidden rounded-md"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 p-1 gap-px">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold">Preview</h2>
        </div>

        <div className="mt-7 rounded-md py-4 border border-base-300 bg-base-200 shadow-sm">
          <div className="max-w-[50%] mx-auto rounded-md border-base-300 bg-base-100 shadow-sm">
            {/* Chat header */}
            <div className="p-4 border-b border-b-base-300">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-medium">
                  J
                </div>
                <div className="size-8 w-full flex flex-col justify-center">
                  <h3 className="text-sm font-medium">John Doe</h3>
                  <p className="text-xs text-base-content/70">Online</p>
                </div>
              </div>
            </div>
            {/* Chat body */}
            <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
              {PREVIEW_MESSAGES.map(m => (
                <div 
                  key={m.id}
                  className={`flex ${m.isSent ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`
                      max-w-[80%] rounded-xl p-3 shadow-sm
                      ${m.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                      `}
                    >
                      <p className="text-sm">{m.content}</p>
                      <p className={`text-[10px] mt-1.5 ${m.isSent ? "text-primary-content/70" : "text-base-content/70"} `}>12:00 PM</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Chat input */}
            <div className="p-4 border-t border-base-300 bg-base-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message ..."
                  value={"This is a preview"}
                  className="input input-bordered flex-1 text-sm h-10"
                  readOnly
                />
                <button className="btn btn-primary h-10 min-h-0">
                  <Send size={18}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
