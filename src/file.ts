import * as fs from 'fs/promises';

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

    public async rewriteFile(path : string, content : string) : Promise<string> {
        try {
            await fs.writeFile(path, content, 'utf-8');
            return content;
        } catch(error) {
            console.error('Error while rewriting file:', error);
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

    public async ensureDirectoryExists(dirPath: string): Promise<void> {
        try {
            await fs.access(dirPath);
        } catch {
            await fs.mkdir(dirPath, { recursive: true });
        }
    }
}