import AutoplayToggle from "./AutoplayToggle";
import PlayableMedia from "./PlayableMedia";
import SourceURL from "./SourceURL";

export default function RightSection() {
  return (
    <div className="flex flex-row w-[100%] sm:w-[100%] lg:w-[20%] flex-shrink flex-grow">
      <div className="flex flex-col">
        <SourceURL sourceUrl="abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz" />
        <PlayableMedia />
        {/* <AutoplayToggle /> */}
      </div>
      <div className="w-0 sm:w-0 lg:w-[10%]"></div>
    </div>
  );
}
