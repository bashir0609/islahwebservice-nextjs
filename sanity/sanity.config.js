import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {schemaTypes} from './schema.mjs';
import {foundationActions} from './policy.mjs';
import {studioRequirements} from './config.mjs';

// Only Studio reads these public identifiers. The offline exporter never reads env.
const config = studioRequirements({
  SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
  SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
});
if (config.errors.length) throw new Error(`Studio configuration required: ${config.errors.join('; ')}. See docs/migration/content-import.md. No credentials or fallback production project are supplied.`);

export default defineConfig({
  name: 'content-foundation', title: 'Islah Content Review — publishing disabled',
  projectId: config.projectId, dataset: config.dataset,
  plugins: [structureTool()], schema: {types: schemaTypes},
  document: {actions: foundationActions},
});
