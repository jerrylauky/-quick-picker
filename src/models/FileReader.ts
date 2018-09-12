import fs from "fs";

export default class FileReader {
  reader: object;
  options: object;

  constructor (options: object) {
    this.reader = fs;
    this.options = options;
  }

  public write (content: string): void {
    let { outputFile } = this.options;
    let writeOptions = { flat: "wx" };
    let writeStream = this.reader.createWriteStream(outputFile, writeOptions);
    writeStream.on("open", () => {
      writeStream.write(content);
      writeStream.end();
    });
    writeStream.on("finish", () => console.log("done writing"));
    writeStream.on("error", (error) => console.log("error writing", error));
    // this.reader.writeFile(outputFile, content, writeOptions, function (err) {
    //   if (err) throw new Error(err);
    //   console.log("file is saved");
    // });
  }
}