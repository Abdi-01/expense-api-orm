import multer from "multer";
import path from "path";
import { Request } from "express";

export const uploader = (dirName?: string | null, prefixName?: string) => {
  // define main directory path/location
  const mainDir = path.join(__dirname, "../../public");
  console.log("LOG FROM FILE UPLOADER.TS FILE");
  // configure storage multer
  const configFileStore = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string) => void
    ) => {
      console.log("Destination file :", mainDir);
      const fileDestination = dirName ? mainDir + dirName : mainDir;
      callback(null, fileDestination);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, destination: string) => void
    ) => {
      console.log("FILE INFO :", file);
      const existName = file.originalname.split(".");
      console.log(existName);
      //   GET EXTENTION/FORMAT FILE
      const extention = existName[existName.length - 1];
      console.log(extention);

      //   define rename filename
      callback(null, `${prefixName || "MEDIA"}${Date.now()}.${extention}`);
    },
  });

  return multer({ storage: configFileStore });
};
