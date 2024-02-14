export default function DiscordPush() {
  return (
    <div className="box mx-0 px-0 my-3">
      <input
        type="text"
        placeholder="discord channel webhook url"
        className="field rounded-border-18 outline-none py-[10px] px-4"
      />
      <button
        className="button rounded-full ml-2 w-24 hover:shadow text-customSm text-semiTransparentWhite"
        type="button"
      >
        push
      </button>
    </div>
  );
}
