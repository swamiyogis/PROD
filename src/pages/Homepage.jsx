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
import Contact from './Contact';

const HomePage = () => {
  const navigate = useNavigate();
  const [showGallery, setShowGallery] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews(5).then((data) => {
      setReviews(data);
      setIsLoading(false);
    });
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
        <div className="hero-background" />
        <div className="hero-content">
          <p>Calorie control, balanced nutrition</p>
          <h1>Start living your <br /> healthiest life</h1>
          <button onClick={() => navigate('/workshops')}>Book An Appointment</button>
        </div>
      </section>

      <section className="about">
        <img
          src="https://picsum.photos/seed/174/600"
          alt="about"
        />
        <div className="about-text">
          <h2>Change your life through professional health coaching</h2>
          <p>
            I help clients transform their health through personalized nutrition and sustainable habits. I’ve guided over 100 clients to better well-being by focusing on small, manageable changes that lead to lasting results.
          </p>
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
