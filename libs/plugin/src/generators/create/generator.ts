import {
  names,
  Tree,
  readProjectConfiguration,
  updateProjectConfiguration
} from '@nrwl/devkit';
import { Schema } from './schema';
import { remoteGenerator } from '@nrwl/react';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';

export function normalizeDirectory(options: Schema) {
  return options.directory
    ? `${names(options.directory).fileName}/${names(options.name).fileName}`
    : names(options.name).fileName;
}

export function normalizeProjectName(options: Schema) {
  return normalizeDirectory(options).replace(new RegExp('/', 'g'), '-');
}

export default async function (tree: Tree, schema: Schema) {

  const remoteTask = await remoteGenerator(tree, schema);

  const appName = normalizeProjectName(schema);
  const appConfig = readProjectConfiguration(tree, appName);
  appConfig.targets['pack'] = {
    executor: '@pluggy/plugin:pack'
  };
  appConfig.targets['publish'] = {
    executor: '@pluggy/plugin:publish'
  };
  updateProjectConfiguration(tree, appName, {...appConfig});

  return runTasksInSerial(remoteTask);
}
