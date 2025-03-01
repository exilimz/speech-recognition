# Speech-to-Text Converter

A simple and elegant speech-to-text converter using the ElevenLabs API. Record your voice and convert it to text with high accuracy.

## Features

- Record audio with a 10-second limit
- Play back recorded audio
- Convert speech to text using ElevenLabs API
- Clean and modern UI with mint green and cream aesthetic
- Dark mode support
- Responsive design for all devices

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/speech-recognition.git
cd speech-recognition
npm install
```

### API Configuration

This application uses the ElevenLabs API for speech recognition. You need to obtain an API key from [ElevenLabs](https://elevenlabs.io/).

1. Sign up for an account at [ElevenLabs](https://elevenlabs.io/)
2. Navigate to your profile settings to find your API key
3. Create a `.env.local` file in the root of your project
4. Add your API key to the `.env.local` file:

```
ELEVENLABS_API_KEY=your_api_key_here
ELEVENLABS_API_URL=https://api.elevenlabs.io/v1
```

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deployment

### Deploy on Vercel

The easiest way to deploy this application is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Add your ElevenLabs API key as an environment variable in Vercel's project settings
4. Deploy the application

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [ElevenLabs API](https://elevenlabs.io/) - Speech recognition API
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - Audio recording and playback

## License

This project is licensed under the MIT License - see the LICENSE file for details.
