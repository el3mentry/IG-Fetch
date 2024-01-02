import IVideoDownloader from "../interfaces/IVideoDownloader";
import IPostURL from "../interfaces/IPostURL";
import { DownloadFileInfo, VideoInfo } from "../types";

export default class VideoDownloader implements IVideoDownloader {
  getPostId = (postUrl: IPostURL): string => {
    let postId: string | undefined = "";

    const postRegex =
      /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;
    const reelRegex =
      /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

    const postCheck = postUrl.url.match(postRegex);
    if (postCheck) {
      postId = postCheck.at(-1);
    }

    const reelCheck = postUrl.url.match(reelRegex);
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
    const postId = this.getPostId(postURL);

    // const pageJson = await fetchFromPage(postId, timeout);
    // if (pageJson) return pageJson;

    // const apiJson = await fetchFromGraphQL(postId, timeout);
    // if (apiJson) return apiJson;
    // throw new Error("Video link for this post is not public.");

    return {
      filename: "",
      width: "",
      height: "",
      videoUrl: "",
    };
  }

  private async fetchVideoInfoAction(postURL: IPostURL): Promise<VideoInfo> {
    try {
      const videoInfo = await this.fetchPostJson(postURL);
      return videoInfo;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async downloadPostVideo(postURL: IPostURL): Promise<DownloadFileInfo> {
    try {
      let response: VideoInfo = await this.fetchVideoInfoAction(postURL);
      const { filename, videoUrl } = response; // need to fix!!!!!!
      return { fileName: filename, videoURL: videoUrl };
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}
