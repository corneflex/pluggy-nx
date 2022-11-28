import { ExecutorContext } from '@nrwl/devkit';
import { PackExecutorSchema } from './schema';
import {join, basename} from 'path';
import {execute} from "@pluggy/core";

export default async function runExecutor(
  options: PackExecutorSchema,
  context: ExecutorContext
) {

  console.log(`🚧 Packing ${context.projectName}...`);
  const projectOutputPath = context.workspace.projects[context.projectName].targets.build.options.outputPath;
  const pluginDir = join(context.root, projectOutputPath,'..');

  const pluginName = basename(projectOutputPath);
  const archive = join(pluginDir, `${pluginName}.zip`);

  await execute(`rm -rf ${archive} && cd ${pluginDir}  && zip -r -j ${archive} ${pluginName}/* && cd -`);

  return {
    success: true
  };
}
