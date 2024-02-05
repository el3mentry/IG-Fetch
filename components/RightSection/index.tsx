export default function RightSection() {
  return (
    <div className="right-section w-[100%] sm:w-[100%] lg:w-[30%] flex-shrink flex-grow">

      <p>Source url</p>
      <div className="p-3 border-none rounded-2xl bg-field-color"></div>

      <video className="bg-slate-200 rounded-lg w-[250px] h-[400px] my-6" />

      <p>Autoplay media from source</p>

      <div className="switch">
        <input type="checkbox" title="switch" />
        <span className="slider round"></span>
      </div>
    </div>
  );
}
