import Home from "./components/Home";
import PostDownloader from "./utils/classes/PostDownloader";
import FormValidator from "./utils/classes/FormValidator";
import GenericFactory from "./lib/factory/GenericFactory";
import IDownloaderService from "./utils/interfaces/IDownloaderService";
import DownloaderService from "./lib/services/DownloaderService";
import IPostDownloader from "./utils/interfaces/IPostDownloader";
import IFormValidator from "./utils/interfaces/IFormValidator";

function App() {
  let genericFactory: GenericFactory = new GenericFactory();
  let postDownloader: IPostDownloader =
    genericFactory.getObject(PostDownloader);
  let formValidator: IFormValidator = genericFactory.getObject(FormValidator);
  let downloaderService: IDownloaderService =
    genericFactory.getObject(DownloaderService);

  return (
    <Home
      postDownloader={postDownloader}
      formValidator={formValidator}
      downloaderService={downloaderService}
    />
  );
}

export default App;
