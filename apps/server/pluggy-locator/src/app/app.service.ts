import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import { Multer } from 'multer';
import {join, basename} from "path";
import { readdir, stat, existsSync } from 'fs-extra';
import {execute} from "@corneflex/pluggy-core";
import {mkdirSync} from "fs";

@Injectable()
export class AppService {

  async  getDirectories(path): Promise<string[]> {
    let dirs = [];
    if(existsSync(path)) {
      const filesAndDirectories = await readdir(path);

      const directories = [];
      await Promise.all(
        filesAndDirectories.map(name => {
          return stat(join(path, name))
            .then(stat => {
              if (stat.isDirectory()) directories.push(name)
            })
        })
      );
      dirs = directories;
    }
    return dirs;
}

  async getPluginsList(): Promise<string[]> {
    return (await this.getDirectories(join(__dirname, 'plugins')));
  }

  async UploadedFile(file: Express.Multer.File) {

    const pluginName  = basename(file.originalname, '.zip');
    const pluginsDir = join(__dirname, 'plugins');
    const pluginDir = join(pluginsDir, `${pluginName}`);

    if(!existsSync(pluginsDir)) {
      mkdirSync(pluginsDir);
    }
    await execute(`cd ${join(__dirname, 'plugins')} && unzip -o ${pluginName}.zip -d ${pluginDir}`);
  }
}
