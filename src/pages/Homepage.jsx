// HomePage.jsx
import React, { useEffect, useState, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css'
import ReviewCard from '../components/ReviewCard/ReviewCard';
import fetchReviews from '../utils/reviews_fetch';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AutoScrollGrid from '../components/AutoScrollGrid';
import Footer from '../components/Footer';
import Contact from './rules/Contact';
import fetchBanners from '../utils/fetchBanner';

const HomePage = () => {
  const navigate = useNavigate();
  const [showGallery, setShowGallery] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heroImage, setHeroImage] = useState('');

  useEffect(() => {
    fetchReviews(5).then((data) => {
      setReviews(data);
      setIsLoading(false);
    });
     fetchBanners().then((data)=> {
      setHeroImage(data)
     })
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const gallery = document.getElementById('gallery');
      const review = document.getElementById('reviews');
      if (gallery && gallery.getBoundingClientRect().top < window.innerHeight) {
        setShowGallery(true);
      }
      if (review && review.getBoundingClientRect().top < window.innerHeight) {
        setShowReviews(true);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  return (
    <div className="homepage">

      <section className="hero">
      <div className="announcement-bar">
        <p>🧘‍♀️ Celebrate International Yoga Day on June 21! Book your yoga session now! 🧘‍♂️</p>
      </div>
        <div
          className="hero-background"
          style={{
            backgroundImage: `url('${heroImage}')`
          }}
        />
        <div className="hero-content">
          <p>Calorie control, balanced nutrition</p>
          <h1>Start living your <br /> healthiest life</h1>
          <button onClick={() => navigate('/workshops')}>Book An Appointment</button>
        </div>
      </section>

      <section className="about-section">
      <div className="about-container">
        <div className="about-image">
          <img
            src="https://picsum.photos/seed/174/600"
            alt="Sumita Dwivedi Yoga"
          />
        </div>
        <div className="about-content">
          <h2 className="section-title">Meet Sumita Dubey & SwamiYogi</h2>
          <p className="section-subtitle">
            A Journey of Inner Peace, Balance & Transformation
          </p>
          <p className="about-description">
            With over two decades of dedicated yoga practice, Sumita Dwivedi brings
            the timeless wisdom of yoga to life. In collaboration with SwamiYogi,
            she empowers individuals to reconnect with their inner selves, cultivate
            holistic well-being, and lead a more conscious, purposeful life. Whether
            you're beginning your practice or deepening it, this journey is about
            unlocking your full potential—physically, mentally, and spiritually.
          </p>
          <button className="about-cta" onClick={() => navigate('/workshops')} >Start Your Journey</button>
        </div>
      </div>
    </section>

      <section id="gallery" className="gallery">
        {showGallery ? <AutoScrollGrid /> : <div style={{ height: 400 }}></div>}
      </section>

      <hr />

      <section className="testimonials">
      <h2>What my Students think</h2>
      <div id="reviews">
        {showReviews ? (
          isLoading ? (
            <p>Loading...</p>
          ) : reviews.length === 0 ? (
            <p>No reviews found.</p>
          ) : (
            <Carousel
              showArrows={true}
              autoPlay={true}
              infiniteLoop={true}
              interval={4000}
              showThumbs={false}
              showStatus={false}
              swipeable={true}
              emulateTouch={true}
            >
              {reviews.map((review, index) => (
                <div key={index}>
                  <Suspense fallback={<p>Loading review...</p>}>
                    <ReviewCard review={review} />
                  </Suspense>
                </div>
              ))}
            </Carousel>

          )
        ) : (
          <div style={{ height: 300 }} />
        )}
      </div>
    </section>
    <section id="contact">
      <Contact />
    </section>

     <footer>
      <Footer/>
     </footer>
    </div>
  );
};

export default HomePage;
