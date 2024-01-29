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
    <div className="left-section">
      <div className="box field-color rounded-border-18 ml-0 mr-0 bg-blue-800">
        <input
          type="text"
          id="reels-url-field"
          placeholder="reels url"
          className="field no-background no-outline "
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
          className="ml-6"
          onClick={handleClear}
          role="button"
        />
      </div>

      <div className="box ml-0 mr-0 pl-0 pr-0" id="fileName">
        <input
          type="text"
          placeholder="name of file"
          className="field rounded-border-18"
        />
        <button className="button rounded-border-18" type="button">
          Save
        </button>
        <button className="button rounded-border-18" type="button">
          Save as
        </button>
      </div>

      <div className="box ml-0 mr-0 pl-0 pr-0">
        <input
          type="text"
          placeholder="discord channel webhook url"
          className="field rounded-border-18"
        />
        <button className="button rounded-border-18" type="button">
          Push
        </button>
      </div>

      <div className="box"></div>

      <div className="box align-items-center no-background ml-0 mr-0 pl-0 pr-0">
        <button className="button rounded-border-18" type="button">
          Compress video
        </button>
      </div>
    </div>
  );
}
