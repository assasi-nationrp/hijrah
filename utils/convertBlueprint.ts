import type {Column, MigrationBlueprint} from "../types/general.d.ts";
import {ColumnActionEnum, DatabaseActionEnum, MySQLDatabaseDataType} from "../types/general.d.ts";

const isValidDataType = (type: string): type is MySQLDatabaseDataType => {
    return Object.values(MySQLDatabaseDataType).includes(type as MySQLDatabaseDataType);
}

const isValidDatabaseAction = (action: string): action is DatabaseActionEnum => {
    return Object.values(DatabaseActionEnum).includes(action as DatabaseActionEnum);
};

const isValidColumnAction = (action: string): action is ColumnActionEnum => {
    return Object.values(ColumnActionEnum).includes(action as ColumnActionEnum);
};

const isValidName = (name: string): boolean => {
    const regex = /^[a-zA-Z_]+$/;
    return regex.test(name);
};

export const toMigrationBlueprint = (json: string): MigrationBlueprint[] => {
    const blueprint = JSON.parse(json);
    if (!(blueprint instanceof Array)) {
        throw new Error('Hijrah expecting an array of migration blueprint got ' + typeof blueprint + ' instead');
    }

    blueprint.forEach((item: MigrationBlueprint, index) => {
        if (!('action' in item)){
            throw new Error(`Invalid database action: undefined at index ${index}`);
        }
        if (!isValidDatabaseAction(item.action)) {
            throw new Error(`Invalid database action: ${item.action} at index ${index}`);
        }
        if (!isValidName(item.databaseName)) {
            throw new Error(`Invalid database name: ${item.databaseName} at index ${index}`);
        }
        if ('column' in item) {
            item.column.forEach((column: Column, index2) => {
                if (!isValidName(column.fieldName)) {
                    throw new Error(`Invalid column name: ${column.fieldName} at index ${index} column ${index2}`);
                }
                if (!isValidColumnAction(column.action)) {
                    throw new Error(`Invalid column action: ${column.action} at index ${index} column ${index2}`);
                }
                if (!column.size) {
                    throw new Error(`Invalid column size: ${column.size} at index ${index} column ${index2}`);
                }
                if ('dataType' in column && !isValidDataType(column.dataType)) {
                    throw new Error(`Invalid column data type: ${column.dataType} at index ${index} column ${index2}`);
                }
            });
        }
    });

    return blueprint;
};


