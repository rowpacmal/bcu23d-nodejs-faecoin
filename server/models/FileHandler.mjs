import { join as joinPath } from 'path';
import { appendFile, readFile, writeFile } from 'fs/promises';
import { existsSync, statSync } from 'fs';

export default class FileHandler {
  constructor(folder, filename) {
    this.path = joinPath(__rootdirname, folder, filename);
  }

  async append(data) {
    try {
      await appendFile(
        this.path,
        typeof data === 'string' ? data : JSON.stringify(data)
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async read() {
    try {
      if (!existsSync(this.path) || statSync(this.path).size === 0) {
        return [];
      }

      return JSON.parse(await readFile(this.path, { encoding: 'utf-8' }));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async write(data) {
    try {
      await writeFile(
        this.path,
        typeof data === 'string' ? data : JSON.stringify(data, null, 2)
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
