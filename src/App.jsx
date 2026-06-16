import { useState, useEffect } from 'react';

function App() {
  // ==========================================
  // 1. COUNTDOWN TIMER LOGIC
  // ==========================================
  const launchDate = new Date('July 4, 2026 19:41:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: '25',
    hours: '07',
    minutes: '45',
    seconds: '30'
  });

  useEffect(() => {
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = launchDate - now;

      // If target has passed
      if (distance < 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update state with padded values
      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    }

    // Run once immediately, then update every second
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [launchDate]);

  // ==========================================
  // 2. EMAIL WAITLIST SUBSCRIPTION LOGIC
  // ==========================================
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const isValidEmail = (val) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(val);
  };

  const showFeedback = (message, type) => {
    setFeedback({ message, type });

    // Clear error feedback after 4 seconds (keep success)
    if (type === 'error') {
      setTimeout(() => {
        setFeedback((prev) => (prev.type === 'error' ? { message: '', type: '' } : prev));
      }, 4000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValue = email.trim();

    // Reset feedback
    setFeedback({ message: '', type: '' });

    // Validation checks
    if (!emailValue) {
      showFeedback('Please enter your email address.', 'error');
      return;
    }

    if (!isValidEmail(emailValue)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate network request
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      showFeedback("Success! You've been added to the waitlist.", 'success');
    }, 1000);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <header className="main-header">
        <div className="logo" aria-label="Athleum Home">
          <img src="/logo-transparent.png" className="logo-icon" alt="Athleum Logo" />
          <div className="logo-text">
            <span className="logo-title">ATHLEUM</span>
            <span className="logo-subtitle">MOVE BEYOND LIMITS</span>
          </div>
        </div>

        {/* Social Media Links */}
        <nav className="social-nav" aria-label="Social Media Links">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            id="social-instagram"
            aria-label="Instagram"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            id="social-facebook"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            id="social-youtube"
            aria-label="YouTube"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a href="mailto:info@athleum.com" className="social-link" id="social-email" aria-label="Email Us">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="main-content" role="main">
        {/* Left Column: Copy & Form */}
        <section className="content-column">
          <div className="coming-soon-intro">
            <span className="intro-badge">SOMETHING POWERFUL IS</span>
            <h1 className="main-title">
              COMING
              <br />
              SOON
            </h1>
            <p className="intro-text">
              We're building the next generation of performance wear for those who move{' '}
              <span className="highlight-blue">beyond</span> limits.
            </p>
            <div className="blue-accent-bar" aria-hidden="true"></div>
          </div>

          {/* Countdown Timer */}
          <div className="countdown" role="timer" aria-live="polite" aria-label="Time left until launch">
            <div className="countdown-card">
              <span className="countdown-number" id="days">
                {timeLeft.days}
              </span>
              <span className="countdown-label">DAYS</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-card">
              <span className="countdown-number" id="hours">
                {timeLeft.hours}
              </span>
              <span className="countdown-label">HOURS</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-card">
              <span className="countdown-number" id="minutes">
                {timeLeft.minutes}
              </span>
              <span className="countdown-label">MINUTES</span>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-card">
              <span className="countdown-number" id="seconds">
                {timeLeft.seconds}
              </span>
              <span className="countdown-label">SECONDS</span>
            </div>
          </div>

          {/* Subscription Form */}
          <div className="notify-container">
            <h2 className="notify-title">BE THE FIRST TO KNOW</h2>
            <p className="notify-subtitle">Exclusive launch offers, early access & more.</p>

            <form className="signup-form" id="signup-form" onSubmit={handleSubmit} noValidate>
              <div className="input-wrapper">
                <svg
                  className="mail-icon"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input
                  type="email"
                  id="email-input"
                  placeholder="Enter your email address"
                  aria-label="Email address for notification list"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <button type="submit" className="notify-btn" id="notify-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  'SAVING WAITLIST...'
                ) : (
                  <>
                    NOTIFY ME
                    <svg
                      className="arrow-icon"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12,5 19,12 12,19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className={`form-feedback ${feedback.type}`} id="form-feedback" role="status" aria-live="polite">
              {feedback.message}
            </div>
          </div>

          {/* Features Badges Grid */}
          <div className="features-row">
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" />
                  <line x1="12" y1="12" x2="5" y2="19" />
                </svg>
              </div>
              <span className="feature-title-bold">LIGHTWEIGHT</span>
              <span className="feature-title-sub">PERFORMANCE</span>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 20c0-3 2-5 2-8s-2-5-2-8" />
                  <path d="M4 6l2-3 2 3" />
                  <path d="M12 20c0-3 2-5 2-8s-2-5-2-8" />
                  <path d="M10 6l2-3 2 3" />
                  <path d="M18 20c0-3 2-5 2-8s-2-5-2-8" />
                  <path d="M16 6l2-3 2 3" />
                </svg>
              </div>
              <span className="feature-title-bold">BREATHABLE</span>
              <span className="feature-title-sub">FABRICS</span>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 8 C10 9, 14 9, 16 8 C15 10, 15 14, 16 16 C14 15, 10 15, 8 16 C9 14, 9 10, 8 8 Z" />
                  <path d="M6 6L2 2M2 2H5M2 2V5" />
                  <path d="M18 6l4-4M22 2h-3M22 2v3" />
                  <path d="M6 18l-4 4M2 22h3M2 22v-3" />
                  <path d="M18 18l4 4M22 22h-3M22 22v-3" />
                </svg>
              </div>
              <span className="feature-title-bold">4-WAY STRETCH</span>
              <span className="feature-title-sub">COMFORT</span>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 11l2 2 4-4" />
                </svg>
              </div>
              <span className="feature-title-bold">BUILT TO</span>
              <span className="feature-title-sub">PERFORM</span>
            </div>
          </div>
        </section>

        {/* Athletic Models Container */}
        <div className="models-image-wrapper">
          <img src="/models_hero.png" alt="Athleum performance sports wear models" className="models-img" />
        </div>

        {/* Right Tagline Sidebar */}
        <div className="tagline-sidebar" aria-label="Brand tagline">
          <div className="tagline-text">
            ONE BRAND. <span className="tagline-blue">EVERY MOVE.</span>
          </div>
          <div className="tagline-line" aria-hidden="true"></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <p>&copy; 2024 ATHLEUM. ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}

export default App;
