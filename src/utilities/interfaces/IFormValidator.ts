import IPostURL from "./IPostURL";

export default interface IFormValidator {
  isValidFormInput(postURL: IPostURL): string;
}
