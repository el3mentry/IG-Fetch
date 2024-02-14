export default function SourceURL() {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="inline-block text-white">source url</p>
      <div className="text-customSm border-none rounded-xl bg-field-color max-w-32 overflow-hidden min-h-10 max-h-14 break-words py-2 px-3 relative">
        abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
        <div className="absolute h-2 w-2 bg-black right-0 "></div>
      </div>
    </div>
  );
}
