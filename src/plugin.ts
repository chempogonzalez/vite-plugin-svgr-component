import fs from 'fs';
import svgr from '@svgr/core';
import m from 'micromatch';
import { transform } from 'esbuild';
import type { Loader } from 'esbuild';
import type { PluginOption, TransformResult } from 'vite';
import type { SvgrPluginOptions, SvgrOpts } from './index';


/** Default optimized configuration */
const DEFAULT_SVGR_OPTIONS: SvgrOpts = {
  memo: true,
  typescript: true,
  svgo: true,
  titleProp: true,
};


/**
 * ===========================  MAIN PLUGIN FUNCTION  =============================================
 */
export function svgrComponent(
  {
    importStringPattern = '*.svg*',
    svgrOptions = DEFAULT_SVGR_OPTIONS,
    typescript = true,
    keepEmittedAssets = false,
  }: SvgrPluginOptions
): PluginOption {
  const transformedSvgsCache = new Map<string, TransformResult>();

  const transformLoader = typescript ? 'tsx' : 'jsx' as Loader;

  return {
    // Ensure process the svg before vite auto process it as a data URI
    enforce: 'pre',
    name: 'vite:svgr-component',

    async transform(_, svgImportString) {
      /** -------------------- Guards ------------------------------------------------- */
      const isValidSvg = svgImportString.includes('.svg')
                        && m.isMatch(svgImportString, importStringPattern);

      if (!isValidSvg) return null;

      const transformedSvg = transformedSvgsCache.get(svgImportString);
      const isAlreadyTransformed = typeof transformedSvg !== 'undefined';

      if (isAlreadyTransformed) return transformedSvg;
      /** ------------------ [end] Guards -------------------------------------------- */


      const svgrComponentOptions = {
        ...DEFAULT_SVGR_OPTIONS,
        ...(svgrOptions || {}),
      };

      const code = await compileSvg({ svgImportString, svgrComponentOptions, transformLoader });


      transformedSvgsCache.set(svgImportString, code);
      return code;
    },


    generateBundle(_config, bundle) {
      if (keepEmittedAssets) {
        return;
      }

      // Discard transformed SVG assets from bundle so they are not emitted
      for (const [key, bundleEntry] of Object.entries(bundle)) {
        const { type, name } = bundleEntry;
        const isSvgTransformed = type === 'asset'
                                  && name
                                  && name.endsWith('.svg')
                                  && transformedSvgsCache.has(name);
        if (isSvgTransformed) {
          delete bundle[key];
        }
      }
    },
  };
}
/** ============================================================================================ */





interface CompileSvg {
  svgImportString: string,
  svgrComponentOptions: SvgrOpts,
  transformLoader: Loader,
}

/**
 * @description Compiles the SVG to a React component
 * @param {object}
 *  - svgImportString:      SVG file import string to be used to read the file
 *  - svgrComponentOptions: SVGR lib options to be passed to the lib compiler
 *  - transformLoader:      Loader to be used in esbuild transform method
 *
 * @returns Esbuild transformation result object
 */
async function compileSvg({
  svgImportString,
  svgrComponentOptions,
  transformLoader,
}: CompileSvg) {
  const svgFileContent = await fs.promises.readFile(svgImportString, 'utf8');

  const componentCode = await svgr(svgFileContent, svgrComponentOptions);
  const { code } = await transform(componentCode, { loader: transformLoader });

  return { code, map: null } as TransformResult;
}
