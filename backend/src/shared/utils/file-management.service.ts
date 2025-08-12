import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import { join } from 'path';

@Injectable()
export class FileManagementService {
    // Lösche eine Datei
    async deleteFile(filePath: string): Promise<boolean> {
        try {
            const fullPath = join(__dirname, '../../../public', filePath);
            console.log(`Trying to delete file at: ${fullPath}`);

            // Prüfen, ob die Datei existiert
            const exists = await fs.pathExists(fullPath);
            if (!exists) {
                console.error(`File does not exist: ${fullPath}`);
                return false;
            }

            // Datei löschen
            await fs.remove(fullPath);
            console.log(`Successfully deleted file: ${fullPath}`);
            return true;
        } catch (error) {
            console.error(`Failed to delete file: ${error.message}`);
            return false;
        }
    }
}