import IDownloaderService from "../interfaces/IDownloaderService";
import { HEADERS_FOR_GENERIC_PAGE, HEADERS_FOR_GRAPHQL } from "../constants";
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { load, CheerioAPI } from "cheerio";
import { VideoInfo } from "../types";

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
  }: AxiosRequestConfig): Promise<AxiosResponse> {
    try {
      const response: AxiosResponse = await axios(args);
      return response;
    } catch (error: any) {
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        console.error("Axios Error:", axiosError.message);
        throw new Error(axiosError.message);
      } else if (axiosError.request) {
        console.error("Request Error:", axiosError.request);
        throw new Error("Timeout exceeded.");
      } else {
        console.error("Server Error:", axiosError.message);
        throw new Error("Something went wrong, please try again.");
      }
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

    if (response.statusText === "error") {
      return null;
    }

    if (!response.data) return null;

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
  fetchUsingGraphQL() {}
}

export default class DownloaderService implements IDownloaderService {
  async fetchFromPage(postURL: string, timeout?: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async fetchFromGraphQL(postURL: string, timeout?: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
