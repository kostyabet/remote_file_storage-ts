import * as fs from 'fs/promises';

export class FileRead {
    public async readFile(path : string) : Promise<string> {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return data;
          } catch (error) {
            console.error('Ошибка при чтении файла:', error);
            throw error;
          }
    }

    public async isFileExist(path : any) : Promise<boolean> {
        if (!path) return false;
        try {
            await fs.access(path);
            return true;
        } catch {
            return false;
        }
    }
}