import type { Config } from '@svgr/core/dist';


export type SvgrOptions = Config
export interface SvgrPluginOptions {
  /**
   * Pattern to be used in order to transform or not the file.
   *  - Micromatch (npm package) string pattern
   */
  importStringPattern: string | ReadonlyArray<string>,

  /**
   * SVGR package options
   */
  svgrOptions: SvgrOptions,

  /**
   * Generates component as a typescript component and
   * transform it with typescript loader by esbuild
   */
  typescript: boolean,

  /**
   * This only work if the file is exported by vite
   * due to /public or configured files pattern to be exported
   */
  keepEmittedAssets: boolean,
}

export { svgrComponent } from './plugin';
