import "./App.css";
import Page from "./components/Page";
import VideoDownloader from "./utilities/VideoDownloader";

function App() {
  return <Page videoDownloader={VideoDownloader} />;
}

export default App;
