import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { projectSchema, serviceSchema, skillSchema, personalInfoSchema, testimonialSchema, doodleSubmissionSchema } from './src/sanity/schemas';

export default defineConfig({
  name: 'bhumika-portfolio-studio',
  title: 'Bhumika Portfolio CMS Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '5vq8pnxl',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool()],

  schema: {
    types: [projectSchema, serviceSchema, skillSchema, personalInfoSchema, testimonialSchema, doodleSubmissionSchema],
  },
});
