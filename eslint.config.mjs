import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  { ignores: ['node_modules/**', '.astro/**', '.vercel/**', 'dist/**', 'artifacts/**', 'cms/node_modules/**', 'cms/dist/**'] },
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
];
