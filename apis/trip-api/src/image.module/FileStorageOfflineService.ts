import { IFileStorageService } from "./IFileStorageService";
import { Stream } from "stream";
import fs from "fs";
import { read, write } from "./FileAsync";
import path from "path";
import { File, IFileModel } from "./File";
const uuid = require("uuid/v5");

export class FileStorageOfflineService implements IFileStorageService {
  async save(file: Stream | Buffer, category: string, fileName: string) {
    if (file instanceof Buffer) {
      return this.saveFromBuffer(file, category, fileName);
    }
    return this.saveFromStream(file as Stream, category, fileName);
  }

  async saveFromStream(file: Stream, category: string, fileName: string) {
    var fileExtension = path.parse(fileName).ext;
    await fs.mkdir(new URL(category), { recursive: true }, err =>
      console.log(err)
    );

    const externalId = uuid();
    await write(path.join(category, externalId + fileExtension), file);

    var fileObject = new File({
      externalId: externalId,
      category: category,
      fileName: fileName
    });

    fileObject.save();

    return {
      externalId: fileObject.externalId.toString(),
      slug: path.join(category, externalId + fileExtension)
    };
  }

  async saveFromBuffer(buffer: Buffer, category: string, fileName: string) {
    var fileExtension = path.parse(fileName).ext;
    await fs.mkdir(new URL(category), { recursive: true }, err =>
      console.log(err)
    );

    const externalId = uuid();
    var stream = fs.createWriteStream(path.join(category, externalId + fileExtension));
    stream.write(buffer);
    stream.close();

    var fileObject = new File({
      externalId: externalId,
      category: category,
      fileName: fileName
    });

    fileObject.save();

    return {
      externalId: fileObject.externalId.toString(),
      slug: path.join(category, externalId + fileExtension)
    };
  }

  async getById(externalId: string) {
    var fileObject = (await File.findOne({ externalId }).exec()) as IFileModel;

    if (fileObject == null) throw "file not found";
    var fileStream = await read(
      path.join(fileObject.category.toString(), fileObject.fileName.toString())
    );
    return { file: fileStream };
  }
}
