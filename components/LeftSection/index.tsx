import Clear from "../../icons/Clear.svg";
import Paste from "../../icons/Paste.svg";

import Image from "next/image";

export default function LeftSection() {
  return (
    <div className="left-section">
      <div className="box field-color rounded-border-18 ml-0 mr-0">
        <input type="text" placeholder="reels url" className="field no-background no-outline" />
        <div className="flex flex-direction-row justify-content-space-between clear-paste">
            <Image priority src={Paste} alt="Paste" height={16} title="Paste" />
            <Image priority src={Clear} alt="Clear" height={16} title="Clear"/>
        </div>
      </div>

      <div className="box">
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

      <div className="box">
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

      <div className="box align-items-center no-background">
        <button className="button rounded-border-18" type="button">
          Compress video
        </button>
      </div>
    </div>
  );
}
