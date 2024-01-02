import IVideoDownloader from "../interfaces/IVideoDownloader";
import IPostURL from "../interfaces/IPostURL";
import { DownloadFileInfo, VideoInfo } from "../types";
import IDownloaderService from "../interfaces/IDownloaderService";

export default class VideoDownloader implements IVideoDownloader {
  downloaderService: IDownloaderService | null = null;

  getPostId = (postUrl: IPostURL): string => {
    let postId: string | undefined = "";

    const postRegex =
      /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;
    const reelRegex =
      /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

    const postCheck: RegExpMatchArray | null = postUrl.url.match(postRegex);
    if (postCheck) {
      postId = postCheck.at(-1);
    }

    const reelCheck: RegExpMatchArray | null = postUrl.url.match(reelRegex);
    if (reelCheck) {
      postId = reelCheck.at(-1);
    }
    if (!postId) return "";
    else return postId;
  };

  private async fetchPostJson(
    postURL: IPostURL,
    timeout?: number,
  ): Promise<VideoInfo> {
    const postId: string = this.getPostId(postURL);

    if (this.downloaderService) {
      const pageJson = await this.downloaderService.fetchFromPage(
        postId,
        timeout,
      );
      if (pageJson) return pageJson;

      const apiJson = await this.downloaderService.fetchFromGraphQL(
        postId,
        timeout,
      );
      if (apiJson) return apiJson;

      throw new Error("Video link for this post is not public.");
    } else {
      throw new Error("downloader service not initialized.");
    }
  }

  private async fetchVideoInfoAction(postURL: IPostURL): Promise<VideoInfo> {
    try {
      const videoInfo = await this.fetchPostJson(postURL);
      return videoInfo;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async downloadPostVideo(
    postURL: IPostURL,
    downloaderService: IDownloaderService,
  ): Promise<DownloadFileInfo> {
    this.downloaderService = downloaderService;
    try {
      let response: VideoInfo = await this.fetchVideoInfoAction(postURL);
      const { filename, videoUrl } = response;
      return { fileName: filename, videoURL: videoUrl };
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
