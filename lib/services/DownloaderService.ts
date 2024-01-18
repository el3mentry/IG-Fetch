import IDownloaderService from "../../utils/interfaces/IDownloaderService";
import { HEADERS_FOR_GENERIC_PAGE, HEADERS_FOR_GRAPHQL } from "../../utils/constants";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { load, CheerioAPI } from "cheerio";
import { GraphQLResponse, VideoInfo } from "../../utils/types";

class FetcherFromPage {
  private getIGVideoFileName() {
    const timeStamp = Math.floor(Date.now() / 1000).toString();
    return `ig-downloader-${timeStamp}.mp4`;
  }

  private formatPageJson(postHtml: CheerioAPI) {
    const videoElement = postHtml("meta[property='og:video']");

    if (videoElement.length === 0) {
      return null;
    }

    const videoUrl = videoElement.attr("content");
    if (!videoUrl) return null;

    const width = postHtml("meta[property='og:video:width']").attr("content");
    const height = postHtml("meta[property='og:video:height']").attr("content");

    const filename = this.getIGVideoFileName();

    const videoJson: VideoInfo = {
      filename: filename,
      width: width ?? "",
      height: height ?? "",
      videoUrl: videoUrl,
    };

    return videoJson;
  }

  private async makeHttpRequest({
    ...args
  }: AxiosRequestConfig): Promise<AxiosResponse | null> {
    try {
      const response: AxiosResponse = await axios(args);
      return response;
    } catch (error: any) {
      return null;
    }
  }

  async fetchFromPage(postId: string, timeout: number = 0) {
    const postUrl = "https://www.instagram.com/p/" + postId;
    let response;
    const headers = HEADERS_FOR_GENERIC_PAGE;
    try {
      response = await this.makeHttpRequest({
        url: postUrl,
        method: "GET",
        headers,
        timeout,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }

    if (!response) return null;

    const postHtml = load(response.data);
    const videoElement = postHtml("meta[property='og:video']");

    if (videoElement.length === 0) {
      return null;
    }

    const formattedJson = this.formatPageJson(postHtml);
    return formattedJson;
  }
}

class FetcherFromGraphQL {
  private encodePostRequestData(shortcode: string) {
    const requestData = {
      av: "0",
      __d: "www",
      __user: "0",
      __a: "1",
      __req: "3",
      __hs: "19624.HYP:instagram_web_pkg.2.1..0.0",
      dpr: "3",
      __ccg: "UNKNOWN",
      __rev: "1008824440",
      __s: "xf44ne:zhh75g:xr51e7",
      __hsi: "7282217488877343271",
      __dyn:
        "7xeUmwlEnwn8K2WnFw9-2i5U4e0yoW3q32360CEbo1nEhw2nVE4W0om78b87C0yE5ufz81s8hwGwQwoEcE7O2l0Fwqo31w9a9x-0z8-U2zxe2GewGwso88cobEaU2eUlwhEe87q7-0iK2S3qazo7u1xwIw8O321LwTwKG1pg661pwr86C1mwraCg",
      __csr:
        "gZ3yFmJkillQvV6ybimnG8AmhqujGbLADgjyEOWz49z9XDlAXBJpC7Wy-vQTSvUGWGh5u8KibG44dBiigrgjDxGjU0150Q0848azk48N09C02IR0go4SaR70r8owyg9pU0V23hwiA0LQczA48S0f-x-27o05NG0fkw",
      __comet_req: "7",
      lsd: "AVqbxe3J_YA",
      jazoest: "2957",
      __spin_r: "1008824440",
      __spin_b: "trunk",
      __spin_t: "1695523385",
      fb_api_caller_class: "RelayModern",
      fb_api_req_friendly_name: "PolarisPostActionLoadPostQueryQuery",
      variables: JSON.stringify({
        shortcode: shortcode,
        fetch_comment_count: "null",
        fetch_related_profile_media_count: "null",
        parent_comment_count: "null",
        child_comment_count: "null",
        fetch_like_count: "null",
        fetch_tagged_user_count: "null",
        fetch_preview_comment_count: "null",
        has_threaded_comments: "false",
        hoisted_comment_id: "null",
        hoisted_reply_id: "null",
      }),
      server_timestamps: "true",
      doc_id: "10015901848480474",
    };
    const encoded = new URLSearchParams(requestData).toString();
    return encoded;
  }

  private async makeHttpRequest({
    ...args
  }: AxiosRequestConfig): Promise<AxiosResponse | null> {
    try {
      const response: AxiosResponse = await axios(args);
      return response;
    } catch (error: any) {
      return null;
    }
  }

  private getIGVideoFileName() {
    const timeStamp = Math.floor(Date.now() / 1000).toString();
    return `ig-downloader-${timeStamp}.mp4`;
  }

  private formatGraphqlJson = (postJson: GraphQLResponse) => {
    const data = postJson.data.xdt_shortcode_media;

    if (!data) {
      throw new Error("This post does not exist");
    }

    if (!data.is_video) {
      throw new Error("This post is not a video");
    }

    const filename = this.getIGVideoFileName();
    const { width, height } = data.dimensions;
    const videoUrl = data.video_url;

    const videoJson: VideoInfo = {
      filename: filename,
      width: width.toString(),
      height: height.toString(),
      videoUrl: videoUrl,
    };

    return videoJson;
  };

  async fetchUsingGraphQL(postId: string, timeout: number = 0) {
    const API_URL = "https://www.instagram.com/api/graphql";

    const headers = HEADERS_FOR_GRAPHQL;

    const encodedData = this.encodePostRequestData(postId);

    let response;
    try {
      response = await this.makeHttpRequest({
        url: API_URL,
        method: "POST",
        headers,
        data: encodedData,
        timeout,
      });
    } catch (e: any) {
      console.log(e.message);
    }

    const contentType = (response as AxiosResponse).headers["content-type"];

    if (contentType !== "text/javascript; charset=utf-8") return null;

    const responseJson: GraphQLResponse = (response as AxiosResponse).data;
    if (!responseJson.data) return null;

    const formattedJson = this.formatGraphqlJson(responseJson);
    return formattedJson;
  }
}

export default class DownloaderService implements IDownloaderService {
  async fetchFromPage(
    postId: string,
    timeout?: number
  ): Promise<VideoInfo | null> {
    const fetcherFromPage: FetcherFromPage = new FetcherFromPage();

    let videoInfo: VideoInfo | null = await fetcherFromPage.fetchFromPage(
      postId,
      timeout
    );

    return videoInfo;
  }
  async fetchFromGraphQL(
    postId: string,
    timeout?: number
  ): Promise<VideoInfo | null> {
    const fetcherFromGraphQL: FetcherFromGraphQL = new FetcherFromGraphQL();

    let videoInfo: VideoInfo | null =
      await fetcherFromGraphQL.fetchUsingGraphQL(postId, timeout);

    return videoInfo;
  }
}
