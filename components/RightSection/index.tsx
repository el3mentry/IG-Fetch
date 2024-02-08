import AutoplayToggle from "./AutoplayToggle";
import PlayableMedia from "./PlayableMedia";
import SourceURL from "./SourceURL";

export default function RightSection() {
  return (
    <div className="right-section w-[100%] sm:w-[100%] lg:w-[30%] flex-shrink flex-grow">
      <SourceURL />
      <PlayableMedia />
      <AutoplayToggle />
    </div>
  );
}
