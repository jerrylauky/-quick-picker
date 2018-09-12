export default class ScraperInfo {
  baseUrl: string;
  drawOptions: object;
  outputOptions: object;

  constructor (baseUrl: string, drawOptions: object, outputOptions: object) {
    this.baseUrl = baseUrl;;
    this.drawOptions = drawOptions;
    this.outputOptions = outputOptions;
  }

  public getTargetUrl (fields: Map): string {
    let baseUrl = this.baseUrl;
    fields.forEach((fieldValue, fieldName) => {
      baseUrl = baseUrl.replace(fieldName, fieldValue);
    });
    return baseUrl;
  }
}