import IPostURL from "../interfaces/IPostURL";

export default class PostURL implements IPostURL {
  url: string = "";

  constructor(url: string) {
    this.url = url;
  }
}
