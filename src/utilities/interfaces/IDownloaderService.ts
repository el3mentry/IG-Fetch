export default interface IDownloaderService {
  fetchFromPage(postId: string, timeout?: number): Promise<any>;
  fetchFromGraphQL(postId: string, timeout?: number): Promise<any>;
}
