import { DownloadFileInfo } from "../types";
import IDownloaderService from "./IDownloaderService";
import IPostURL from "./IPostURL";

export default interface IVideoDownloader {
  downloadPostVideo(
    postURL: IPostURL,
    downloadService: IDownloaderService
  ): Promise<DownloadFileInfo>;
}
