import { DownloadFileInfo } from "../types";
import IDownloaderService from "./IDownloaderService";
import IPostURL from "./IPostURL";

export default interface IPostDownloader {
  downloadPostVideo(
    postURL: IPostURL,
    downloadService: IDownloaderService,
  ): Promise<DownloadFileInfo>;
}
