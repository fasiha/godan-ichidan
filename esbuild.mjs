import commonjsPlugin from '@chialab/esbuild-plugin-commonjs';
import {build} from 'esbuild';

// IIFE (useful for the old school <script> tags in browsers)
await build({
  entryPoints: ['index.js'],
  outfile: 'dist/godanIchidan.min.js',
  bundle: true,
  sourcemap: true,
  minify: true,
  format: 'iife',
  globalName: 'godanIchidan',
});

// ESM module (like `import * as lib from '..'` in Node and browsers)
await build({
  plugins: [commonjsPlugin()],
  entryPoints: ['index.js'],
  outfile: 'dist/godanIchidan.min.mjs',
  bundle: true,
  sourcemap: true,
  minify: true,
  format: 'esm',
  target: ['es2021'],
});