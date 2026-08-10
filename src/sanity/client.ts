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

    const personalQuery = `*[_type == "personalInfo"][0]{
      name,
      tagline,
      bio,
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

    return {
      personalInfo: {
        name: personal?.name || PORTFOLIO_DATA.personalInfo.name,
        role: PORTFOLIO_DATA.personalInfo.role,
        tagline: personal?.tagline || (PORTFOLIO_DATA.personalInfo as any).tagline || '',
        bio: personal?.bio || PORTFOLIO_DATA.personalInfo.bio,
        location: (PORTFOLIO_DATA.personalInfo as any).location || '',
        resumeUrl: personal?.resumeFileUrl || personal?.resumeUrl || (PORTFOLIO_DATA.personalInfo as any).resumeUrl || '/bhumika_pagaria_cv.pdf',
        socialLinks: {
          vimeo: personal?.vimeoUrl || PORTFOLIO_DATA.personalInfo.socialLinks.vimeo,
          instagram: personal?.instagramUrl || PORTFOLIO_DATA.personalInfo.socialLinks.instagram,
          linkedin: personal?.linkedinUrl || PORTFOLIO_DATA.personalInfo.socialLinks.linkedin,
          email: personal?.email || PORTFOLIO_DATA.personalInfo.socialLinks.email,
        }
      },
      services: services && services.length > 0 ? services : PORTFOLIO_DATA.services,
      projects: projects && projects.length > 0 ? projects : PORTFOLIO_DATA.projects,
      skills: skills && skills.length > 0 ? skills.filter((s: any) => s.type !== 'soft') : PORTFOLIO_DATA.skills,
      softSkills: skills && skills.length > 0 ? skills.filter((s: any) => s.type === 'soft') : (PORTFOLIO_DATA as any).softSkills,
      testimonials: testimonials && testimonials.length > 0 ? testimonials : (PORTFOLIO_DATA as any).testimonials,
      faqs: PORTFOLIO_DATA.faqs,
    };
  } catch (error) {
    console.warn('Sanity CMS connection warning, using fallback portfolio data:', error);
    return PORTFOLIO_DATA;
  }
}
