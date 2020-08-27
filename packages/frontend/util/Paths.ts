import { resolve } from 'path';

export const BaseDir = (...paths: string[]) => resolve(__dirname, '..', ...paths);
export const SrcDir = (...paths: string[]) => BaseDir('src', ...paths);
export const DistDir = (...paths: string[]) => BaseDir('dist', ...paths);
