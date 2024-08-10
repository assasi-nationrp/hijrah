import {describe, it, expect, vi, afterEach, beforeEach} from 'vitest';
import projectInitializer from "../../utils/initializer.ts";
import {file} from 'bun'
import { existsSync, statSync, readdirSync, readFileSync, rmSync } from 'fs';
import { join } from 'path';
import data from "../../data/initialBlueprint.json";
const fileExists = async (filePath: string): Promise<boolean> => {
    try {
       return existsSync(filePath)
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
};

const directoryExists = (dirPath: string): boolean => {
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

const readJsonFile = async (filePath: string): Promise<any> => {
    try {
        const fileContent = await file(filePath).text();
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading JSON file: ${error.message}`);
        throw error;
    }
};

const countFilesInDirectory = (dirPath: string) => {
    try {
        const elements = readdirSync(dirPath);
        return elements.length
    } catch (error) {
        console.error('Error reading directory:', error);
    }
}

const readJsonFileText = (dirPath: string) => {
    try {
        const elements = readdirSync(dirPath);

        if (elements.length > 0) {
            const firstItem = elements[0];
            const firstItemPath = join(dirPath, firstItem);

            const jsonString = readFileSync(firstItemPath, 'utf8');
            console.log('JSON string from the first item:', jsonString);

            // If you want to parse the JSON string into an object:
            return JSON.parse(jsonString);
        } else {
            console.log('The directory is empty.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

describe('projectInitializer', () => {
    afterEach(() => {
        vi.clearAllMocks();
        try {
            rmSync('../../temp/hijrah', { recursive: true, force: true });
            console.log('Directory and its contents have been removed.');
        } catch (error) {
            console.error('Error removing directory:', error);
        }
    });

    it('should create necessary directories and files', async () => {
        const configFile = JSON.stringify({
            dbName: 'testDB',
            dbUser: 'testUser',
            dbPassword: 'testPassword',
            dbHost: 'localhost',
            dbPort: '5432',
        });

        // Mocking prompt responses
        global.prompt = vi.fn()
            .mockReturnValueOnce('testDB')
            .mockReturnValueOnce('testUser')
            .mockReturnValueOnce('testPassword')
            .mockReturnValueOnce('localhost')
            .mockReturnValueOnce('5432');

        await projectInitializer('temp');
        const isConfigExist = await fileExists('temp/hijrah/config.json');
        const isHijrahExist =  directoryExists('temp/hijrah');
        const isMigrationsExist =  directoryExists('temp/hijrah/migrations');
        const isInitialBlueprintExist =  countFilesInDirectory('temp/hijrah/migrations/');

        const initialBlueprintData = await readJsonFileText('temp/hijrah/migrations/');

        expect(isHijrahExist).toBe(true);
        expect(isConfigExist).toBe(true);
        expect(isMigrationsExist).toBe(true);
        expect(isInitialBlueprintExist).toBe(1);

        expect(initialBlueprintData).toEqual(data);
    });

});