"use server";

import IDownloaderService from "../interfaces/IDownloaderService";

export default async function serviceExporter(
  service: any
): Promise<IDownloaderService> {
  return new service();
}
