import Image from "next/image";
import Clear from "../../icons/Clear.svg";
import Paste from "../../icons/Paste.svg";

type InputProps = {
  sourceUrl: string;
  setSourceUrl: React.Dispatch<React.SetStateAction<string>>;
  handlePaste: () => void;
  handleClear: () => void;
};

export default function ReelsURL({
  sourceUrl,
  setSourceUrl,
  handlePaste,
  handleClear,
}: InputProps) {
  return (
    <div className="box field-color rounded-border-18 mx-0 my-6 p-2">
      <input
        type="text"
        id="reels-url-field"
        placeholder="reels url"
        className="field no-background no-outline p-2 px-3"
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
  );
}
