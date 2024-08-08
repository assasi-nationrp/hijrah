
export enum DatabaseActionEnum {
    CREATE = 'CREATE_TABLE',
    DROP_TABLE = 'DROP_TABLE',
    ADD_INDEX = 'ADD_INDEX',
    DROP_INDEX = 'DROP_INDEX'
}

export enum ColumnActionEnum {
    ADD_COLUMN = 'ADD_COLUMN',
    DROP_COLUMN = 'DROP_COLUMN',
    MODIFY_COLUMN = 'MODIFY_COLUMN',
}

export enum MySQLDatabaseDataType {
    CHAR = 'CHAR',
    VARCHAR = 'VARCHAR',
    BINARY = 'BINARY',
    VARBINARY = 'VARBINARY',
    TINYBLOB = 'TINYBLOB',
    BLOB = 'BLOB',
    MEDIUMBLOB = 'MEDIUMBLOB',
    LONGBLOB = 'LONGBLOB',
    TINYTEXT = 'TINYTEXT',
    TEXT = 'TEXT',
    MEDIUMTEXT = 'MEDIUMTEXT',
    LONGTEXT = 'LONGTEXT',
    ENUM = 'ENUM',
    SET = 'SET',
    BIT = 'BIT',
    TINYINT = 'TINYINT',
    BOOL = 'BOOL',
    BOOLEAN = 'BOOLEAN',
    SMALLINT = 'SMALLINT',
    MEDIUMINT = 'MEDIUMINT',
    INT = 'INT',
    INTEGER = 'INTEGER',
    BIGINT = 'BIGINT',
    FLOAT = 'FLOAT',
    DOUBLE = 'DOUBLE',
    DECIMAL = 'DECIMAL',
    DATE = 'DATE',
    DATETIME = 'DATETIME',
    TIMESTAMP = 'TIMESTAMP',
    TIME = 'TIME',
    YEAR = 'YEAR'
}
export interface MigrationBlueprint {
    readonly databaseName: string;
    readonly action:       DatabaseActionEnum;
    readonly column?:      Column[];
    readonly indexName?:   string;
    readonly isUnique?:    boolean;
    readonly indexOption?: null;
}

export interface Column {
    readonly fieldName:     string;
    readonly action:        ColumnActionEnum;
    readonly size:         number;
    readonly dataType?:     string;
    readonly constraint?:   string;
    readonly reference?:    string;
    readonly foreignKey?:   string;
    readonly default?:      null;
    readonly newFieldName?: null;
    readonly newDataType?:  string;
}