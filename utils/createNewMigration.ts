import {v7 as uuidv7} from 'uuid'
import cliSelect from "cli-select";
import {DatabaseActionEnum} from "../types/general";



const interactiveMigrationCreation = () => {
    let continuePrompt = true
    const migrationData = []
    while (continuePrompt) {
        const migrationStep = {}
        migrationStep['tableName'] = prompt('Enter table name: ')
        console.log('Which action you want to use ?: ');
        migrationStep['action'] = cliSelect({
            values: [DatabaseActionEnum.CREATE, DatabaseActionEnum.DROP_TABLE, DatabaseActionEnum.ADD_INDEX, DatabaseActionEnum.DROP_INDEX],
            defaultValue: 0,
            selected: '[x]',
            unselected: '[ ]',
            valueRenderer: (value, selected) => {
                return selected ? value : value;
            },
        })
            .then(res => res.value)
    }

}

const createNewMigration = async (name: string) => {
    const fileName = `${uuidv7()}_${name}.json`;

    console.log('Selecting how you want to make data fro migration: ');
    cliSelect({
        values: ['interactive', 'manual'],
        defaultValue: 0,
        selected: '[x]',
        unselected: '[ ]',
        valueRenderer: (value, selected) => {
            return selected ? value : value;
        },

    })
        .then(res => {
            switch (res.value) {
                case 'interactive':
                    interactiveMigrationCreation();
                    break;
                case 'manual':
                    Bun.write(`migrations/${fileName}`, JSON.stringify({}, null, 2))
                        .then(() => console.log(`Created new blueprint file: ${fileName}`))
                    break;
            }
        })

}

export default createNewMigration