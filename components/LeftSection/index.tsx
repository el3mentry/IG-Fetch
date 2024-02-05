import Clear from "../../icons/Clear.svg";
import Paste from "../../icons/Paste.svg";
import React, { useEffect } from "react";

import Image from "next/image";

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
      <div className="box field-color rounded-border-18 mx-0 bg-blue-800 my-6 p-2">
        <input
          type="text"
          id="reels-url-field"
          placeholder="reels url"
          className="field no-background no-outline"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
        />

        <Image
          priority
          src={Paste}
          alt="Paste"
          height={16}
          title="Paste"
          id="Paste"
          role="button"
          onClick={handlePaste}
        />
        <Image
          priority
          src={Clear}
          alt="Clear"
          height={16}
          title="Clear"
          id="Clear"
          className="mx-3"
          onClick={handleClear}
          role="button"
        />
      </div>

      <div className="box mx-0 my-3" id="fileName">
        <input
          type="text"
          placeholder="name of file"
          className="field rounded-border-18"
        />
        <button className="button rounded-full mx-2 w-24" type="button">
          Save
        </button>
        <button className="button rounded-full w-44" type="button">
          Save as
        </button>
      </div>

      <div className="box mx-0 px-0 my-3">
        <input
          type="text"
          placeholder="discord channel webhook url"
          className="field rounded-border-18"
        />
        <button className="button rounded-full ml-2 w-24" type="button">
          Push
        </button>
      </div>

      <div className="box"></div>
    </div>
  );
}
