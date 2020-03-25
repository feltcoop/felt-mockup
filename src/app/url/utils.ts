// TODO typescript

// TODO do this for real:
// `import {kebabCase}from 'lodash-es';`
export const slugify = (s: string): string => s.trim().replace(/\s/g, '-');
