<template>
  <section id="conception" class="content-section conception-section">
    <div class="container">
      <h2>{{ t('conception.title') }}</h2>
      <p class="section-description">{{ t('conception.description') }}</p>
      <div class="conception-layout">
        <div v-for="section in sections" :key="section.titleKey" class="conception-subsection">
          <h3 class="subsection-title">{{ t(section.titleKey) }}</h3>

          <div class="modules-grid" :class="{ 
            'two-items': section.moduleKeys.length === 2,
            'four-items': section.moduleKeys.length === 4
          }">
            <template v-for="moduleKey in section.moduleKeys" :key="moduleKey">

              <!-- Video Module -->
              <div v-if="modulesData[moduleKey]?.type === 'video'" class="module-item">
                <div class="video-container" v-if="!ecoMode">
                  <iframe
                      :src="`https://www.youtube.com/embed/${modulesData[moduleKey].videoId}?si=qiAr-S-BpzndE4jw`"
                      :title="t(`modules.${moduleKey}.title`)"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                  ></iframe>
                </div>
                <div class="module-image eco-placeholder-video" v-else>
                  <div class="eco-placeholder-content">
                    <i class="fas fa-video-slash"></i>
                    <span>Video Disabled</span>
                  </div>
                </div>
                <h3 class="module-title">{{ t(`modules.${moduleKey}.title`) }}</h3>
              </div>

              <!-- Clickable Module -->
              <div
                  v-else
                  class="module-item clickable"
                  @click="openModule(moduleKey)"
                  @keydown.enter="openModule(moduleKey)"
                  tabindex="0"
                  role="button"
                  :aria-label="t('conception.openDetails', { moduleName: t(`modules.${moduleKey}.title`) })"
              >
                <div class="module-image">
                  <img 
                    v-if="!ecoMode && getFirstModuleImage(moduleKey)" 
                    :src="getFirstModuleImage(moduleKey)" 
                    :alt="t(`modules.${moduleKey}.title`)"
                    class="module-preview-image"
                  />
                  <span v-else class="eco-placeholder-module-index">+</span>
                </div>
                <h3 class="module-title">{{ t(`modules.${moduleKey}.title`) }}</h3>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Module Popup -->
    <div v-if="selectedModuleKey" class="module-popup is-open" @click.self="closeModule">
      <div class="popup-content" role="dialog" aria-modal="true" :aria-labelledby="'popup-title-' + selectedModuleKey">
        <button @click="closeModule" class="close-btn" aria-label="Close module details">×</button>
        
        <!-- Images Gallery -->
        <div class="popup-images">
          <div v-if="!ecoMode && getModuleImages(selectedModuleKey).length > 0" class="image-gallery">
            <div 
              v-for="(imageUrl, index) in getModuleImages(selectedModuleKey)" 
              :key="index"
              class="gallery-image-container"
            >
              <img 
                :src="imageUrl" 
                :alt="`Image ${index + 1} of ${getModuleImages(selectedModuleKey).length}`"
                class="gallery-image"
                @click="openImageModal(imageUrl)"
                tabindex="0"
                @keydown.enter="openImageModal(imageUrl)"
              />
              <div class="image-number">{{ index + 1 }}</div>
            </div>
          </div>
          
          <!-- Eco Mode Placeholder -->
          <div v-else class="eco-placeholder-images">
            <span class="eco-placeholder-module-index">{{ Object.keys(modulesData).indexOf(selectedModuleKey) + 1 }}</span>
            <div class="eco-placeholder-text">
              {{ getModuleImages(selectedModuleKey).length }} Image{{ getModuleImages(selectedModuleKey).length > 1 ? 's' : '' }} Disabled
            </div>
          </div>
        </div>

        <div class="popup-text">
          <h3 :id="'popup-title-' + selectedModuleKey">{{ t(`modules.${selectedModuleKey}.title`) }}</h3>
          <div class="module-description">
            <p v-for="(paragraph, index) in getFormattedDescription(selectedModuleKey)" :key="index" v-html="paragraph"></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="selectedImage" class="image-modal" @click="closeImageModal">
      <div class="modal-content" @click.stop>
        <button @click="closeImageModal" class="modal-close-btn" aria-label="Close image">×</button>
        <img :src="selectedImage" alt="Image agrandie" class="modal-image" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  ecoMode: {
    type: Boolean,
    default: false
  }
});

const { t, tm } = useI18n();
const selectedModuleKey = ref(null);
const selectedImage = ref(null);

// Structure of the conception section
const sections = ref([
  {
    titleKey: 'conception.prototypeInitialTitle',
    moduleKeys: ['initialVideo', 'initialElectric', 'manufacturing', 'initialMecanic']
  },
  {
    titleKey: 'conception.prototypeFinalTitle',
    moduleKeys: ['finalElectric', 'generationSystem']
  },
  {
    titleKey: 'conception.prototypeOptimiseTitle',
    moduleKeys: ['optimizedElectric', 'optimizedMecanic']
  }
]);

// All module data from i18n files
const modulesData = computed(() => {
  const modulesObject = tm('modules');
  return typeof modulesObject === 'object' && modulesObject !== null
      ? modulesObject
      : {};
});

// Format description text into paragraphs with image link support
const getFormattedDescription = (moduleKey) => {
  if (!moduleKey) return [];
  
  const description = t(`modules.${moduleKey}.description`);
  
  if (!description) return [];
  
  // Split by double line breaks for paragraphs, or single line breaks as fallback
  let paragraphs = description.split(/\n\s*\n/);
  
  // If no double line breaks found, split by single line breaks
  if (paragraphs.length === 1) {
    paragraphs = description.split(/\n/);
  }
  
  // Clean up paragraphs: remove empty ones and trim whitespace
  return paragraphs
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => {
      let formatted = p;
      
      // Convert headers (## Title -> <h4>Title</h4>)
      formatted = formatted.replace(/^### (.*$)/gm, '<h5 class="sub-sub-heading">$1</h5>');
      formatted = formatted.replace(/^## (.*$)/gm, '<h4 class="sub-heading">$1</h4>');
      
      // Convert bold text (**text** -> <strong>text</strong>)
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Convert italic text (*text* -> <em>text</em>)
      formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      // Convert code text (`text` -> <code>text</code>)
      formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');
      
      // Convert bullet points (• item -> <li>item</li>)
      if (formatted.includes('•')) {
        const lines = formatted.split('\n');
        let inList = false;
        let result = [];
        
        for (let line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('•')) {
            if (!inList) {
              result.push('<ul class="bullet-list">');
              inList = true;
            }
            result.push(`<li>${trimmedLine.substring(1).trim()}</li>`);
          } else if (trimmedLine === '' && inList) {
            result.push('</ul>');
            inList = false;
            result.push('');
          } else {
            if (inList) {
              result.push('</ul>');
              inList = false;
            }
            result.push(line);
          }
        }
        
        if (inList) {
          result.push('</ul>');
        }
        
        formatted = result.join('\n');
      }
      
      // Process image links with syntax: [Img:2, Txt:"Image 2"]
      formatted = formatted.replace(/\[Img:(\d+),\s*Txt:"([^"]+)"\]/g, (match, imageIndex, linkText) => {
        const imgIndex = parseInt(imageIndex) - 1; // Convert to 0-based index
        const moduleImages = getModuleImages(moduleKey);
        
        if (imgIndex >= 0 && imgIndex < moduleImages.length) {
          const imageUrl = moduleImages[imgIndex];
          return `<span class="image-link" data-image-url="${imageUrl}" onclick="openImageFromDescription('${imageUrl}')">${linkText}</span>`;
        }
        
        // If image index is invalid, return just the text without link
        return linkText;
      });
      
      return formatted;
    });
};

// Get multiple images for a module (supports both single image and array of images with subdirectories)
const getModuleImages = (key) => {
  if (!key) return [];
  
  const moduleData = modulesData.value[key];
  
  // Check if images array is defined in i18n data
  if (moduleData?.images && Array.isArray(moduleData.images)) {
    return moduleData.images.map(imagePath => {
      try {
        // Support both direct filename and subdirectory/filename format
        // The imagePath can be either:
        // - "module-initialElectric-1.jpg" (direct in images folder)
        // - "initialElectric/module-initialElectric-1.jpg" (in subdirectory)
        return new URL(`../assets/images/${imagePath}`, import.meta.url).href;
      } catch (error) {
        console.error(`Error resolving image URL for "${imagePath}":`, error);
        return null;
      }
    }).filter(Boolean);
  } else {
    // Fallback to single image system
    const singleImage = getModuleImageUrl(key);
    return singleImage ? [singleImage] : [];
  }
};

// Get first image for module preview (backward compatibility)
const getFirstModuleImage = (key) => {
  const images = getModuleImages(key);
  return images.length > 0 ? images[0] : null;
};

// Original single image function (kept for backward compatibility)
const getModuleImageUrl = (key) => {
  if (!key) {
    console.warn("getModuleImageUrl called with null or empty key");
    return null;
  }

  const imageMapping = {
    'initialElectric': 'module-initialElectric.jpg',
    'finalElectric': 'module-finalElectric.jpg',
    'initialMecanic': 'module-initialMecanic.jpg',
    'optimizedMecanic': 'module-optimizedMecanic.jpg',
    'generationSystem': 'module-generationSystem.jpg',
    'manufacturing': 'module-manufacturing.jpg',
    'performanceTests': 'module-performanceTests.jpg',
    'optimizedElectric': 'module-optimizedElectric.jpg',
    'finalMecanic': 'module-finalMecanic.jpg',
  };

  try {
    const imageName = imageMapping[key] || `module-${key}.jpg`;
    const imageUrl = new URL(`../assets/images/${imageName}`, import.meta.url).href;
    return imageUrl;
  } catch (error) {
    console.error(`Error resolving image URL for key "${key}":`, error);
    return null;
  }
};

const openModule = (key) => {
  selectedModuleKey.value = key;
  document.body.style.overflow = 'hidden';
  
  // Set up global function for image links in descriptions
  window.openImageFromDescription = (imageUrl) => {
    openImageModal(imageUrl);
  };
};

const closeModule = () => {
  selectedModuleKey.value = null;
  document.body.style.overflow = '';
  
  // Clean up global function
  if (window.openImageFromDescription) {
    delete window.openImageFromDescription;
  }
};

const openImageModal = (imageUrl) => {
  selectedImage.value = imageUrl;
};

const closeImageModal = () => {
  selectedImage.value = null;
};
</script>

<style scoped>
.conception-section {
  background-color: var(--secondary-color);
}
.conception-section h2 {
  text-align: center;
}
.conception-section h2::after {
  content: '';
  display: block;
  width: 70px;
  height: 4px;
  background-color: var(--accent-color);
  margin-top: 15px;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;
}
.section-description {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 40px auto;
  color: var(--text-light);
}

.conception-layout {
  margin-top: 40px;
}
.conception-subsection {
  margin-bottom: 70px;
}
.conception-subsection:last-child {
  margin-bottom: 0;
}
.subsection-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
  font-weight: 600;
  color: var(--primary-color);
  position: relative;
}
.subsection-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background-color: var(--accent-color);
  margin: 12px auto 0;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

/* Centrage spécial pour les grilles avec exactement 2 éléments */
.modules-grid.two-items {
  grid-template-columns: repeat(2, minmax(280px, 400px));
  justify-content: center;
}

/* Nouvelle classe pour l'affichage optimisé des 4 modules */
.modules-grid.four-items {
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  max-width: 900px;
  margin: 0 auto;
  gap: 25px;
}

.module-item {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-speed) ease;
}

/* Modules dans la grille 4-items plus compacts et élégants */
.modules-grid.four-items .module-item {
  min-height: 280px;
}

.module-item.clickable {
  cursor: pointer;
  transition: transform var(--transition-speed), box-shadow var(--transition-speed);
}

.module-item.clickable:hover, .module-item.clickable:focus {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Images des modules - Style amélioré */
.module-image {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Style spécifique pour les 4 modules */
.modules-grid.four-items .module-image {
  height: 160px;
}

.module-preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.module-item.clickable:hover .module-preview-image {
  transform: scale(1.05);
}

.eco-placeholder-module-index {
  font-size: 2.5rem;
  color: var(--text-light);
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.video-container {
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  position: relative;
  background-color: #000;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.module-image.eco-placeholder-video {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.eco-placeholder-video .eco-placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: white;
}
.eco-placeholder-video .eco-placeholder-content i {
  font-size: 2.5rem;
}

.module-title {
  padding: 20px;
  font-size: 1.1rem;
  text-align: center;
  margin: 0;
  font-weight: 600;
  color: var(--primary-color);
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.3;
}

/* Style spécifique pour les titres dans la grille 4-items */
.modules-grid.four-items .module-title {
  padding: 15px;
  font-size: 1rem;
}

/* Module Popup */
.module-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition-speed), visibility var(--transition-speed);
}
.module-popup.is-open {
  opacity: 1;
  visibility: visible;
}
.popup-content {
  background-color: white;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  transform: scale(0.95);
  transition: transform var(--transition-speed) ease-out;
  position: relative;
}
.module-popup.is-open .popup-content {
  transform: scale(1);
}
.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 2rem;
  line-height: 1;
  color: #aaa;
  z-index: 1;
  background: none;
  padding: 5px;
  border: none;
  cursor: pointer;
}
.close-btn:hover {
  color: var(--primary-color);
}

/* Images Gallery */
.popup-images {
  width: 100%;
  flex-shrink: 0;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  padding: 20px;
}

.gallery-image-container {
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: 8px;
  background-color: #e0e0e0;
  position: relative;
}

.image-number {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  min-width: 24px;
  text-align: center;
  line-height: 1.2;
  z-index: 1;
  transition: opacity 0.3s ease;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: block;
}

.gallery-image:hover, .gallery-image:focus {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

.eco-placeholder-images {
  height: 300px;
  background-color: #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--text-light);
}
.eco-placeholder-text {
  margin-top: 10px;
  font-style: italic;
}

.popup-text {
  padding: 30px 40px;
}
.popup-text h3 {
  margin-bottom: 15px;
  font-size: 1.8rem;
  color: var(--primary-color);
}

/* Styled description container for paragraphs */
.module-description {
  color: var(--text-light);
}

.module-description p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  text-align: justify;
}

.module-description p:last-child {
  margin-bottom: 0;
}

/* Styling for formatted text within paragraphs */
.module-description strong {
  color: var(--primary-color);
  font-weight: 600;
}

.module-description em {
  font-style: italic;
  color: var(--accent-color);
}

.module-description code {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--primary-color);
}

/* Style for clickable image links in descriptions */
.module-description :deep(.image-link) {
  color: var(--accent-color);
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.3s ease;
}

.module-description :deep(.image-link:hover) {
  color: var(--primary-color);
  text-decoration: none;
}

/* Image Modal */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
  backdrop-filter: blur(5px);
  padding: 60px 20px 20px 20px;
}

.modal-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.modal-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2.5rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1;
}
.modal-close-btn:hover {
  color: var(--accent-color);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .modules-grid.four-items {
    max-width: 700px;
    gap: 20px;
  }
}

@media (max-width: 767px) {
  .modules-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  .modules-grid.two-items {
    grid-template-columns: 1fr;
    justify-content: center;
  }
  
  /* Pour mobile, les 4 modules s'affichent en une seule colonne */
  .modules-grid.four-items {
    grid-template-columns: 1fr;
    max-width: 400px;
    gap: 20px;
  }
  
  .modules-grid.four-items .module-image {
    height: 180px;
  }
  
  .image-gallery {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    padding: 15px;
  }
  .popup-text {
    padding: 25px;
  }
  .popup-text h3 {
    font-size: 1.5rem;
  }
  .modal-close-btn {
    top: 10px;
    right: 10px;
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .modules-grid {
    grid-template-columns: 1fr;
  }
  .modules-grid.two-items {
    grid-template-columns: 1fr;
  }
  .modules-grid.four-items {
    grid-template-columns: 1fr;
  }
}

/* Styles pour les sous-titres dans les descriptions */
.module-description :deep(.sub-heading) {
  color: var(--primary-color);
  font-size: 1.3rem;
  font-weight: 600;
  margin: 25px 0 15px 0;
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: 5px;
}

.module-description :deep(.sub-sub-heading) {
  color: var(--primary-color);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 20px 0 10px 0;
}

/* Styles pour les listes à puces */
.module-description :deep(.bullet-list) {
  margin: 15px 0;
  padding-left: 0;
  list-style: none;
}

.module-description :deep(.bullet-list li) {
  position: relative;
  padding: 5px 0 5px 25px;
  margin-bottom: 8px;
  line-height: 1.6;
}

.module-description :deep(.bullet-list li:before) {
  content: "•";
  color: var(--accent-color);
  font-size: 1.2em;
  font-weight: bold;
  position: absolute;
  left: 0;
  top: 5px;
}

/* Style pour les éléments importants dans les listes */
.module-description :deep(.bullet-list li strong) {
  color: var(--primary-color);
  font-weight: 600;
}

/* Amélioration de l'espacement des paragraphes avec les nouvelles structures */
.module-description :deep(h4 + p),
.module-description :deep(h5 + p) {
  margin-top: 10px;
}

.module-description :deep(p + h4),
.module-description :deep(p + h5) {
  margin-top: 25px;
}

/* Style pour les notes en italique */
.module-description :deep(em) {
  font-style: italic;
  color: #666;
  font-size: 0.95em;
}
</style>