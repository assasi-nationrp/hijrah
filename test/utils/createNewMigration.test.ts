import {describe, it, expect, vi, afterEach} from 'vitest';
import {spyOn} from "bun:test";
import createNewMigration from '../../utils/createNewMigration';
import {fileExists, getFirstItemName} from "../utils.ts";
import {v7 as uuidv7} from 'uuid';



describe('createNewMigration', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should create a new migration file with the correct name', async () => {
        const migrationName = 'testMigration';

        await createNewMigration(migrationName);

        const isExpectedFileExist = await getFirstItemName('migrations/');

        expect(isExpectedFileExist).not.undefined;
        expect(isExpectedFileExist?.split('_')[1]).toBe(migrationName + '.json');
    });

});