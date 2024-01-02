export default class GenericFactory {
  getObject(c: any) {
    return new c();
  }
}
