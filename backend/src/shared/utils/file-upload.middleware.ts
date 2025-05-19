import {Injectable} from '@nestjs/common';
import {MulterModuleOptions} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {extname, join} from 'path';
import * as fs from 'fs-extra';

@Injectable()
export class FileUploadService {
    // Multer-Konfiguration für Datei-Uploads
    static getMulterConfig(): MulterModuleOptions {
        return {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const uploadPath = join(__dirname, '../../../public/uploads');
                    // Stellen Sie sicher, dass der Upload-Ordner existiert
                    fs.ensureDirSync(uploadPath);
                    cb(null, uploadPath);
                },
                filename: (req, file, cb) => {
                    // Generiere eindeutigen Dateinamen
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
        };
    }
}