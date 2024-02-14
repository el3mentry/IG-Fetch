import React from "react";
import ReelsURL from "./ReelsURL";
import Save from "./Save";
import SaveAs from "./SaveAs";
import DiscordPush from "./DiscordPush";

interface InputProps {
  sourceUrl: string;
  setSourceUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function LeftSection({ sourceUrl, setSourceUrl }: InputProps) {
  function handlePaste() {
    navigator.clipboard.readText().then((cliptext) => setSourceUrl(cliptext));
  }

  function handleClear() {
    setSourceUrl("");
  }

  return (
    <div className="left-section w-[100%] sm:w-[100%] lg:w-[70%] flex-shrink flex-grow lg:px-32 xl:px-40 2xl:px-60">
      
      <ReelsURL
        sourceUrl={sourceUrl}
        setSourceUrl={setSourceUrl}
        handleClear={handleClear}
        handlePaste={handlePaste}
      />

      <div className="box mx-0 my-3" id="fileName">
        <input
          type="text"
          placeholder="name of file"
          className="field rounded-border-18 py-[10px] px-4 outline-none"
        />
        <Save />
        <SaveAs />
      </div>

      <DiscordPush />

      <div className="box"></div>
    </div>
  );
}
