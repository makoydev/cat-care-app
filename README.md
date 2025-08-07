# Cat Care Portal 🐱

A secure web application to share cat care instructions with pet sitters. Built with Next.js, TypeScript, and Firebase.

## Features

- 🔐 Secure access with access code
- 🐱 Detailed information for each cat
- 📅 Feeding schedules and portions
- 🏥 Health information and allergies
- 📝 Special care notes
- 📱 Mobile-friendly responsive design

## Cat Information

### Cosmo
- **Breed**: Maine Coon & Persian Mix
- **Personality**: Shy and timid, but very playful
- **Special Notes**: Takes time to warm up, loves puzzle toys

### Whiskey
- **Breed**: British Shorthair
- **Personality**: Very extroverted, food-motivated, and affectionate
- **Special Notes**: On a diet - please stick to portions!

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file based on `.env.example`
4. Set up a Firebase project and add your configuration
5. Set your desired access code in `NEXT_PUBLIC_ACCESS_CODE`
6. Run the development server: `npm run dev`

## Deployment

This app can be easily deployed to Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## Security

- Access is protected by a code
- Session-based authentication
- No user data is stored permanently