'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

export default function LoginPage() {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Simulating an API call
  const simulateApiCall = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful response
        resolve(true);
      }, 2000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const correctCode = process.env.NEXT_PUBLIC_ACCESS_CODE;
      if (accessCode === correctCode) {
        sessionStorage.setItem('authenticated', 'true');
        router.push('/cats');
      } else {
        setError('Invalid access code. Please try again.');
      }
    } catch (err) {
      console.error('Error during access code verification:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <h1>🐱 Cat Care Portal</h1>
          <p>Enter the access code to view cat care instructions</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="accessCode">
              Access Code
            </label>
            <input
              type="password"
              id="accessCode"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Enter access code"
              required
            />
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'Verifying...' : 'Access Cat Info'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Made with 💜 for Cosmo & Whiskey</p>
        </div>
      </div>
    </div>
  );
}