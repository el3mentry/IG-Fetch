import IFormValidator from "../interfaces/IFormValidator";
import IPostURL from "../interfaces/IPostURL";

export default class FormValidator implements IFormValidator {
  isValidFormInput(postUrl: IPostURL): string {
    if (!postUrl) {
      return "Instagram URL was not provided";
    }

    if (!postUrl.url.includes("instagram.com/")) {
      return "Invalid URL does not contain Instagram domain";
    }

    if (!postUrl.url.startsWith("https://")) {
      return 'Invalid URL it should start with "https://www.instagram.com..."';
    }

    const postRegex =
      /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;

    const reelRegex =
      /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

    if (!postRegex.test(postUrl.url) && !reelRegex.test(postUrl.url)) {
      return "URL does not match Instagram post or reel";
    }

    return "";
  }
}
