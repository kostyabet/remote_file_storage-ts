import * as fs from 'fs/promises';
import path from 'path';

export class FileRead {
    public async readFile(path : string) : Promise<string> {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return data;
        } catch (error) {
            console.error('Error while reading file:', error);
            throw error;
        }
    }

    public async rewriteFile(path : string, content : string) {
        try {
            await this.checkWorkDirectory(path);
            await fs.writeFile(path, content, 'utf-8');
        } catch(error) {
            console.error('Error while rewriting file:', error);
            throw error;
        }    
    }

    public async copyFile(src : string, dest : string) {
        try {
            await fs.copyFile(src, dest);
        } catch (error) {
            console.error('Ошибка при копировании файла:', error);
            throw error;
        }
    }

    public async deleteFile(path : string) {
        try {
            await fs.unlink(path);
        } catch (error) {
            console.error('Error while deleting file:', error);
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

    private async checkWorkDirectory(dirPath : string) : Promise<void> {
        const dir = dirPath.split('/')
            .slice(2, -1);
        let allPath = dirPath.split('/')
            .slice(0, 2)
            .map(el => el + "/")
            .reduce((prev, current) => prev += current);
        for (const value of dir) {
            allPath += value + "/";
            await this.ensureDirectoryExists(allPath);
        }
    }

    public async ensureDirectoryExists(dirPath: string) : Promise<void> {
        try {
            await fs.access(dirPath);
        } catch {
            await fs.mkdir(dirPath, { recursive: true });
        }
    }
}