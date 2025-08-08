'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

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
      <div className={styles.loading}>
        <div>Loading...</div>
      </div>
    );
  }

  const currentCat = catsData[selectedCat];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <h1>Cat Care Instructions</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem('authenticated');
              router.push('/');
            }}
          >
            Logout
          </button>
        </div>

        {/* Cat Selector */}
        <div className={styles.catSelector}>
          {catsData.map((cat, index) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCat(index)}
              className={selectedCat === index ? styles.active : ''}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Cat Information */}
        <div className={styles.infoGrid}>
          {/* Basic Info */}
          <div className={styles.card}>
            <h2>{currentCat.name}</h2>
            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <span>Breed:</span>
                <p>{currentCat.breed}</p>
              </div>
              <div className={styles.infoItem}>
                <span>Personality:</span>
                <p>{currentCat.personality}</p>
              </div>
              <div className={styles.infoItem}>
                <span>Likes:</span>
                <ul>
                  {currentCat.likes.map((like, index) => (
                    <li key={index}>{like}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Feeding Schedule */}
          <div className={styles.card}>
            <h3>🍽️ Feeding Schedule</h3>
            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <span>Times:</span>
                <div className={styles.feedingTimes}>
                  {currentCat.feeding.times.map((time, index) => (
                    <span key={index}>{time}</span>
                  ))}
                </div>
              </div>
              <div className={styles.infoItem}>
                <span>Food:</span>
                <p>{currentCat.feeding.food}</p>
              </div>
              <div className={styles.infoItem}>
                <span>Portion:</span>
                <p>{currentCat.feeding.portion}</p>
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className={styles.card}>
            <h3>🏥 Health Information</h3>
            <div className={styles.infoSection}>
              <div className={styles.infoItem}>
                <span>Allergies:</span>
                <ul>
                  {currentCat.health.allergies.map((allergy, index) => (
                    <li key={index} className={styles.allergy}>{allergy}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.infoItem}>
                <span>Medications:</span>
                <ul>
                  {currentCat.health.medications.map((med, index) => (
                    <li key={index}>{med}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.infoItem}>
                <span>Vet Info:</span>
                <p>{currentCat.health.vetInfo}</p>
              </div>
            </div>
          </div>

          {/* Special Notes */}
          <div className={styles.card}>
            <h3>📝 Special Notes</h3>
            <ul className={styles.specialNotes}>
              {currentCat.specialNotes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className={styles.emergencyCard}>
          <h3>🚨 Emergency Contact</h3>
          <p>
            If you have any urgent questions or concerns, please contact us immediately!
          </p>
          <p>
            We will have limited connectivity in Phuket, but will check messages when possible.
          </p>
        </div>
      </div>
    </div>
  );
}