export function studioRequirements(values = {}) {
  const projectId = values.SANITY_STUDIO_PROJECT_ID;
  const dataset = values.SANITY_STUDIO_DATASET;
  const errors = [];
  if (!projectId || !/^[a-z0-9]+$/.test(projectId) || /placeholder|yourproject/i.test(projectId)) errors.push('Set SANITY_STUDIO_PROJECT_ID to the real project ID');
  if (!dataset || !/^[a-z0-9][a-z0-9_-]{0,63}$/.test(dataset) || /placeholder|yourdataset/i.test(dataset)) errors.push('Set SANITY_STUDIO_DATASET to a private staging dataset');
  return {projectId, dataset, errors};
}
