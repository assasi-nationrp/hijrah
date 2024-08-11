import {existsSync, readdirSync, readFileSync, statSync} from "fs";
import {file} from "bun";
import {join} from "path";

export const fileExists = async (filePath: string): Promise<boolean> => {
    try {
        return existsSync(filePath)
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
};

export const directoryExists = (dirPath: string): boolean => {
    try {
        const stats = statSync(dirPath);
        return stats.isDirectory()
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
};

export const readJsonFile = async (filePath: string): Promise<any> => {
    try {
        const fileContent = await file(filePath).text();
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading JSON file: ${error.message}`);
        throw error;
    }
};

export const countFilesInDirectory = (dirPath: string) => {
    try {
        const elements = readdirSync(dirPath);
        return elements.length
    } catch (error) {
        console.error('Error reading directory:', error);
    }
}

export const readJsonFileText = (dirPath: string) => {
    try {
        const elements = readdirSync(dirPath);

        if (elements.length > 0) {
            const firstItem = elements[0];
            const firstItemPath = join(dirPath, firstItem);

            const jsonString = readFileSync(firstItemPath, 'utf8');
            // If you want to parse the JSON string into an object:
            return JSON.parse(jsonString);
        } else {
            console.log('The directory is empty.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getFirstItemName = (dirPath: string): string | undefined => {
    try {
        const elements = readdirSync(dirPath);
        if (elements.length > 0) {
            return elements[0];
        } else {
            console.log('The directory is empty.');
            return undefined;
        }
    } catch (error) {
        console.error('Error reading directory:', error);
        return undefined;
    }
};