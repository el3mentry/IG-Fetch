export default function RightSection() {
  return (
    <div className="right-section w-[100%] sm:w-[100%] lg:w-[30%] flex-shrink flex-grow">
      <input type="text" placeholder="source url" className="field" />

      <div className="playable-media"></div>

      <p>Autoplay media from source</p>

      <div className="switch">
        <input type="checkbox" title="switch" />
        <span className="slider round"></span>
      </div>
    </div>
  );
}
