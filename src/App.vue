<template>
  <div class="app" :class="{ 'eco-mode': ecoMode, 'menu-open': mobileMenuOpen }">

    <!-- Language Selection Screen -->
    <div v-if="showLanguageSelection" class="language-selection">
      <div class="language-container">
        <h1 class="logo-text">{{ t('languageSelection.title') }}</h1>
        <h2>{{ t('languageSelection.select') }}</h2>
        <div class="language-buttons">
          <button @click="selectLanguage('fr')" class="btn-language btn-fr">
            {{ t('languageSelection.fr') }}
          </button>
          <button @click="selectLanguage('en')" class="btn-language btn-en">
            {{ t('languageSelection.en') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Main App Content -->
    <template v-else>
      <!-- Header -->
      <header class="header" :class="{ 'header-scrolled': scrolled }">
        <div class="container header-container">
          <a href="#hero" @click.prevent="scrollToSection('hero')" class="logo">NOWLIGHT</a>
          <nav class="nav-links">
            <ul>
              <li><a href="#ambition" @click.prevent="scrollToSection('ambition')">{{ t('nav.ambition') }}</a></li>
              <li><a href="#conception" @click.prevent="scrollToSection('conception')">{{ t('nav.conception') }}</a></li>
              <li><a href="#engagements" @click.prevent="scrollToSection('engagements')">{{ t('nav.engagements') }}</a></li>
              <li><a href="#contact" @click.prevent="scrollToSection('contact')">{{ t('nav.contact') }}</a></li>
              <li class="language-dropdown">
                <button @click="toggleLanguageDropdown" class="language-btn">
                  {{ locale.toUpperCase() }}
                  <span class="dropdown-icon" :class="{ 'open': showLanguageDropdown }">▼</span>
                </button>
                <div v-if="showLanguageDropdown" class="dropdown-content">
                  <a @click="selectLanguage('fr')">Français</a>
                  <a @click="selectLanguage('en')">English</a>
                </div>
              </li>
            </ul>
          </nav>
          <button @click="toggleMobileMenu" class="mobile-menu-btn" :class="{ 'active': mobileMenuOpen }" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <!-- Mobile Menu -->
      <div class="mobile-menu" :class="{ 'active': mobileMenuOpen }">
        <button @click="toggleMobileMenu" class="mobile-close-btn" aria-label="Close menu">×</button>
        <ul>
          <li><a href="#ambition" @click="scrollToSectionMobile('ambition')">{{ t('nav.ambition') }}</a></li>
          <li><a href="#conception" @click="scrollToSectionMobile('conception')">{{ t('nav.conception') }}</a></li>
          <li><a href="#engagements" @click="scrollToSectionMobile('engagements')">{{ t('nav.engagements') }}</a></li>
          <li><a href="#contact" @click="scrollToSectionMobile('contact')">{{ t('nav.contact') }}</a></li>
          <li class="mobile-language-selector">
            <button @click="selectLanguageMobile('fr')" :class="{ active: locale === 'fr' }">FR</button>
            <span>|</span>
            <button @click="selectLanguageMobile('en')" :class="{ active: locale === 'en' }">EN</button>
          </li>
          <li>
            <button @click="toggleEcoModeMobile" class="mobile-eco-btn">
              <i :class="ecoMode ? 'fas fa-sun' : 'fas fa-leaf'"></i>
              {{ ecoMode ? t('hero.ecoModeOn') : t('hero.ecoModeOff') }}
            </button>
          </li>
        </ul>
      </div>
      <div v-if="mobileMenuOpen" class="mobile-menu-overlay" @click="toggleMobileMenu"></div>


      <main>
        <!-- Hero Section -->
        <section id="hero" class="hero-section">
          <div class="hero-top-elements">
            <div class="hero-logo">NOWLIGHT</div>
            <button @click="toggleEcoMode" class="eco-btn">
              <i :class="ecoMode ? 'fas fa-sun' : 'fas fa-leaf'"></i>
              {{ ecoMode ? t('hero.ecoModeOn') : t('hero.ecoModeOff') }}
            </button>
          </div>
          <div class="hero-content">
            <h2 class="subtitle">{{ t('hero.subtitle') }}</h2>
            <h1 class="title">{{ t('hero.title') }}</h1>
          </div>
          <div class="scroll-indicator">
            <span>{{ t('hero.scrollDown') }}</span>
            <a href="#ambition" @click.prevent="scrollToSection('ambition')" aria-label="Scroll down">
              <div class="arrow-down"></div>
            </a>
          </div>
        </section>

        <!-- Ambition Section -->
        <section id="ambition" class="content-section ambition-section">
          <div class="container">
            <div class="section-content layout-split">
              <div class="text-content">
                <h2>{{ t('ambition.title') }}</h2>
                <p>{{ t('ambition.paragraph1') }}</p>
                <p>{{ t('ambition.paragraph2') }}</p>
                <p>{{ t('ambition.paragraph3') }}</p>
              </div>
              <div class="media-content">
                <div class="image-container" v-if="!ecoMode">
                  <img 
                    src="@/assets/images/ambition-image.jpg" 
                    :alt="t('ambition.title')"
                    class="ambition-image"
                  />
                </div>
                <div class="eco-placeholder-media" v-else>
                  {{ t('ambition.title') }} - Image Disabled in Eco Mode
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Conception Section - Using the new component -->
        <ConceptionSection :eco-mode="ecoMode" />

        <!-- Engagements Section -->
        <section id="engagements" class="content-section engagements-section">
          <div class="container">
            <h2>{{ t('engagements.title') }}</h2>
            <div class="engagements-grid">
              <div class="engagement-item" v-for="i in 3" :key="i">
                <div class="engagement-icon" :class="{ 'eco-mode-icon': ecoMode }">
                  <i :class="t(`engagements.item${i}.iconClass`)"></i>
                </div>
                <h3>{{ t(`engagements.item${i}.title`) }}</h3>
                <p>{{ t(`engagements.item${i}.description`) }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="content-section contact-section">
          <div class="container">
            <div class="section-content layout-split reverse">
              <div class="text-content">
                <h2>{{ t('contact.title') }}</h2>
                <div class="contact-items">
                  <div class="contact-item">
                    <h3><i class="fas fa-envelope"></i> {{ t('contact.email') }}</h3>
                    <p><a href="mailto:project-nowlight@ec-lyon.fr">project-nowlight@ec-lyon.fr</a></p>
                  </div>
                  <div class="contact-item">
                    <h3><i class="fas fa-phone"></i> {{ t('contact.phone') }}</h3>
                    <p>07 83 79 64 92</p>
                  </div>
                  <div class="contact-item">
                    <h3><i class="fas fa-map-marker-alt"></i> {{ t('contact.address') }}</h3>
                    <p>36 Av. Guy de Collongue, 69130 Écully</p>
                  </div>
                </div>
              </div>
              <!-- Formulaire de contact temporairement désactivé -->
              <!-- 
              <div class="media-content">
                <div class="contact-form">
                  <h3>{{ t('contact.formTitle') }}</h3>
                  <form @submit.prevent="submitForm">
                    <div class="form-group">
                      <label for="name">{{ t('contact.form.name') }}</label>
                      <input type="text" id="name" v-model="contactForm.name" required>
                    </div>
                    <div class="form-group">
                      <label for="email">{{ t('contact.form.email') }}</label>
                      <input type="email" id="email" v-model="contactForm.email" required>
                    </div>
                    <div class="form-group">
                      <label for="message">{{ t('contact.form.message') }}</label>
                      <textarea id="message" v-model="contactForm.message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">{{ t('contact.form.submit') }}</button>
                    <p v-if="formMessage" class="form-message" :class="{ 'success': formSuccess, 'error': !formSuccess }">{{ formMessage }}</p>
                  </form>
                </div>
              </div>
              -->
            </div>
            <!-- Reference local image -->
            <div class="campus-image-container" v-if="!ecoMode">
              <img src="@/assets/images/contact-campus.jpg" alt="Campus de Centrale Lyon">
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-logo">NowLight</div>
            <nav class="footer-nav">
              <a href="#ambition" @click.prevent="scrollToSection('ambition')">{{ t('nav.ambition') }}</a>
              <a href="#conception" @click.prevent="scrollToSection('conception')">{{ t('nav.conception') }}</a>
              <a href="#engagements" @click.prevent="scrollToSection('engagements')">{{ t('nav.engagements') }}</a>
              <a href="#contact" @click.prevent="scrollToSection('contact')">{{ t('nav.contact') }}</a>
            </nav>

            <!-- Réseaux sociaux désactivés dans le footer pour l'instant -->
            
            <!-- 
            <div class="footer-social">
              <a href="#" class="social-icon" :aria-label="t('contact.email')"><i :class="t('footer.social.facebook')"></i></a>
              <a href="#" class="social-icon" :aria-label="t('contact.email')"><i :class="t('footer.social.twitter')"></i></a>
              <a href="#" class="social-icon" :aria-label="t('contact.email')"><i :class="t('footer.social.instagram')"></i></a>
              <a href="#" class="social-icon" :aria-label="t('contact.email')"><i :class="t('footer.social.linkedin')"></i></a>
            </div>
            -->


          </div>
          <div class="footer-bottom">
            <p>© {{ new Date().getFullYear() }} NowLight. {{ t('footer.rights') }}</p>
          </div>
        </div>
      </footer>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import ConceptionSection from './components/ConceptionSection.vue';

// --- Composables ---
const { t, locale, tm } = useI18n();

// --- State ---
const showLanguageSelection = ref(false);
const showLanguageDropdown = ref(false);
const scrolled = ref(false);
const ecoMode = ref(false);
const mobileMenuOpen = ref(false);
// Variables du formulaire de contact temporairement désactivées
// const contactForm = ref({ name: '', email: '', message: '' });
// const formMessage = ref('');
// const formSuccess = ref(false);

// --- Methods ---
const selectLanguage = (lang) => {
  if (lang === locale.value && !showLanguageSelection.value) return;
  locale.value = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  showLanguageSelection.value = false;
  showLanguageDropdown.value = false;
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false;
  }
};

const selectLanguageMobile = (lang) => {
  selectLanguage(lang);
};

const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value;
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 100;
};

const toggleEcoMode = () => {
  ecoMode.value = !ecoMode.value;
  localStorage.setItem('ecoMode', ecoMode.value.toString());
};

const toggleEcoModeMobile = () => {
  toggleEcoMode();
  mobileMenuOpen.value = false;
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  document.body.classList.toggle('no-scroll', mobileMenuOpen.value);
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = scrolled.value ? document.querySelector('.header')?.offsetHeight || 60 : 0;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
  showLanguageDropdown.value = false;
};

const scrollToSectionMobile = (sectionId) => {
  scrollToSection(sectionId);
  setTimeout(() => { mobileMenuOpen.value = false; }, 150);
};

// Fonction de soumission du formulaire temporairement désactivée
/*
const submitForm = () => {
  console.log('Form submitted:', contactForm.value);
  formSuccess.value = true;
  formMessage.value = t('contact.form.success');
  setTimeout(() => {
    contactForm.value = { name: '', email: '', message: '' };
    formMessage.value = '';
  }, 3000);
};
*/

const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.language-dropdown');
  if (dropdown && !dropdown.contains(event.target)) {
    showLanguageDropdown.value = false;
  }
};

// --- Lifecycle Hooks ---
onMounted(() => {
  const savedLanguage = localStorage.getItem('language');
  if (!savedLanguage) {
    showLanguageSelection.value = true;
  } else {
    if (locale.value !== savedLanguage) {
      locale.value = savedLanguage;
    }
    showLanguageSelection.value = false;
  }

  const savedEcoMode = localStorage.getItem('ecoMode');
  if (savedEcoMode === 'true') {
    ecoMode.value = true;
  }

  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
  document.body.classList.remove('no-scroll');
  document.body.style.overflow = '';
});
</script>

<style>
/* Import Font Awesome if needed */
/* @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'); */

/* --- Base Styles --- */
:root {
  --primary-color: #0a0a0a;
  --secondary-color: #f8f8f8;
  --accent-color: #FF8C00;
  --text-color: #333;
  --text-light: #666;
  --text-white: #ffffff;
  --border-color: #ddd;
  --heading-font: 'Poppins', sans-serif;
  --body-font: 'Lato', sans-serif;
  --transition-speed: 0.3s;
  --box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  --header-height: 70px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: var(--body-font); line-height: 1.7; color: var(--text-color);
  background-color: var(--secondary-color); overflow-x: hidden;
  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
}
body.no-scroll { overflow: hidden; }
.container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 25px; }
h2, h3, h4, h5, h6 {
  font-family: var(--heading-font); font-weight: 700; line-height: 1.3;
  color: var(--primary-color); margin-bottom: 1rem;
}
h2 { font-size: 2.2rem; }
h3 { font-size: 1.5rem; }
p { margin-bottom: 1.2rem; color: var(--text-light); }
a { text-decoration: none; color: var(--accent-color); transition: color var(--transition-speed); }
a:hover { color: darkorange; }
button { cursor: pointer; border: none; outline: none; background: none; font-family: inherit; transition: background-color var(--transition-speed), color var(--transition-speed), transform var(--transition-speed); }
img, iframe { max-width: 100%; height: auto; display: block; }

/* --- Utility Classes --- */
.content-section { padding: 80px 0; border-bottom: 1px solid var(--border-color); }
.content-section:last-of-type { border-bottom: none; }
.section-content { display: flex; flex-direction: column; gap: 40px; }
.layout-split { display: grid; grid-template-columns: 1fr; gap: 50px; align-items: center; }
.layout-split.reverse .text-content { order: 2; }
.layout-split.reverse .media-content { order: 1; }
@media (min-width: 768px) {
  .layout-split { grid-template-columns: 1fr 1fr; }
  .layout-split.reverse .text-content { order: initial; }
  .layout-split.reverse .media-content { order: initial; }
}
.text-content h2::after, .contact-info h2::after { content: ''; display: block; width: 70px; height: 4px; background-color: var(--accent-color); margin-top: 15px; margin-bottom: 25px; }

/* --- Loading/Language Selection --- */
.language-selection { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background-color: var(--primary-color); display: flex; justify-content: center; align-items: center; z-index: 2000; animation: fadeIn 0.5s ease-out; }
.language-container { text-align: center; }
.logo-text { color: var(--text-white); font-size: clamp(3rem, 10vw, 5rem); margin-bottom: 1rem; animation: fadeInUp 0.6s ease-out 0.2s backwards; }
.language-container h2 { color: var(--text-light); margin-bottom: 2rem; font-size: 1.1rem; animation: fadeInUp 0.6s ease-out 0.4s backwards; }
.language-buttons { display: flex; gap: 20px; justify-content: center; animation: fadeInUp 0.6s ease-out 0.6s backwards;}
.btn-language { padding: 12px 35px; font-size: 1.1rem; border-radius: 30px; font-weight: 600; }
.btn-fr { background-color: var(--text-white); color: var(--primary-color); }
.btn-en { background-color: transparent; color: var(--text-white); border: 2px solid var(--text-white); }
.btn-language:hover { transform: translateY(-3px); box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); }

/* --- Header --- */
.header { position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; height: var(--header-height); background-color: transparent; transition: background-color var(--transition-speed), box-shadow var(--transition-speed), transform var(--transition-speed); transform: translateY(-100%); display: flex; align-items: center; }
.header-scrolled { background-color: rgba(10, 10, 10, 0.95); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15); transform: translateY(0%); }
.header-container { display: flex; justify-content: space-between; align-items: center; }
.header .logo { font-size: 1.8rem; font-weight: 700; color: var(--text-white); }
.nav-links ul { display: flex; list-style: none; gap: 35px; }
.nav-links a { color: var(--text-white); font-weight: 500; position: relative; padding-bottom: 5px; }
.nav-links a::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: var(--accent-color); transition: width var(--transition-speed); }
.nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
.language-dropdown { position: relative; }
.language-btn { color: var(--text-white); display: flex; align-items: center; gap: 5px; font-weight: 500; padding: 5px; }
.dropdown-icon { font-size: 0.8rem; transition: transform var(--transition-speed); display: inline-block;}
.dropdown-icon.open { transform: rotate(180deg); }
.dropdown-content { position: absolute; top: calc(100% + 10px); right: 0; background-color: white; min-width: 120px; box-shadow: var(--box-shadow); border-radius: 5px; overflow: hidden; z-index: 1; opacity: 0; visibility: hidden; transform: translateY(10px); transition: opacity var(--transition-speed), transform var(--transition-speed), visibility var(--transition-speed); }
.language-dropdown:hover .dropdown-content, .language-dropdown .dropdown-content:hover, .language-btn:focus + .dropdown-content { opacity: 1; visibility: visible; transform: translateY(0); }
.dropdown-content a { color: var(--text-color); padding: 12px 18px; display: block; text-align: left; font-size: 0.95rem; }
.dropdown-content a:hover { background-color: #f5f5f5; color: var(--accent-color); }

/* --- Mobile Menu --- */
.mobile-menu-btn { display: none; }
.mobile-menu { display: none; }
.mobile-menu-overlay { display: none; }

/* --- Hero Section --- */
.hero-section {
  height: 100vh; min-height: 600px;
  background-color: var(--primary-color);
  /* Reference image from assets */
  background-image: url('@/assets/images/hero-background.jpg');
  background-size: cover; background-position: center center; background-attachment: fixed;
  position: relative; display: flex; flex-direction: column; justify-content: center; align-items: center;
  color: var(--text-white); text-align: center; overflow: hidden;
}
.eco-mode .hero-section { background-image: none; background-color: #222; }
.hero-section::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)); z-index: 1; }
.eco-mode .hero-section::before { background: none; }
.hero-top-elements { position: absolute; top: 0; left: 0; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 30px clamp(20px, 5vw, 50px); z-index: 3; }
.hero-logo { font-size: 1.8rem; font-weight: 700; color: var(--text-white); }
.hero-content { position: relative; z-index: 2; padding: 20px; }
.subtitle { font-size: clamp(1rem, 3vw, 1.3rem); letter-spacing: 4px; margin-bottom: 15px; opacity: 0; animation: fadeInUp 0.8s ease-out 0.5s forwards; color: rgba(255, 255, 255, 0.8); }
.title { font-size: clamp(3.5rem, 10vw, 6rem); letter-spacing: 5px; margin-bottom: 30px; opacity: 0; animation: fadeInUp 0.8s ease-out 0.7s forwards; font-weight: 800; }
.eco-btn { background-color: rgba(0, 0, 0, 0.6); color: var(--text-white); padding: 10px 20px; border-radius: 30px; font-size: 0.9rem; border: 1px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; gap: 8px; }
.eco-btn i { font-size: 0.9em; }
.eco-btn:hover { background-color: rgba(0, 0, 0, 0.8); }
.scroll-indicator { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); z-index: 2; opacity: 0; animation: fadeIn 1s ease-in-out 1.5s forwards; text-align: center; }
.scroll-indicator span { display: block; font-size: 0.9rem; margin-bottom: 15px; }
.arrow-down { width: 28px; height: 28px; border: 2px solid var(--text-white); border-width: 0 2px 2px 0; transform: rotate(45deg); margin: 0 auto; animation: bounce 2.5s infinite ease-in-out; }
.scroll-indicator a { color: inherit; text-decoration: none; }

/* --- Ambition Section --- */
.ambition-section { background-color: var(--secondary-color); }
.image-container { 
  border-radius: 10px; 
  overflow: hidden; 
  box-shadow: var(--box-shadow); 
  background-color: #e0e0e0; 
}
.ambition-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
  transition: transform var(--transition-speed);
}
.ambition-image:hover {
  transform: scale(1.02);
}
.eco-mode .image-container { 
  display: none; 
}
.eco-placeholder-media { border: 2px dashed var(--border-color); padding: 40px; text-align: center; color: var(--text-light); border-radius: 10px; height: 100%; display: flex; align-items: center; justify-content: center; min-height: 250px; }

/* --- Engagements Section --- */
.engagements-section { background-color: var(--primary-color); color: var(--text-white); text-align: center; }
.engagements-section h2 { color: var(--text-white); }
.engagements-section h2::after { background-color: var(--accent-color); margin-left: auto; margin-right: auto; }
.engagements-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; margin-top: 60px; }
.engagement-item { padding: 20px; transition: transform var(--transition-speed); }
.engagement-item:hover { transform: translateY(-8px); }
.engagement-icon { width: 75px; height: 75px; margin: 0 auto 25px; background-color: var(--accent-color); border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 2.2rem; color: var(--text-white); }
.eco-mode-icon { background-color: #444; color: #bbb; }
.engagement-item h3 { margin-bottom: 15px; font-size: 1.3rem; color: var(--text-white); }
.engagement-item p { color: rgba(255, 255, 255, 0.8); }


/* --- Contact Section --- */
.contact-section { background-color: var(--secondary-color); }
.contact-section .layout-split { align-items: flex-start; }
.contact-item { margin-bottom: 25px; display: flex; align-items: flex-start; gap: 15px; }
.contact-item i { color: var(--accent-color); font-size: 1.3rem; margin-top: 4px; width: 20px; text-align: center;}
.contact-item h3 { font-size: 1rem; margin-bottom: 5px; color: var(--primary-color); font-weight: 600; }
.contact-item p { margin-bottom: 0; color: var(--text-light); }
.contact-item a { color: var(--text-light); }
.contact-item a:hover { color: var(--accent-color); text-decoration: underline; }
.contact-form { background-color: white; padding: 30px; border-radius: 8px; box-shadow: var(--box-shadow); }
.contact-form h3 { font-size: 1.4rem; margin-bottom: 25px; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 8px; font-size: 0.9rem; font-weight: 600; }
.form-group input, .form-group textarea { width: 100%; padding: 14px; border: 1px solid var(--border-color); border-radius: 5px; font-family: inherit; font-size: 1rem; transition: border-color var(--transition-speed); }
.form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--accent-color); box-shadow: 0 0 0 2px rgba(255, 140, 0, 0.2); }
.form-group textarea { resize: vertical; min-height: 120px; }
.submit-btn { background-color: var(--accent-color); color: white; padding: 14px 35px; border-radius: 30px; font-size: 1rem; font-weight: 600; display: inline-block; }
.submit-btn:hover { background-color: darkorange; transform: translateY(-2px); }
.form-message { margin-top: 15px; font-size: 0.95rem; }
.form-message.success { color: green; }
.form-message.error { color: red; }
.campus-image-container { margin-top: 50px; border-radius: 10px; overflow: hidden; box-shadow: var(--box-shadow); }
.eco-mode .campus-image-container { display: none; }

/* --- Footer --- */
.footer { background-color: #1a1a1a; color: rgba(255, 255, 255, 0.7); padding: 60px 0 30px; }
.footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; margin-bottom: 40px; align-items: start; }
.footer-logo { font-size: 1.8rem; font-weight: 700; color: var(--text-white); }
.footer-nav { display: flex; flex-direction: column; gap: 10px; }
.footer-nav a { color: rgba(255, 255, 255, 0.7); font-size: 0.95rem; }
.footer-nav a:hover { color: var(--accent-color); }
.footer-social { display: flex; gap: 15px; justify-content: flex-start; }
.social-icon { width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; display: flex; justify-content: center; align-items: center; color: var(--text-white); font-size: 1.1rem; }
.social-icon:hover { background-color: var(--accent-color); color: var(--text-white); }
.footer-bottom { border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 30px; text-align: center; font-size: 0.9rem; color: rgba(255, 255, 255, 0.6); }

/* --- Animations --- */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(25px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bounce { 0%, 100% { transform: translateY(0) rotate(45deg); } 50% { transform: translateY(-10px) rotate(45deg) ; } }

/* --- Responsive Styles --- */
@media (max-width: 992px) {
  :root { --header-height: 60px; }
  .nav-links { display: none; }
  .mobile-menu-btn { display: flex; flex-direction: column; justify-content: space-around; width: 28px; height: 22px; z-index: 1101; position: relative; }
  .mobile-menu-btn span { width: 100%; height: 3px; background-color: var(--text-white); border-radius: 1px; transition: transform 0.3s ease, opacity 0.3s ease; }
  .mobile-menu-btn.active span:nth-child(1) { transform: translateY(9.5px) rotate(45deg); }
  .mobile-menu-btn.active span:nth-child(2) { opacity: 0; }
  .mobile-menu-btn.active span:nth-child(3) { transform: translateY(-9.5px) rotate(-45deg); }
  .mobile-menu { display: block; position: fixed; top: 0; right: -100%; width: 85%; max-width: 320px; height: 100vh; background-color: var(--primary-color); z-index: 1099; padding: 80px 30px 40px 30px; overflow-y: auto; transition: right 0.4s cubic-bezier(0.23, 1, 0.32, 1); box-shadow: -5px 0 15px rgba(0,0,0,0.2); }
  .mobile-menu.active { right: 0; }
  .mobile-menu-overlay { display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 1098; opacity: 0; visibility: hidden; transition: opacity 0.4s, visibility 0.4s; }
  .app.menu-open .mobile-menu-overlay { opacity: 1; visibility: visible; }
  .mobile-menu ul { list-style: none; padding: 0; margin: 0; }
  .mobile-menu li { margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1);}
  .mobile-menu li:last-child { border-bottom: none; }
  .mobile-menu a, .mobile-menu button { color: var(--text-white); font-size: 1.2rem; display: block; padding: 12px 0; font-weight: 500; text-align: left; width: 100%; }
  .mobile-close-btn { position: absolute; top: 15px; right: 15px; font-size: 2rem; color: var(--text-white); padding: 5px; line-height: 1; }
  .mobile-language-selector { display: flex; align-items: center; gap: 10px; padding: 12px 0; }
  .mobile-language-selector button { font-size: 1rem; padding: 5px 10px; border-radius: 4px; border: 1px solid transparent; background: none;}
  .mobile-language-selector button.active { border-color: var(--accent-color); color: var(--accent-color); }
  .mobile-language-selector span { color: rgba(255,255,255,0.4); }
  .mobile-eco-btn { display: flex; align-items: center; gap: 10px; font-size: 1rem; }
  .mobile-eco-btn i { font-size: 1.1em; }
  .engagements-grid { grid-template-columns: 1fr; }
  .footer-content { text-align: center; }
  .footer-social { justify-content: center; }
  .footer-nav { align-items: center; }
}
@media (max-width: 767px) {
  .layout-split { grid-template-columns: 1fr; }
  .layout-split.reverse .text-content, .layout-split.reverse .media-content { order: initial; }
  .popup-image { height: 250px; }
  .popup-text { padding: 25px; }
  .popup-text h3 { font-size: 1.5rem; }
}
@media (max-width: 576px) {
  .title { font-size: 2.8rem; }
  .subtitle { font-size: 0.9rem; letter-spacing: 3px; }
  .language-buttons { flex-direction: column; gap: 15px; }
  .btn-language { width: 100%; }
  .hero-logo { font-size: 1.5rem; }
  .eco-btn { font-size: 0.8rem; padding: 8px 15px; }
  .footer-content { gap: 30px; }
  .footer-logo { margin-bottom: 10px; }
}

/* --- Eco Mode Specific Styles --- */
.eco-mode { --transition-speed: 0s !important; }
.eco-mode * { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; }
.eco-mode .hero-section, .eco-mode .ambition-section, .eco-mode .conception-section, .eco-mode .engagements-section, .eco-mode .contact-section { animation: none !important; background-attachment: scroll !important; }
.eco-mode .subtitle, .eco-mode .title, .eco-mode .scroll-indicator { opacity: 1 !important; animation: none !important; }
.eco-mode .arrow-down { animation: none !important; }
.eco-mode .video-container, .eco-mode .campus-image-container { display: none; }
.eco-mode .module-image { background-image: none !important; border: 1px dashed var(--border-color); }
.eco-mode .engagement-icon { background-color: #555; color: #ccc; }
.eco-mode .eco-placeholder-media { display: flex; }
</style>