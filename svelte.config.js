import adapter from '@sveltejs/adapter-auto'; // Or your preferred adapter

const config = {
  kit: {
    adapter: adapter(), // Your adapter (e.g., adapter-netlify, adapter-static)
    prerender: {
      entries: ['/', '/about', '/contact'], // Specify which routes to prerender
    },
  },
};

export default config;
