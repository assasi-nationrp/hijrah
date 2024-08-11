import {v7 as uuidv7} from 'uuid'


const createNewMigration = async (name: string) => {
    const fileName = `${uuidv7()}_${name}.json`;

    await Bun.write(`migrations/${fileName}`, JSON.stringify([]))
}

export default createNewMigration