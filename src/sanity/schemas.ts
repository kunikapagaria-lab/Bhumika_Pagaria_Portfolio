export const projectSchema = {
  name: 'project',
  title: 'Projects & Highlights',
  type: 'document',
  fields: [
    { name: 'title', title: 'Project Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle / Category Tag', type: 'string' },
    { 
      name: 'category', 
      title: 'Service Category', 
      type: 'string',
      options: {
        list: [
          { title: '3D Animation', value: '3d-animation' },
          { title: '3D Modelling', value: '3d-modelling' },
          { title: '2D Animation', value: '2d-animation' },
          { title: 'Illustrations', value: 'illustrations' },
          { title: 'Commercial Work', value: 'commercial-work' },
          { title: 'Odd Bits', value: 'odd-bits' },
        ]
      }
    },
    { name: 'description', title: 'Detailed Description', type: 'text' },
    { name: 'mainImage', title: 'Preview Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'videoUrl', title: 'Vimeo Video URL', type: 'url', description: 'e.g. https://player.vimeo.com/video/641042738' },
    { name: 'tools', title: 'Software & Tools Used', type: 'array', of: [{ type: 'string' }] },
    { name: 'breakdown', title: 'Breakdown Points', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'gallery',
      title: 'Photo Gallery',
      description: 'Add as many extra photos of this project as you want — shown as a gallery on the project page.',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [{ name: 'alt', title: 'Alt Text (for accessibility)', type: 'string' }],
      }],
    },
    {
      name: 'fullReport',
      title: 'Full Report',
      description: 'The full write-up for this project — write headings, paragraphs, bullet points, and drop photos in wherever you want, like a document.',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt Text (for accessibility)', type: 'string' }],
        },
      ],
    },
    { name: 'isHighlight', title: 'Show in Hero Carousel Highlights?', type: 'boolean' },
    { name: 'link', title: 'External Link / Case Study URL', type: 'url' },
    { name: 'order', title: 'Display Order (within its service)', description: 'Lower numbers show first. Use this to control the order projects appear under their matching service.', type: 'number' }
  ]
};

export const serviceSchema = {
  name: 'service',
  title: 'Services (Outside Cards)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Service Title', type: 'string' },
    { name: 'description', title: 'Short Overview Description', type: 'text' },
    { name: 'tags', title: 'Service Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'bgImage', title: 'Card Background Image', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Display Order', type: 'number' },
    {
      name: 'categoryTag',
      title: 'Matching Project Category',
      description: 'Pick the same category you use when tagging Projects, so this service page automatically shows the right project examples.',
      type: 'string',
      options: {
        list: [
          { title: '3D Animation', value: '3d-animation' },
          { title: '3D Modelling', value: '3d-modelling' },
          { title: '2D Animation', value: '2d-animation' },
          { title: 'Illustrations', value: 'illustrations' },
          { title: 'Commercial Work', value: 'commercial-work' },
          { title: 'Odd Bits', value: 'odd-bits' },
        ]
      }
    }
  ]
};

export const skillSchema = {
  name: 'skill',
  title: 'Skills & Toolkit',
  type: 'document',
  fields: [
    { name: 'name', title: 'Skill Name', type: 'string' },
    {
      name: 'type',
      title: 'Skill Type',
      type: 'string',
      options: {
        list: [
          { title: 'Software & Tool', value: 'tool' },
          { title: 'Soft Skill & Competency', value: 'soft' }
        ]
      }
    },
    { name: 'order', title: 'Display Order', description: 'Lower numbers show first.', type: 'number' }
  ]
};

export const personalInfoSchema = {
  name: 'personalInfo',
  title: 'About Me & Social Links',
  type: 'document',
  fields: [
    { name: 'name', title: 'Full Name', type: 'string' },
    { name: 'tagline', title: 'Hero Tagline', type: 'string' },
    { name: 'aboutHeading', title: 'About Me Heading', description: 'The big headline shown at the top of the About Me section — type it exactly as you want it to read, e.g. "Hi, I\'m Bhumika". Leave empty to just show your name.', type: 'string' },
    { name: 'bio', title: 'About Me Bio Paragraph', type: 'text' },
    { name: 'location', title: 'Location (e.g. London, UK)', type: 'string' },
    { name: 'education', title: 'Education & Degrees', description: 'Add one line per degree/qualification.', type: 'array', of: [{ type: 'string' }] },
    { name: 'tags', title: 'Characteristics / Tags', description: 'Short pills shown under your bio, e.g. "freelancer", "cat lover". Add as many as you like.', type: 'array', of: [{ type: 'string' }] },
    { name: 'profileImage', title: 'Profile / Bio Photo', type: 'image', options: { hotspot: true } },
    { name: 'resumeFile', title: 'Resume / CV PDF Document (Upload PDF)', type: 'file', options: { accept: '.pdf' } },
    { name: 'resumeUrl', title: 'Resume / CV PDF External Link (Optional)', type: 'url' },
    { name: 'vimeoUrl', title: 'Vimeo Channel URL', type: 'url', description: 'Leave empty to hide the Vimeo link on the site.' },
    { name: 'behanceUrl', title: 'Behance Profile URL', type: 'url', description: 'Leave empty to hide the Behance link on the site.' },
    { name: 'instagramUrl', title: 'Instagram Profile URL', type: 'url', description: 'Leave empty to hide the Instagram link on the site.' },
    { name: 'linkedinUrl', title: 'LinkedIn Profile URL', type: 'url', description: 'Leave empty to hide the LinkedIn link on the site.' },
    { name: 'youtubeUrl', title: 'YouTube Channel URL', type: 'url', description: 'Leave empty to hide the YouTube link on the site.' },
    { name: 'email', title: 'Contact Email', type: 'string' }
  ]
};

export const testimonialSchema = {
  name: 'testimonial',
  title: 'Testimonials & Sticky Notes',
  type: 'document',
  fields: [
    { name: 'author', title: 'Client / Author Name', type: 'string' },
    { name: 'company', title: 'Studio / Role', type: 'string' },
    { name: 'quote', title: 'Feedback / Sticky Note Quote', type: 'text' },
    { name: 'rating', title: 'Rating (1-5 Stars)', type: 'number', initialValue: 5 },
    { name: 'color', title: 'Sticky Note Color', type: 'string' },
    { name: 'isApproved', title: 'Approved by Bhumika? (Show on Whiteboard)', type: 'boolean', initialValue: false }
  ]
};
