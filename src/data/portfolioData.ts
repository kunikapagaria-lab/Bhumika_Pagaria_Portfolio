export interface Project {
  id: string;
  title: string;
  category: '3d-animation' | '3d-modelling' | '2d-animation' | 'illustrations' | 'commercial-work' | 'client-design' | 'logo-design' | 'odd-bits' | 'others';
  subtitle: string;
  description: string;
  tools: string[];
  videoUrl?: string;
  imageUrl: string;
  breakdown: string[];
  link?: string;
  // Extra photos shown as a gallery on the project page (Sanity only — empty until added there).
  gallery?: { url: string; alt?: string }[];
  // The full write-up for this project (Sanity Portable Text — headings, paragraphs, and
  // images mixed together, like a document). Untyped since Portable Text's shape is defined
  // by Sanity, not by this app.
  fullReport?: any[];
  // Controls the order projects appear within their matching service page. Lower shows first.
  order?: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  bgImage?: string;
  // Matches a Project's `category` so its detail page shows the right work.
  // Kept separate from `id` because Sanity assigns its own random id per document.
  categoryTag?: string;
}

export const PORTFOLIO_DATA = {
  personalInfo: {
    name: "Bhumika Pagaria",
    nickname: "Bhumi",
    role: "Multimedia Designer & Project Coordinator",
    subRole: "Part designer, part coordinator — keeping pixels moving and projects flowing.",
    bio: "Passionate 3D animator and designer holding a Master's degree in 3D Animation from the University of Hertfordshire and a diploma from MAAC. Specializing in character performance, quadruped mechanics, 3D prop modeling, and digital illustrations.",
    location: "London, UK",
    education: [
      "MA in 3D Animation - University of Hertfordshire",
      "Diploma in Animation & Visual Arts - MAAC"
    ],
    tags: [
      "freelancer",
      "3D animator",
      "model artist",
      "MA Hertfordshire",
      "MAAC graduate",
      "cat lover ♥",
      "knows 2 languages",
      "storyteller"
    ],
    socialLinks: {
      vimeo: "https://vimeo.com/user153926662",
      linkedin: "https://www.linkedin.com/in/bhumika-pagaria-157b981b6/",
      instagram: "https://www.instagram.com/bhumika_pagaria/",
      email: "pagariabhumika@gmail.com"
    }
  },

  services: [
    {
      id: "3d-animation",
      title: "3D Animation",
      description: "Bringing characters to life with realistic weight, physics, body mechanics, dynamic dialogue lip-sync, and rich emotional expression.",
      tags: ["Autodesk Maya", "SyncSketch", "Character Rigs"],
      bgImage: "/animation-bg.jpeg",
      categoryTag: "3d-animation"
    },
    {
      id: "3d-modelling",
      title: "3D Modelling",
      description: "Crafting clean geometry, 3D prop models, environment assets, and optimized UV maps ready for production pipelines.",
      tags: ["Maya", "Blender", "ZBrush"],
      bgImage: "/3d-modelling-2-bg.jpeg",
      categoryTag: "3d-modelling"
    },
    {
      id: "illustrations",
      title: "Illustrations",
      description: "Custom digital illustrations in both monochrome line art and vibrant color palettes, character designs, and cover art.",
      tags: ["Procreate", "Photoshop", "Digital Painting"],
      bgImage: "/illustration-bg.jpeg",
      categoryTag: "illustrations"
    },
    {
      id: "client-work",
      title: "Client work",
      description: "Commercial graphic banners, event posters, promotional materials, and client branding assets.",
      tags: ["Branding", "Graphics", "Design"],
      categoryTag: "client-design"
    },
    {
      id: "logo-design",
      title: "Logo Design",
      description: "Crafting unique brand identity marks, vector logos, typography systems, and editorial brand kits.",
      tags: ["Logo Marks", "Identity", "Vector Art"],
      categoryTag: "logo-design"
    },
    {
      id: "others",
      title: "Others",
      description: "Production coordination, pipeline planning, storyboarding, animatics, and custom creative direction.",
      tags: ["Pipeline", "Coordination", "Creative Direction"],
      categoryTag: "others"
    }
  ] as Service[],

  projects: [
    {
      id: "jackie-fall",
      title: "jackie falls down!!",
      category: "3d-animation",
      subtitle: "3D Character Performance & Weight Mechanics",
      description: "A detailed study of physical comedy and body mechanics using the Jackie character rig. Focuses on impact force, balance loss, graph editor smoothing, and camera framing.",
      tools: ["Autodesk Maya", "Jackie Rig", "SyncSketch"],
      videoUrl: "https://player.vimeo.com/video/641042738?h=0a202d0fa3",
      imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
      breakdown: [
        "Analyzed reference footage of physical trips and falls to map key poses.",
        "Adjusted center of gravity and foot contacts to avoid foot sliding.",
        "Fixed graph editor pops on wrist and spine controllers for natural arc motion.",
        "Rendered high-contrast playblasts with contact shadows."
      ],
      link: "https://vimeo.com/user153926662"
    },
    {
      id: "max-combat",
      title: "max combat animation!",
      category: "3d-animation",
      subtitle: "Combat & Weight Transfer Animation",
      description: "Action-packed combat sequence showcasing dynamic punch weight, footwork momentum, and hit reaction timing inside a boxing ring setup.",
      tools: ["Autodesk Maya", "Max Rig", "Playblast render"],
      videoUrl: "https://player.vimeo.com/video/641042738?h=0a202d0fa3",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
      breakdown: [
        "Constructed a custom 3D boxing ring environment.",
        "Calculated kinetic energy transfer from hips to fists for maximum punch impact.",
        "Fine-tuned head reaction and overshoot frames upon collision impact."
      ],
      link: "https://vimeo.com/user153926662"
    },
    {
      id: "kit-walk-cycle",
      title: "kit quadruped walk cycle",
      category: "3d-animation",
      subtitle: "Quadruped Animal Mechanics & Lighting",
      description: "Quadruped cat locomotion study featuring realistic spine flex, tail weight, paw positioning, and custom Hypershade shader setup.",
      tools: ["Maya", "Kit Cat Rig by Fred Qiao", "Hypershade"],
      imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80",
      breakdown: [
        "Studied feline trot and walk motion references for paw sequencing (RF-LH-LF-RH).",
        "Set up treadmill background loop for continuous environment motion.",
        "Configured glossy reflection nodes in Hypershade for eye highlights."
      ],
      link: "https://vimeo.com/user153926662"
    },
    {
      id: "3d-modelling-showcase",
      title: "3d prop & character models",
      category: "3d-modelling",
      subtitle: "Sub-D Modeling & Texturing Collection",
      description: "A gallery of hard-surface props and stylized character assets created for film and animation projects.",
      tools: ["Maya", "Blender", "ZBrush", "Substance Painter"],
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      breakdown: [
        "Clean quad topology optimized for deformation and rigging.",
        "PBR texture maps including Diffuse, Normal, Roughness, and Metallic.",
        "Turntable renders rendered with Arnold and Cycles."
      ]
    },
    {
      id: "illustrations-collection",
      title: "digital art & illustrations",
      category: "illustrations",
      subtitle: "Black & White Line Art + Vibrant Color Art",
      description: "Personal and client visual art projects spanning line-art character studies, conceptual sketches, and digital paintings.",
      tools: ["Procreate", "Photoshop", "Wacom Intuos"],
      imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
      breakdown: [
        "High-contrast black & white ink line art style.",
        "Color mood studies exploring lighting and atmosphere.",
        "Character pose variations and expression sheets."
      ]
    },
    {
      id: "graphic-posters",
      title: "poster & social media designs",
      category: "client-design",
      subtitle: "Brand Graphics & Promotional Banners",
      description: "Commercial graphics created for clients, events, social media campaigns, and visual identity branding.",
      tools: ["Illustrator", "Photoshop", "InDesign"],
      imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80",
      breakdown: [
        "Minimalist modern poster layouts with custom typography.",
        "Optimized asset exports for digital banners and print media."
      ]
    }
  ] as Project[],

  skills: [
    { name: "autodesk maya", category: "3D Animation" },
    { name: "blender", category: "3D Modeling" },
    { name: "zbrush", category: "Sculpting" },
    { name: "adobe after effects", category: "Post & Motion" },
    { name: "photoshop", category: "Digital Painting" },
    { name: "procreate", category: "2D Illustration" },
    { name: "syncsketch", category: "Animation Review" },
    { name: "substance painter", category: "Texturing" },
    { name: "figma", category: "UI/UX Design" },
    { name: "tilda", category: "Web Layout" }
  ],

  softSkills: [
    { name: "character performance" },
    { name: "weight & body mechanics" },
    { name: "creative direction" },
    { name: "storyboarding" },
    { name: "team collaboration" },
    { name: "visual storytelling" },
    { name: "attention to detail" },
    { name: "problem solving" },
    { name: "time management" },
    { name: "feedback integration" }
  ]
};
