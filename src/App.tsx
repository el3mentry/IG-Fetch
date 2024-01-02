import "./App.css";
import Page from "./components/Page";
import VideoDownloader from "./utilities/classes/VideoDownloader";
import FormValidator from "./utilities/classes/FormValidator";
import GenericFactory from "./utilities/factory/GenericFactory";
import IDownloaderService from "./utilities/interfaces/IDownloaderService";
import DownloaderService from "./utilities/services/DownloaderService";

function App() {
  let genericFactory: GenericFactory = new GenericFactory();
  let videoDownloader: VideoDownloader =
    genericFactory.getObject(VideoDownloader);
  let formValidator: FormValidator = genericFactory.getObject(FormValidator);
  let downloaderService: IDownloaderService =
    genericFactory.getObject(DownloaderService);

  return (
    <Page
      videoDownloader={videoDownloader}
      formValidator={formValidator}
      downloaderService={downloaderService}
    />
  );
}

export default App;
