import { ExecutorContext, runExecutor as run} from '@nrwl/devkit';
import { PublishExecutorSchema } from './schema';
import {execute} from "@pluggy/core";
import {basename, join} from 'path';

export const runExec = async (projectName:string, target:string, context: ExecutorContext) => {
  console.log(`✨ ${target} ${projectName}...`);
  const result = await run({project:projectName, target: target}, {watch:false, progress:false}, context);
  for await (const res of result) {
    if (!res.success) throw new Error(`Failed to run ${projectName} ${target}`);
  }
  return {
    success: true
  };
};

export default async function runExecutor(
  options: PublishExecutorSchema,
  context: ExecutorContext
) {
  const projectOutputPath = context.workspace.projects[context.projectName].targets.build.options.outputPath;
  const pluginDir = join(context.root, projectOutputPath,'..');
  const pluginName = basename(projectOutputPath);
  const archive = join(pluginDir, `${pluginName}.zip`);

  await runExec(context.projectName, 'build', context);
  await runExec(context.projectName, 'pack', context);
  console.log(`✨ publish ${context.projectName}...`);
  await execute(`curl --fail --location --request POST '${options.url}/upload' \
  --form 'file=@${archive}'`);
  return {
    success: true
  };
}
