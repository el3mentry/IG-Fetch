import "./App.css";
import Page from "./components/Page";
import VideoDownloader from "./utilities/classes/VideoDownloader";
import FormValidator from "./utilities/classes/FormValidator";
import GenericFactory from "./utilities/factory/GenericFactory";

function App() {
  let genericFactory: GenericFactory = new GenericFactory();
  let videoDownloader: VideoDownloader =
    genericFactory.getObject(VideoDownloader);
  let formValidator: FormValidator = genericFactory.getObject(FormValidator);

  return (
    <Page videoDownloader={videoDownloader} formValidator={formValidator} />
  );
}

export default App;
