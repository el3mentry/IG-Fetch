import { DownloadFileInfo } from "../types";
import IPostURL from "./IPostURL";

export default interface IVideoDownloader {
  downloadPostVideo(postURL: IPostURL): Promise<DownloadFileInfo>;
}
