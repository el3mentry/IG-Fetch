import "./App.css";
import Page from "./components/Page";
import PostDownloader from "./utilities/classes/PostDownloader";
import FormValidator from "./utilities/classes/FormValidator";
import GenericFactory from "./utilities/factory/GenericFactory";
import IDownloaderService from "./utilities/interfaces/IDownloaderService";
import DownloaderService from "./utilities/services/DownloaderService";
import IPostDownloader from "./utilities/interfaces/IPostDownloader";
import IFormValidator from "./utilities/interfaces/IFormValidator";

function App() {
  let genericFactory: GenericFactory = new GenericFactory();
  let postDownloader: IPostDownloader =
    genericFactory.getObject(PostDownloader);
  let formValidator: IFormValidator = genericFactory.getObject(FormValidator);
  let downloaderService: IDownloaderService =
    genericFactory.getObject(DownloaderService);

  return (
    <Page
      postDownloader={postDownloader}
      formValidator={formValidator}
      downloaderService={downloaderService}
    />
  );
}

export default App;
