// Gym Member Profile JavaScript
class GymProfile {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeAnimations();
    }

    bindEvents() {
        // Appointment modal events
        const appointmentBtn = document.getElementById('appointment-btn');
        const appointmentModal = document.getElementById('appointment-modal');
        const closeAppointment = document.getElementById('close-appointment');
        const cancelAppointment = document.getElementById('cancel-appointment');

        appointmentBtn.addEventListener('click', () => {
            this.openModal(appointmentModal);
        });

        closeAppointment.addEventListener('click', () => {
            this.closeModal(appointmentModal);
        });

        cancelAppointment.addEventListener('click', () => {
            this.closeModal(appointmentModal);
        });

        // Referral modal events
        const referBtn = document.getElementById('refer-btn');
        const referralModal = document.getElementById('referral-modal');
        const closeReferral = document.getElementById('close-referral');
        const cancelReferral = document.getElementById('cancel-referral');

        referBtn.addEventListener('click', () => {
            this.openModal(referralModal);
        });

        closeReferral.addEventListener('click', () => {
            this.closeModal(referralModal);
        });

        cancelReferral.addEventListener('click', () => {
            this.closeModal(referralModal);
        });

        // Check-in/Check-out events
        this.bindCheckInOutEvents();

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal(e.target);
            }
        });

        // Form submissions
        this.bindFormSubmissions();

        // Add ripple effects to buttons
        this.addRippleEffects();
    }

    openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first input in modal
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    bindFormSubmissions() {
        // Appointment form
        const appointmentForm = document.querySelector('#appointment-modal form');
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAppointmentSubmission();
        });

        // Referral form
        const referralForm = document.querySelector('#referral-modal form');
        referralForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleReferralSubmission();
        });
    }

    handleAppointmentSubmission() {
        // Simulate appointment booking
        this.showNotification('Appointment booked successfully!', 'success');
        this.closeModal(document.getElementById('appointment-modal'));
        
        // Reset form
        document.querySelector('#appointment-modal form').reset();
    }

    handleReferralSubmission() {
        // Simulate referral submission
        this.showNotification('Referral invitation sent!', 'success');
        this.closeModal(document.getElementById('referral-modal'));
        
        // Reset form
        document.querySelector('#referral-modal form').reset();
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600';
        const icon = type === 'success' ? 'check-circle' : 'alert-circle';
        
        notification.className = `
            fixed top-4 right-4 bg-gradient-to-r ${bgColor} 
            text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-full 
            transition-transform duration-300 z-50 max-w-sm
        `;
        
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <i data-lucide="${icon}" class="w-5 h-5"></i>
                <span class="font-semibold">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Initialize the icon
        lucide.createIcons();
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    addRippleEffects() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (this.contains(ripple)) {
                        ripple.remove();
                    }
                }, 600);
            });
        });
    }

    bindCheckInOutEvents() {
        let isCheckedIn = false;
        let checkInTime = null;

        const checkinBtn = document.getElementById('checkin-btn');
        const checkoutBtn = document.getElementById('checkout-btn');

        if (checkinBtn) {
            checkinBtn.addEventListener('click', () => {
                if (!isCheckedIn) {
                    isCheckedIn = true;
                    checkInTime = new Date();
                    
                    // Update button states
                    checkinBtn.disabled = true;
                    checkinBtn.style.opacity = '0.5';
                    checkoutBtn.disabled = false;
                    checkoutBtn.style.opacity = '1';
                    
                    // Show status message
                    const statusDiv = document.getElementById('checkin-status');
                    const statusMessage = document.getElementById('status-message');
                    if (statusDiv && statusMessage) {
                        statusMessage.textContent = `Successfully checked in at ${checkInTime.toLocaleTimeString()}`;
                        statusDiv.style.display = 'block';
                    }
                    
                    // Add to fitness logs
                    this.addToFitnessLogs('Check-in', checkInTime);
                    
                    // Show notification
                    this.showNotification('Successfully checked in!', 'success');
                }
            });
        }

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (isCheckedIn) {
                    const checkOutTime = new Date();
                    const duration = Math.round((checkOutTime - checkInTime) / (1000 * 60)); // Duration in minutes
                    
                    isCheckedIn = false;
                    checkInTime = null;
                    
                    // Update button states
                    checkinBtn.disabled = false;
                    checkinBtn.style.opacity = '1';
                    checkoutBtn.disabled = true;
                    checkoutBtn.style.opacity = '0.5';
                    
                    // Show status message
                    const statusDiv = document.getElementById('checkin-status');
                    const statusMessage = document.getElementById('status-message');
                    if (statusDiv && statusMessage) {
                        statusMessage.textContent = `Successfully checked out. Duration: ${duration} minutes`;
                        statusDiv.style.display = 'block';
                    }
                    
                    // Add to fitness logs
                    this.addToFitnessLogs('Check-out', checkOutTime, duration);
                    
                    // Show notification
                    this.showNotification('Successfully checked out!', 'success');
                    
                    // Hide status after 3 seconds
                    setTimeout(() => {
                        if (statusDiv) {
                            statusDiv.style.display = 'none';
                        }
                    }, 3000);
                }
            });
        }

        // Initialize button states
        if (checkoutBtn) {
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = '0.5';
        }
    }

    addToFitnessLogs(action, time, duration = null) {
        // Get existing logs or initialize empty array
        let logs = JSON.parse(localStorage.getItem('fitnessLogs') || '[]');
        
        const logEntry = {
            action: action,
            time: time.toLocaleTimeString(),
            date: time.toLocaleDateString(),
            branch: 'Quezon City', // Default branch
            duration: duration
        };
        
        logs.unshift(logEntry); // Add to beginning of array
        
        // Keep only last 10 entries
        if (logs.length > 10) {
            logs = logs.slice(0, 10);
        }
        
        localStorage.setItem('fitnessLogs', JSON.stringify(logs));
        
        // Update the fitness logs table if it exists
        this.updateFitnessLogsTable();
    }

    updateFitnessLogsTable() {
        const logs = JSON.parse(localStorage.getItem('fitnessLogs') || '[]');
        const tbody = document.querySelector('#fitness-logs-table tbody');
        
        if (tbody) {
            tbody.innerHTML = '';
            
            logs.forEach(log => {
                const row = document.createElement('tr');
                row.className = 'border-t border-secondary/30 text-foreground font-medium';
                
                const durationText = log.duration ? `${log.duration} min` : '';
                const timeText = log.action === 'Check-in' ? log.time : `${log.time} (${durationText})`;
                
                row.innerHTML = `
                    <td class="px-4 py-3">${log.branch}</td>
                    <td class="px-4 py-3">${timeText}</td>
                    <td class="px-4 py-3">${log.date}</td>
                `;
                
                tbody.appendChild(row);
            });
        }
    }

    initializeAnimations() {
        // Animate stats on page load
        this.animateStats();
        
        // Add intersection observer for scroll animations
        this.setupScrollAnimations();
        
        // Load existing fitness logs
        this.updateFitnessLogsTable();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.text-2xl.font-bold.text-yellow-400');
        statNumbers.forEach((stat, index) => {
            const finalValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = finalValue / 30;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue);
                }
            }, 50 + (index * 20));
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe cards for scroll animations
        const cards = document.querySelectorAll('.bg-gradient-to-b');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const fullscreenFlag = localStorage.getItem("enterFullscreen");
    const btn = document.getElementById('enterFullscreenBtn');

    // if (fullscreenFlag === "true") {
    //     btn.classList.remove("hidden"); // show the button

    //     btn.addEventListener('click', () => {
    //         document.documentElement.requestFullscreen()
    //             .then(() => {
    //                 console.log("Entered fullscreen mode.");
    //                 btn.classList.add("hidden"); // hide the button
    //             })
    //             .catch((err) => {
    //                 console.warn("Fullscreen request failed:", err);
    //             });
    //     });

    //       // Listen for fullscreen exit
    //     document.addEventListener('fullscreenchange', () => {
    //         console.log
    //         const isFullscreen = document.fullscreenElement !== null;
    //         if (!isFullscreen) {
    //             console.log("Exited fullscreen mode.");
    //             btn.classList.remove("hidden"); // show the button again
    //         }
    //     });
    // }

    new GymProfile();
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

let accessCode = ["", "", "", ""];
      let currentIndex = 0;
      let showResult = null;
     // let correctCode = localStorage.getItem('memberPIN') || "1234"; // Demo access code
      let captchaCode = generateCaptcha();
      let isCaptchaVerified = false;
      let captchaAttempts = 0;
      let captchaLockedUntil = 0;
      let captchaLockTimeOutId = null;


      function correctCode($pin){
        
      }

      function isCaptchaLocked(){
        const stored = parseInt(localStorage.getItem('captchaLockedUntil') || '0', 10);
        if (stored && stored > captchaLockedUntil) {
          captchaLockedUntil = stored;
        }
        return Date.now() < captchaLockedUntil;
      }

      function lockCaptcha(ms = 30000){
        const input = document.getElementById('captcha-input');
        const verifyBtn = document.getElementById('verify-captcha');
        const errorElement = document.getElementById('captcha-error');

        captchaLockedUntil = Date.now() + ms;
        captchaAttempts = 0;
        localStorage.setItem('captchaLockedUntil', String(captchaLockedUntil));
        if (input) input.disabled = true;
        if (verifyBtn) verifyBtn.disabled = true;
        startCaptchaCountdown();
      }

      function startCaptchaCountdown(){
        const errorElement = document.getElementById('captcha-error');
        const updateMessage = () =>{
          const remaining = Math.max(0, Math.ceil((captchaLockedUntil - Date.now())/1000));
          if (errorElement) errorElement.textContent = `Too many attempts. Try again in ${remaining}s.`;
          if(!isCaptchaLocked()){
            unlockCaptcha();
          } else {
            captchaLockTimeOutId = setTimeout(updateMessage, 500);
          }
        };
        if (captchaLockTimeOutId) clearTimeout(captchaLockTimeOutId);
        updateMessage();
      }

      function unlockCaptcha() {
        const input = document.getElementById('captcha-input');
        const verifyBtn = document.getElementById('verify-captcha');
        const errorElement = document.getElementById('captcha-error');

        captchaLockedUntil = 0;
        if (captchaLockTimeOutId) {
          clearTimeout(captchaLockTimeOutId);
          captchaLockTimeOutId = null;
        }
        localStorage.removeItem('captchaLockedUntil');

        if (input) input.disabled = false;
        if (verifyBtn) verifyBtn.disabled = false;
        if (errorElement) errorElement.textContent = '';
      }

      // Generate random CAPTCHA
      function generateCaptcha() {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < 4; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      }

      // Update CAPTCHA display
      function updateCaptcha() {
        captchaCode = generateCaptcha();
        document.getElementById('captcha-text').textContent = captchaCode;
        document.getElementById('captcha-error').textContent = '';
        isCaptchaVerified = false;
      }

      // Validate CAPTCHA
      function validateCaptcha() {
        const userInput = document.getElementById('captcha-input').value;
        const errorElement = document.getElementById('captcha-error');
        
        if (isCaptchaLocked()){
          const remaining = Math.max(0, Math.ceil((captchaLockedUntil - Date.now())/1000));
          errorElement.textContent = `Too many attempts. Try again in ${remaining}`;
          return false;
        }

        if (userInput === '') {
          errorElement.textContent = 'Please enter the CAPTCHA code';
          return false;
        }

        if(userInput !== captchaCode){
          captchaAttempts += 1;
          if(captchaAttempts >= 3){
            lockCaptcha(30000);
          }
          else {
            updateCaptcha();
            errorElement.textContent = 'Incorrect CAPTCHA. Please try again.';
          }
          return false;
        }
        
        if (userInput !== captchaCode) {
          errorElement.textContent = 'Incorrect CAPTCHA. Please try again.';
          updateCaptcha();
          validateCaptcha().false;
          return false;
        }
        
        errorElement.textContent = '';
        isCaptchaVerified = true;
        captchaAttempts = 0;
        document.getElementById('captcha-input').value = '';
        return true;
      }

      function updateDisplay() {
        for (let i = 0; i < 4; i++) {
          const input = document.getElementById(`digit-${i}`);
          input.value = accessCode[i] || "";

          // Remove all classes
          input.classList.remove("active", "success", "error");

          // Add appropriate class
          if (i === currentIndex && showResult === null) {
            input.classList.add("active");
          } else if (showResult === "success") {
            input.classList.add("success");
          } else if (showResult === "error") {
            input.classList.add("error");
          }
        }

        // Update button states
        const numberButtons = document.querySelectorAll(".keypad-btn.number");
        const backspaceBtn = document.getElementById("backspace-btn");

        numberButtons.forEach((btn) => {
          btn.disabled = currentIndex >= 4 || showResult !== null;
        });

        backspaceBtn.disabled = currentIndex === 0 || showResult !== null;
      }

      function handleNumberClick(number) {
        if (currentIndex < 4 && showResult === null) {
          accessCode[currentIndex] = number;
          currentIndex++;
          updateDisplay();

          // Check if code is complete
          if (currentIndex === 4) {
            // Show CAPTCHA after PIN is complete
            const captchaContainer = document.getElementById('captcha-container');
            captchaContainer.style.display = 'block';
            
            // Focus on CAPTCHA input
            setTimeout(() => {
              document.getElementById('captcha-input').focus();
            }, 100);
          }
        }
      }

      function handleBackspace() {
        if (currentIndex > 0 && showResult === null) {
          currentIndex--;
          accessCode[currentIndex] = "";
          updateDisplay();
        }
      }

      function showResultMessage(type, iconClass, text) {
        const messageDiv = document.getElementById("result-message");
        const iconElement = document.getElementById("result-icon");
        const textElement = document.getElementById("result-text");
        const resetSection = document.getElementById("reset-section");

        messageDiv.className = `result-message result-${type}`;
        iconElement.className = iconClass;
        textElement.textContent = text;

        messageDiv.style.display = "block";
        if (type === "error") {
          resetSection.style.display = "block";
        }
      }

      function handleSuccessfulLogin() {
        showResult = "success";
        showResultMessage("success", "fas fa-check", "Access Granted");
        
        // Show redirect message
        const redirectMessage = document.getElementById("redirect-message");
        redirectMessage.style.display = 'block';
        redirectMessage.style.opacity = '1';
        
        // Hide auth section and all its contents, then show app section
        setTimeout(() => {
          const authSection = document.getElementById('auth-section');
          const appSection = document.getElementById('app-section');
          
          // Hide the entire auth section and its contents
          authSection.style.display = 'none';
          authSection.classList.add('d-none');
          // Ensure it's removed from layout flow
          authSection.setAttribute('aria-hidden', 'true');
          authSection.inert = true;
          
          // Make sure app section is properly positioned and visible
          appSection.classList.remove('d-none');
          appSection.style.display = 'block';
          appSection.removeAttribute('aria-hidden');
          appSection.inert = false;
          
          // Hide redirect message
          redirectMessage.style.display = 'none';
          
          // Force a reflow to ensure styles are applied
          void appSection.offsetHeight;

          // Load stored profile photo into dashboard
          const storedPhoto = localStorage.getItem('memberPhoto');
          if (storedPhoto) {
            const profileImg = document.getElementById('lp-profile-img');
            if (profileImg) profileImg.src = storedPhoto;
          }
        }, 1000);
      }

      function handleFailedLogin() {
        showResult = "error";
        showResultMessage("error", "fas fa-times", "Access Denied");
        // Reset after 2 seconds
        setTimeout(() => {
          resetCode();
        }, 2000);
      }

      function resetCode() {
        accessCode = ["", "", "", ""];
        currentIndex = 0;
        showResult = null;
        isCaptchaVerified = false;
        captchaAttempts = 0;
        captchaLockedUntil = 0;
        if (captchaLockTimeOutId) {
          clearTimeout(captchaLockTimeOutId);
          captchaLockTimeOutId = null;
        }
        const captchaInput = document.getElementById('captcha-input');
        const verifyBtn = document.getElementById('verify-captcha');
        if (captchaInput) captchaInput.disabled = false;
        if (verifyBtn) verifyBtn.disabled = false;

        document.getElementById("result-message").style.display = "none";
        document.getElementById("reset-section").style.display = "none";
        document.getElementById("redirect-message").classList.remove("show");
        document.getElementById("captcha-error").textContent = "";

        // Hide CAPTCHA container
        document.getElementById("captcha-container").style.display = "none";

        updateCaptcha();
        updateDisplay();
      }

      // Initialize display
      updateDisplay();

      // Add keyboard support
      document.addEventListener("keydown", function (event) {
        // Check if the event target is the CAPTCHA input or settings PIN inputs
        const captchaInput = document.getElementById('captcha-input');
        const newPinInput = document.getElementById('lp-new-pin');
        const confirmPinInput = document.getElementById('lp-confirm-pin');
        
        if (document.activeElement === captchaInput || 
            document.activeElement === newPinInput || 
            document.activeElement === confirmPinInput) {
          // Allow typing in these inputs without affecting main PIN
          return;
        }
        
        // Handle PIN input
        if (event.key >= "0" && event.key <= "9") {
          handleNumberClick(event.key);
        } else if (event.key === "Backspace") {
          event.preventDefault();
          handleBackspace();
        }
      });

      // Add event listeners for CAPTCHA
      document.getElementById('refresh-captcha').addEventListener('click', updateCaptcha);

      // Handle CAPTCHA submission
      document.getElementById('captcha-input').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          if (isCaptchaLocked()) return;
          if (validateCaptcha()) {
            const enteredCode = accessCode.join("");
            if (enteredCode === correctCode()) {
              handleSuccessfulLogin();
            } else {
              handleFailedLogin();
            }
          }
        }
        
      });

      document.getElementById('verify-captcha').addEventListener('click', function(e){
        if (isCaptchaLocked()) return;
        const captchaInput = document.getElementById('captcha-input').value;
            if(validateCaptcha()){
              const enteredCode = accessCode.join("");
              if(enteredCode === correctCode()){
                handleSuccessfulLogin();
              } else {
                handleFailedLogin();
              }     
            }
      });

      function requestFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          // Safari
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          // IE11
          elem.msRequestFullscreen();
        }
      }

      // Trigger fullscreen on first interaction (click, touch, etc.)
      function enableFullscreenOnFirstInteraction() {
        document.addEventListener("click", goFullscreenOnce, { once: true });
        document.addEventListener("touchstart", goFullscreenOnce, {
          once: true,
        });
      }

      function goFullscreenOnce() {
        requestFullscreen();
      }

      // Initialize CAPTCHA on page load
      updateCaptcha();
      // If still locked (e.g., after reload), keep countdown running and inputs disabled
      if (isCaptchaLocked()) {
        const input = document.getElementById('captcha-input');
        const verifyBtn = document.getElementById('verify-captcha');
        if (input) input.disabled = true;
        if (verifyBtn) verifyBtn.disabled = true;
        startCaptchaCountdown();
      }
      
      // Call this when the page loads
      enableFullscreenOnFirstInteraction();

      // =====================
      // Modal controls (show/hide)
      // =====================
      function showModal(id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
      }
      function hideModal(id) {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
      }

      // Open modals
      document.getElementById('appointment-btn')?.addEventListener('click', () => showModal('appointment-modal'));
      document.getElementById('refer-btn')?.addEventListener('click', () => showModal('referral-modal'));

      // Close buttons
      document.getElementById('close-appointment')?.addEventListener('click', () => hideModal('appointment-modal'));
      document.getElementById('cancel-appointment')?.addEventListener('click', () => hideModal('appointment-modal'));
      document.getElementById('close-referral')?.addEventListener('click', () => hideModal('referral-modal'));
      document.getElementById('cancel-referral')?.addEventListener('click', () => hideModal('referral-modal'));

      // Click outside to close
      document.addEventListener('click', (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;
        if (target.id === 'appointment-modal') hideModal('appointment-modal');
        if (target.id === 'referral-modal') hideModal('referral-modal');
      });

      // Escape key to close active modal
      document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const open = document.querySelector('.modal-overlay.active');
        if (open && open.id) hideModal(open.id);
      });

      // =====================
      // Settings Integration
      // =====================
      function lpShowSettings() {
        const screen = document.getElementById('lp-settings-screen');
        if (!screen) return;
        screen.classList.remove('hidden');
        screen.style.display = 'block';
        // Populate current state
        const storedPhoto = localStorage.getItem('memberPhoto');
        const img = document.getElementById('lp-settings-avatar-img');
        if (storedPhoto && img) img.src = storedPhoto;
        const newPin = document.getElementById('lp-new-pin');
        const confirmPin = document.getElementById('lp-confirm-pin');
        if (newPin) newPin.value = '';
        if (confirmPin) confirmPin.value = '';
      }

      function lpHideSettings() {
        const screen = document.getElementById('lp-settings-screen');
        if (!screen) return;
        screen.style.display = 'none';
        screen.classList.add('hidden');
      }

      function lpToast(message) {
        const el = document.createElement('div');
        el.textContent = message;
        el.style.position = 'fixed';
        el.style.bottom = '20px';
        el.style.left = '50%';
        el.style.transform = 'translateX(-50%)';
        el.style.background = 'rgb(236, 182, 19)';
        el.style.color = '#000';
        el.style.padding = '10px 16px';
        el.style.borderRadius = '8px';
        el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        el.style.zIndex = '2000';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1600);
      }

      // Event bindings
      document.getElementById('lp-settings-button')?.addEventListener('click', lpShowSettings);
      document.getElementById('lp-back-to-dashboard')?.addEventListener('click', lpHideSettings);
      document.getElementById('lp-sign-out')?.addEventListener('click', () => {
        // Sign out: hide app, show auth, reset code
        lpHideSettings();
        const authSection = document.getElementById('auth-section');
        const appSection = document.getElementById('app-section');
        if (appSection) {
          appSection.style.display = 'none';
          appSection.classList.add('d-none');
          appSection.setAttribute('aria-hidden', 'true');
          appSection.inert = true;
        }
        if (authSection) {
          authSection.style.display = 'flex';
          authSection.classList.remove('d-none');
          authSection.removeAttribute('aria-hidden');
          authSection.inert = false;
        }
        resetCode();
      });

      // Photo preview and save
      document.getElementById('lp-photo-input')?.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          const img = document.getElementById('lp-settings-avatar-img');
          if (img) img.src = reader.result;
        };
        reader.readAsDataURL(file);
      });

      document.getElementById('lp-save-photo')?.addEventListener('click', () => {
        const img = document.getElementById('lp-settings-avatar-img');
        if (img && img.src) {
          localStorage.setItem('memberPhoto', img.src);
          // Reflect on dashboard immediately
          const profileImg = document.getElementById('lp-profile-img');
          if (profileImg) profileImg.src = img.src;
          lpToast('Photo updated');
        }
      });

      // PIN save
      document.getElementById('lp-save-pin')?.addEventListener('click', () => {
        const newPin = (document.getElementById('lp-new-pin') || {}).value || '';
        const confirmPin = (document.getElementById('lp-confirm-pin') || {}).value || '';
        if (!/^\d{4}$/.test(newPin)) {
          alert('PIN must be exactly 4 digits.');
          return;
        }
        if (newPin !== confirmPin) {
          alert('PINs do not match.');
          return;
        }
        localStorage.setItem('memberPIN', newPin);
        correctCode = newPin;
        lpToast('PIN updated');
        lpHideSettings();
        
      });

      // If user already logged before, preload avatar on page load when app visible
      (function preloadAvatarIfNeeded(){
        const storedPhoto = localStorage.getItem('memberPhoto');
        if (storedPhoto) {
          const img = document.getElementById('lp-profile-img');
          if (img) img.src = storedPhoto;
        }
      })();

      // Check-in/Check-out functionality
      let isCheckedIn = false;
      let checkInTime = null;

      document.getElementById('checkin-btn')?.addEventListener('click', function() {
        if (!isCheckedIn) {
          isCheckedIn = true;
          checkInTime = new Date();
          
          // Update button states
          document.getElementById('checkin-btn').disabled = true;
          document.getElementById('checkin-btn').style.opacity = '0.5';
          document.getElementById('checkout-btn').disabled = false;
          document.getElementById('checkout-btn').style.opacity = '1';
          
          // Show status message
          const statusDiv = document.getElementById('checkin-status');
          const statusMessage = document.getElementById('status-message');
          statusMessage.textContent = `Successfully checked in at ${checkInTime.toLocaleTimeString()}`;
          statusDiv.style.display = 'block';
          
          // Add to fitness logs
          addToFitnessLogs('Check-in', checkInTime);
          
          // Show notification
          if (typeof lpToast === 'function') {
            lpToast('Successfully checked in!');
          }
        }
      });

      document.getElementById('checkout-btn')?.addEventListener('click', function() {
        if (isCheckedIn) {
          const checkOutTime = new Date();
          const duration = Math.round((checkOutTime - checkInTime) / (1000 * 60)); // Duration in minutes
          
          isCheckedIn = false;
          checkInTime = null;
          
          // Update button states
          document.getElementById('checkin-btn').disabled = false;
          document.getElementById('checkin-btn').style.opacity = '1';
          document.getElementById('checkout-btn').disabled = true;
          document.getElementById('checkout-btn').style.opacity = '0.5';
          
          // Show status message
          const statusDiv = document.getElementById('checkin-status');
          const statusMessage = document.getElementById('status-message');
          statusMessage.textContent = `Successfully checked out. Duration: ${duration} minutes`;
          statusDiv.style.display = 'block';
          
          // Add to fitness logs
          addToFitnessLogs('Check-out', checkOutTime, duration);
          
          // Show notification
          if (typeof lpToast === 'function') {
            lpToast('Successfully checked out!');
          }
          
          // Hide status after 3 seconds
          setTimeout(() => {
            statusDiv.style.display = 'none';
          }, 3000);
        }
      });

      function addToFitnessLogs(action, time, duration = null) {
        // Get existing logs or initialize empty array
        let logs = JSON.parse(localStorage.getItem('fitnessLogs') || '[]');
        
        const logEntry = {
          action: action,
          time: time.toLocaleTimeString(),
          date: time.toLocaleDateString(),
          branch: 'Quezon City', // Default branch
          duration: duration
        };
        
        logs.unshift(logEntry); // Add to beginning of array
        
        // Keep only last 10 entries
        if (logs.length > 10) {
          logs = logs.slice(0, 10);
        }
        
        localStorage.setItem('fitnessLogs', JSON.stringify(logs));
        
        // Update the fitness logs table if it exists
        updateFitnessLogsTable();
      }

      function updateFitnessLogsTable() {
        const logs = JSON.parse(localStorage.getItem('fitnessLogs') || '[]');
        const tbody = document.querySelector('#fitness-logs-table tbody');
        
        if (tbody) {
          tbody.innerHTML = '';
          
          logs.forEach(log => {
            const row = document.createElement('tr');
            row.className = 'border-t border-secondary/30 text-foreground font-medium';
            
            const durationText = log.duration ? `${log.duration} min` : '';
            const timeText = log.action === 'Check-in' ? log.time : `${log.time} (${durationText})`;
            
            row.innerHTML = `
              <td class="px-4 py-3">${log.branch}</td>
              <td class="px-4 py-3">${timeText}</td>
              <td class="px-4 py-3">${log.date}</td>
            `;
            
            tbody.appendChild(row);
          });
        }
      }

      // Initialize check-in/check-out button states
      document.addEventListener('DOMContentLoaded', function() {
        const checkinBtn = document.getElementById('checkin-btn');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        if (checkinBtn && checkoutBtn) {
          checkoutBtn.disabled = true;
          checkoutBtn.style.opacity = '0.5';
          
          // Load existing fitness logs
          updateFitnessLogsTable();
        }
      });