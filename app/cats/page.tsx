'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CatInfo {
  name: string;
  breed: string;
  personality: string;
  likes: string[];
  feeding: {
    times: string[];
    food: string;
    portion: string;
  };
  health: {
    allergies: string[];
    medications: string[];
    vetInfo: string;
  };
  specialNotes: string[];
}

const catsData: CatInfo[] = [
  {
    name: 'Cosmo',
    breed: 'Maine Coon & Persian Mix',
    personality: 'Shy and timid, but very playful',
    likes: ['Playing with puzzle toys', 'Quiet spaces', 'Gentle petting', 'Watching birds from the window'],
    feeding: {
      times: ['7:00 AM', '5:00 PM'],
      food: 'Royal Canin Indoor Adult',
      portion: '1/3 cup per meal'
    },
    health: {
      allergies: ['Chicken-based foods'],
      medications: ['None currently'],
      vetInfo: 'Annual checkup due in 3 months'
    },
    specialNotes: [
      'Takes time to warm up to new people',
      'Loves his puzzle feeder - keeps him entertained',
      'Prefers to eat in a quiet corner',
      'May hide when stressed - check under the bed'
    ]
  },
  {
    name: 'Whiskey',
    breed: 'British Shorthair',
    personality: 'Very extroverted, food-motivated, and affectionate',
    likes: ['Eating', 'Cuddles', 'Following people around', 'Treats'],
    feeding: {
      times: ['7:00 AM', '12:00 PM', '5:00 PM'],
      food: 'Hill\'s Science Diet Adult',
      portion: '1/4 cup per meal (on diet)'
    },
    health: {
      allergies: ['Dairy products'],
      medications: ['None currently'],
      vetInfo: 'Weight management program - please stick to portions!'
    },
    specialNotes: [
      'Will beg for food constantly - please ignore!',
      'Loves belly rubs (unusual for a cat!)',
      'Very social - will follow you everywhere',
      'On a diet - no extra treats please!'
    ]
  }
];

export default function CatsPage() {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = sessionStorage.getItem('authenticated');
    if (!isAuthenticated) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const currentCat = catsData[selectedCat];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Cat Care Instructions</h1>
            <button
              onClick={() => {
                sessionStorage.removeItem('authenticated');
                router.push('/');
              }}
              className="text-sm text-gray-600 hover:text-gray-800 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Cat Selector */}
        <div className="flex gap-4 mb-6">
          {catsData.map((cat, index) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCat(index)}
              className={`flex-1 p-4 rounded-xl font-semibold transition-all ${
                selectedCat === index
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Cat Information */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentCat.name}</h2>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-600">Breed:</span>
                <p className="text-gray-800">{currentCat.breed}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Personality:</span>
                <p className="text-gray-800">{currentCat.personality}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Likes:</span>
                <ul className="list-disc list-inside text-gray-800 mt-1">
                  {currentCat.likes.map((like, index) => (
                    <li key={index}>{like}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Feeding Schedule */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🍽️ Feeding Schedule</h3>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-600">Times:</span>
                <div className="flex gap-2 mt-1">
                  {currentCat.feeding.times.map((time, index) => (
                    <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Food:</span>
                <p className="text-gray-800">{currentCat.feeding.food}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Portion:</span>
                <p className="text-gray-800">{currentCat.feeding.portion}</p>
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🏥 Health Information</h3>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-600">Allergies:</span>
                <ul className="list-disc list-inside text-gray-800 mt-1">
                  {currentCat.health.allergies.map((allergy, index) => (
                    <li key={index} className="text-red-600">{allergy}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Medications:</span>
                <ul className="list-disc list-inside text-gray-800 mt-1">
                  {currentCat.health.medications.map((med, index) => (
                    <li key={index}>{med}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Vet Info:</span>
                <p className="text-gray-800">{currentCat.health.vetInfo}</p>
              </div>
            </div>
          </div>

          {/* Special Notes */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📝 Special Notes</h3>
            <ul className="space-y-2">
              {currentCat.specialNotes.map((note, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-800">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-6">
          <h3 className="text-xl font-bold text-red-800 mb-2">🚨 Emergency Contact</h3>
          <p className="text-gray-700">
            If you have any urgent questions or concerns, please contact us immediately!
          </p>
          <p className="text-gray-700 mt-2">
            We will have limited connectivity in Phuket, but will check messages when possible.
          </p>
        </div>
      </div>
    </div>
  );
}