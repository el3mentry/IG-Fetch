"use server";

import DownloaderService from "../../../lib/services/DownloaderService";
import PostDownloader from "../../../utils/classes/PostDownloader";
import IDownloaderService from "../../../utils/interfaces/IDownloaderService";
import IPostDownloader from "../../../utils/interfaces/IPostDownloader";
import { DownloadFileInfo } from "../../../utils/types";
import PostURL from "../../../utils/classes/PostURL";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const downloaderService: IDownloaderService = new DownloaderService();
    const postDownloader: IPostDownloader = new PostDownloader();

    const { searchParams } = new URL(req.url);
    const postUrl: string | null = searchParams.get("url");

    if (postUrl == null) {
      throw new Error("received null url");
    }
    console.log(postUrl);

    const fileInfo: DownloadFileInfo = await postDownloader.downloadPostVideo(
      new PostURL(postUrl),
      downloaderService
    );

    return NextResponse.json(fileInfo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to scrape data" });
  }
}
