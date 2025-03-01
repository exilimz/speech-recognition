import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    ASSEMBLYAI_API_KEY: process.env.ASSEMBLYAI_API_KEY,
  },
  // Increase the API timeout for AssemblyAI transcription
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase the body size limit for larger audio files
    },
  },
};

export default nextConfig;
