import IDownloaderService from "../interfaces/IDownloaderService";

export default class DownloaderService implements IDownloaderService {
  async fetchFromPage(postURL: string, timeout?: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async fetchFromGraphQL(postURL: string, timeout?: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
