#! /usr/bin/env bun

import {version} from './package.json';
import {Command} from 'commander';
import projectInitializer from "./utils/initializer.ts";
import createNewMigration from "./utils/createNewMigration.ts";


const program = new Command();

program
    .name('hijrah')
    .description('A agnostic database migration tool')
    .version(version)


program
    .command('init')
    .argument('<path>', 'Path to initialize hijrah workdir directory')
    .description('Initialize a new hijrah workdir')
    .action(projectInitializer);

program
    .command('create')
    .argument('<name>', 'Name of the migration')
    .description('Create a new migration')
    .action(createNewMigration);


program.parse();



