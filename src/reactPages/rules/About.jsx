// pages/about.js

import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './About.module.css';

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>Meet Sumita Dwivedi</h1>
          <p className={styles.subtitle}>
            A Journey of Inner Peace, Balance & Transformation
          </p>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Image */}
            <div className={styles.imageWrapper}>
              <Image
                src="/sumita-profile.jpg" // 🔁 Replace with your image path
                alt="Sumita Dubey"
                width={400}
                height={500}
                className={styles.image}
              />
            </div>

            {/* Text Content */}
            <div className={styles.content}>
              <p>
                Namaste, I’m <strong>Sumita Dwivedi</strong>, a dedicated yoga practitioner and instructor with over 20 years of experience. My journey has been a path of transformation, healing, and spiritual awakening.
              </p>

              <p>
                At <strong>SwamiYogi</strong>, we believe yoga is a holistic lifestyle — not just physical movement. It helps us:
              </p>

              <ul>
                <li>Improve physical and mental well-being</li>
                <li>Increase self-awareness and clarity</li>
                <li>Build emotional resilience and balance</li>
              </ul>

              <p>
                I've been blessed to guide students through transformative practices. Watching them overcome challenges and embrace joy is my true reward.
              </p>

              <p>
                I invite you to begin your own yoga journey. Let’s explore the profound impact of this practice together — for a healthier, more peaceful life.
              </p>

              <p className={styles.closing}>
                <em>Har Har Mahadev!</em>
              </p>

              <button
                className={styles.ctaButton}
                onClick={() => router.push('/workshops')}
              >
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
