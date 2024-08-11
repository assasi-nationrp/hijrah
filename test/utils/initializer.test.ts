import {describe, it, expect, vi, afterEach, beforeEach} from 'vitest';
import projectInitializer from "../../utils/initializer.ts";
import {file} from 'bun'
import { existsSync, statSync, readdirSync, readFileSync, rmSync } from 'fs';
import { join } from 'path';
import data from "../../data/initialBlueprint.json";
import {countFilesInDirectory, directoryExists, fileExists, readJsonFileText} from "../utils.ts";




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