import { describe, it, expect } from "vitest";
import { toMigrationBlueprint } from "../../utils/convertBlueprint";

describe("toMigrationBlueprint", () => {
    it("should throw an error if input is not an array", () => {
        const json = `{}`;
        expect(() => toMigrationBlueprint(json)).toThrowError(
            "Hijrah expecting an array of migration blueprint got object instead"
        );
    });

    it("should return an array if input is a valid array", () => {
        const json = `[]`;
        const result = toMigrationBlueprint(json);
        expect(result).toEqual([]);
    });

    it("should throw an error if input is an invalid JSON string", () => {
        const json = `{ invalid json }`;
        expect(() => toMigrationBlueprint(json)).toThrowError();
    });

    it("should throw an error if input has invalid database action", () => {
        const json = `[{"databaseName": "valid_name", "action": "invalid_action"}]`;
        expect(() => toMigrationBlueprint(json)).toThrowError(
            "Invalid database action: invalid_action at index 0"
        );
    });

    it("should throw an error if input has invalid database name", () => {
        const json = `[{"databaseName": "invalid name", "action": "CREATE_TABLE"}]`;
        expect(() => toMigrationBlueprint(json)).toThrowError(
            "Invalid database name: invalid name at index 0"
        );
    });

    it("should throw an error if input has invalid column name", () => {
        const json = `[{"databaseName": "valid_name", "action": "CREATE_TABLE", "column": [{"fieldName": "invalid name", "action": "ADD_COLUMN", "size": 10}]}]`;
        expect(() => toMigrationBlueprint(json)).toThrowError(
            "Invalid column name: invalid name at index 0 column 0"
        );
    });

    it("should throw an error if input has invalid column action", () => {
        const json = `[{"databaseName": "valid_name", "action": "CREATE_TABLE", "column": [{"fieldName": "valid_name", "action": "invalid_action", "size": 10}]}]`;
        expect(() => toMigrationBlueprint(json)).toThrowError(
            "Invalid column action: invalid_action at index 0 column 0"
        );
    });

    it("should throw an error if input has invalid column size", () => {
        const json = `[{"databaseName": "valid_name", "action": "CREATE_TABLE", "column": [{"fieldName": "valid_name", "action": "ADD_COLUMN"}]}]`;
        expect(() => toMigrationBlueprint(json)).toThrowError(
            "Invalid column size: undefined at index 0 column 0"
        );
    });

    it("should throw an error if input has invalid column data type", () => {
        const json = `[{"databaseName": "valid_name", "action": "CREATE_TABLE", "column": [{"fieldName": "valid_name", "action": "ADD_COLUMN", "size": 10, "dataType": "invalid_type"}]}]`;
        expect(() => toMigrationBlueprint(json)).toThrowError(
            "Invalid column data type: invalid_type at index 0 column 0"
        );
    });
});