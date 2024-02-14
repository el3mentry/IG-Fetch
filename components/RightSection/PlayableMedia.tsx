type InputProps = {
  scrapedPostUrl: string;
};

export default function PlayableMedia({ scrapedPostUrl }: InputProps) {
  return (
    <video
      className="bg-field-color rounded-lg w-[250px] h-[400px] my-2"
      src={scrapedPostUrl}
    />
  );
}
