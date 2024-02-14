type InputProps = {
  scrapedPostUrl: string;
};

export default function SourceURL({ scrapedPostUrl }: InputProps) {
  return (
    <div className="flex flex-col">
      <p className="inline-block text-white m-auto mb-1">source url</p>

      <div className="w-11/12 h-7 select-none bg-field-color rounded-full m-auto mb-3 mt-1 flex flex-row pr-1 pl-2 justify-center items-center text-semiTransparentWhite">
        <input
          value={scrapedPostUrl}
          className="bg-transparent outline-none cursor-default select-none text-customSm w-[96%]"
          readOnly={true}
        />
        <div className="h-4 w-4 bg-field-color rounded-full relative mx-1 hover:shadow-lg"></div>
      </div>
    </div>
  );
}
