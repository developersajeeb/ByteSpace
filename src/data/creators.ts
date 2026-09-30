export const creators = [
  {
    slug: "purepearl-studio",
    name: "PurePearl Studio",
    tagline: "Passionate UI/UX, Web designer",
    avatar: "/images/avatar-2.webp",
    // Figma copy uses a "[Creator's Name]" placeholder and a clipped "ive"; filled in here.
    bio: [
      "Welcome to the creative world of PurePearl Studio. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!",
      "Dive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.",
    ],
    products: 3,
    followers: 12,
  },
];

export const getCreator = (slug: string) => creators.find((c) => c.slug === slug);
