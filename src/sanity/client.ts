import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// Configure Sanity Client
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '5vq8pnxl',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper to safely extract string text from plain strings or Sanity Portable Text blocks
function extractText(val: any): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (Array.isArray(val)) {
    return val
      .map((block: any) => {
        if (typeof block === 'string') return block;
        if (block?._type === 'block' && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      })
      .filter(Boolean)
      .join('\n\n');
  }
  return '';
}

// Fetch all portfolio data from Sanity CMS with automatic fallback to PORTFOLIO_DATA
export async function fetchSanityPortfolioData() {
  try {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '5vq8pnxl';
    if (!projectId || projectId === 'your_sanity_project_id_here') {
      return PORTFOLIO_DATA;
    }
    
    const projectsQuery = `*[_type == "project"]{
      "id": _id,
      title,
      subtitle,
      category,
      description,
      tools,
      videoUrl,
      "imageUrl": mainImage.asset->url,
      breakdown,
      isHighlight,
      link
    }`;

    const servicesQuery = `*[_type == "service"] | order(order asc){
      "id": _id,
      title,
      description,
      tags,
      "bgImage": bgImage.asset->url
    }`;

    const skillsQuery = `*[_type == "skill"]{
      "id": _id,
      name,
      title,
      type
    }`;

    const personalQuery = `*[_type in ["personalInfo", "personal", "about"]][0]{
      name,
      nickname,
      tagline,
      bio,
      education,
      "profileImage": profileImage.asset->url,
      "resumeFileUrl": resumeFile.asset->url,
      resumeUrl,
      vimeoUrl,
      instagramUrl,
      linkedinUrl,
      email
    }`;

    const testimonialsQuery = `*[_type == "testimonial"]{
      "id": _id,
      quote,
      author,
      role,
      company,
      rating
    }`;

    const [projects, services, skills, personal, testimonials] = await Promise.all([
      sanityClient.fetch(projectsQuery),
      sanityClient.fetch(servicesQuery),
      sanityClient.fetch(skillsQuery),
      sanityClient.fetch(personalQuery),
      sanityClient.fetch(testimonialsQuery),
    ]);

    const rawProjects = Array.isArray(projects) && projects.length > 0 ? projects : PORTFOLIO_DATA.projects;
    const sanitizedProjects = rawProjects.map((p: any) => ({
      ...p,
      description: extractText(p.description) || p.description,
      tools: Array.isArray(p.tools) ? p.tools : ['Maya', 'Blender'],
      breakdown: Array.isArray(p.breakdown) ? p.breakdown : []
    }));

    const rawServices = Array.isArray(services) && services.length > 0 ? services : PORTFOLIO_DATA.services;
    const sanitizedServices = rawServices.map((s: any) => ({
      ...s,
      description: extractText(s.description) || s.description,
      tags: Array.isArray(s.tags) ? s.tags : []
    }));

    const bioText = extractText(personal?.bio);

    return {
      personalInfo: {
        name: personal?.name || PORTFOLIO_DATA.personalInfo.name,
        nickname: personal?.nickname || (PORTFOLIO_DATA.personalInfo as any).nickname || '',
        role: PORTFOLIO_DATA.personalInfo.role,
        tagline: personal?.tagline || (PORTFOLIO_DATA.personalInfo as any).tagline || '',
        bio: bioText || PORTFOLIO_DATA.personalInfo.bio,
        location: (PORTFOLIO_DATA.personalInfo as any).location || 'London, UK',
        education: Array.isArray(personal?.education) && personal.education.length > 0 
          ? personal.education.map((e: any) => extractText(e) || e) 
          : PORTFOLIO_DATA.personalInfo.education,
        tags: (PORTFOLIO_DATA.personalInfo as any).tags || [],
        profileImage: personal?.profileImage || (PORTFOLIO_DATA.personalInfo as any).profileImage,
        resumeUrl: personal?.resumeFileUrl || personal?.resumeUrl || (PORTFOLIO_DATA.personalInfo as any).resumeUrl || '/bhumika_pagaria_cv.pdf',
        socialLinks: {
          vimeo: personal?.vimeoUrl || PORTFOLIO_DATA.personalInfo.socialLinks.vimeo,
          instagram: personal?.instagramUrl || PORTFOLIO_DATA.personalInfo.socialLinks.instagram,
          linkedin: personal?.linkedinUrl || PORTFOLIO_DATA.personalInfo.socialLinks.linkedin,
          email: personal?.email || PORTFOLIO_DATA.personalInfo.socialLinks.email,
        }
      },
      services: sanitizedServices,
      projects: sanitizedProjects,
      skills: Array.isArray(skills) && skills.length > 0 ? skills.filter((s: any) => s.type !== 'soft') : PORTFOLIO_DATA.skills,
      softSkills: Array.isArray(skills) && skills.length > 0 ? skills.filter((s: any) => s.type === 'soft') : (PORTFOLIO_DATA as any).softSkills,
      testimonials: Array.isArray(testimonials) && testimonials.length > 0 ? testimonials : (PORTFOLIO_DATA as any).testimonials,
      faqs: PORTFOLIO_DATA.faqs || [],
    };
  } catch (error) {
    console.warn('Sanity CMS connection warning, using fallback portfolio data:', error);
    return PORTFOLIO_DATA;
  }
}
