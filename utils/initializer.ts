import ora from "ora";
import { mkdir } from "node:fs/promises";
import Bun from "bun"; // Ensure Bun module is imported
import {v7 as uuidv7 }  from "uuid";
import data from "../data/initialBlueprint.json" with {type: 'json'};

const createConfig = () => {
    const dbName = prompt('Enter database name: ');
    const dbUser = prompt('Enter database user: ');
    const dbPassword = prompt('Enter database password: ');
    const dbHost = prompt('Enter database host: ');
    const dbPort = prompt('Enter database port: ');

    return JSON.stringify({dbName, dbUser, dbPassword, dbHost, dbPort}, null, 2);
}

const projectInitializer = async (str: string = '.') => {
    const configFile = createConfig();
    const initialBlueprint = JSON.stringify(data, null, 2);

    const spinner = ora('Initializing hijrah project').start();
    try {
        await mkdir(`${str}/hijrah`, {recursive: true});
        await Bun.write(`${str}/hijrah/config.json`, configFile);
        await mkdir(`${str}/hijrah/migrations`);
        await Bun.write(`${str}/hijrah/migrations/${uuidv7()}_initial_blueprint.json`, initialBlueprint);
        spinner.succeed('Hijrah project initialized successfully');
    } catch (error) {
        spinner.fail('Hijrah project initialization failed');
        console.error(error);
    }
}

export default projectInitializer;