import {v7 as uuidv7} from 'uuid'
import cliSelect from "cli-select";

const interactiveMigrationCreation = () => {
    cliSelect({
        values: ['CREATE_TABLE', 'ADD_COLUMN', 'DROP_COLUMN', 'DROP_TABLE'],
        defaultValue: 0,
        selected: '[x]',
        unselected: '[ ]',
        valueRenderer: (value, selected) => {
            return selected ? value : value;
        },
    })
        .then(res => res)

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