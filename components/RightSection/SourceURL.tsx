export default function SourceURL() {
  return (
    <div className="flex flex-col">
      <p className="inline-block text-white m-auto mb-1">source url</p>

      {/* <div className="text-customSm border-none rounded-xl bg-field-color w-full overflow-hidden max-h-14 break-words py-2 px-3">
        <div className="w-full h-full relative">

          abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz
          <div className="h-2 w-2 bg-black z-10 right-2 rounded-full absolute"></div>
          
        </div>
      
      </div> */}

      <div className="w-11/12 select-none bg-field-color rounded-full px-3 m-auto mb-3 mt-1">
        <input value={"abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz"} className="w-full bg-transparent outline-none cursor-default select-none text-customSm" readOnly={true}/>
      </div>
    </div>
  );
}
