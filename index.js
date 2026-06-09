document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. COUNTDOWN TIMER LOGIC
  // ==========================================
  
  // Set target launch date (July 4, 2026 at 19:41:30 - approx 25d 7h 45m 30s from June 9, 2026)
  const launchDate = new Date('July 4, 2026 19:41:30').getTime();
  
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;
    
    // If target has passed
    if (distance < 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      clearInterval(countdownInterval);
      return;
    }
    
    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update DOM with padded values
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }
  
  // Run once immediately, then update every second
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
  
  
  // ==========================================
  // 2. EMAIL WAITLIST SUBSCRIPTION LOGIC
  // ==========================================
  
  const form = document.getElementById('signup-form');
  const emailInput = document.getElementById('email-input');
  const feedbackEl = document.getElementById('form-feedback');
  const notifyBtn = document.getElementById('notify-button');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailValue = emailInput.value.trim();
      
      // Reset feedback classes and text
      feedbackEl.textContent = '';
      feedbackEl.className = 'form-feedback';
      
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
      simulateSubscription(emailValue);
    });
  }
  
  function isValidEmail(email) {
    // Standard email validation pattern
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  
  function showFeedback(message, type) {
    if (!feedbackEl) return;
    feedbackEl.textContent = message;
    feedbackEl.classList.add(type);
    
    // Clear error feedback after 4 seconds (keep success)
    if (type === 'error') {
      setTimeout(() => {
        if (feedbackEl.classList.contains('error')) {
          feedbackEl.textContent = '';
          feedbackEl.classList.remove('error');
        }
      }, 4000);
    }
  }
  
  function simulateSubscription(email) {
    // Disable inputs and button during submission
    if (notifyBtn) {
      notifyBtn.disabled = true;
      notifyBtn.innerHTML = 'SAVING WAITLIST...';
    }
    if (emailInput) {
      emailInput.disabled = true;
    }
    
    // Simulate API delay (800ms)
    setTimeout(() => {
      // Re-enable inputs
      if (notifyBtn) {
        notifyBtn.disabled = false;
        notifyBtn.innerHTML = 'NOTIFY ME <svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12,5 19,12 12,19"></polyline></svg>';
      }
      if (emailInput) {
        emailInput.disabled = false;
        emailInput.value = ''; // Reset input on success
      }
      
      // Show success feedback
      showFeedback("Success! You've been added to the waitlist.", 'success');
    }, 1000);
  }
});
