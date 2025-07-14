# NowLight Website

Un site web moderne pour le projet NowLight, développé avec Vue.js 3, Tailwind CSS et Vite.

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes d'installation

```bash
# 1. Cloner le projet
git clone https://github.com/Kadzzzzz/nowlight-website.git
cd nowlight-website

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## 🏗️ Structure du projet

```
.
├── Dockerfile                          # Configuration Docker pour le déploiement
├── generate_project.py                 # Script de génération/setup du projet
├── index.html                          # Point d'entrée HTML principal
├── package.json                        # Dépendances et scripts npm
├── package-lock.json                   # Verrouillage des versions de dépendances
├── postcss.config.js                   # Configuration PostCSS pour Tailwind
├── public/                             # Fichiers statiques publics
│   ├── favicon-modern-2.ico           # Icône du site (version 2)
│   ├── favicon-modern.ico             # Icône du site principale
│   ├── robots.txt                     # Instructions pour les robots d'indexation
│   └── sitemap.xml                    # Plan du site pour le SEO
├── README.md                          # Documentation du projet
├── src/                               # Code source principal
│   ├── App.vue                        # Composant racine de l'application
│   ├── assets/                        # Ressources statiques
│   │   └── images/                    # Images du projet
│   │       ├── ambition-image.jpg     # Image de la section ambition
│   │       ├── contact-campus*.jpg    # Images du campus pour la section contact
│   │       ├── contact-image.*        # Images de la section contact
│   │       ├── hero-background.*      # Images de fond pour la section hero
│   │       ├── module-finalElectric-* # Images du module électronique final
│   │       ├── module-initialElectric-* # Images du module électronique initial
│   │       ├── module-initialMecanic-* # Images du module mécanique initial
│   │       └── module-optimizedMecanic-* # Images du module mécanique optimisé
│   ├── components/                    # Composants Vue réutilisables
│   │   ├── common/                    # Composants communs
│   │   │   ├── Footer.vue             # Pied de page
│   │   │   ├── ModuleCard.vue         # Carte d'affichage des modules
│   │   │   └── Navigation.vue         # Barre de navigation
│   │   ├── modals/                    # Composants modaux
│   │   │   └── ModuleModal.vue        # Modal d'affichage des détails de module
│   │   └── sections/                  # Sections de la page d'accueil
│   │       ├── AmbitionSection.vue    # Section "Notre ambition"
│   │       ├── ConceptionSection.vue  # Section "Conception" avec les modules
│   │       ├── ContactSection.vue     # Section "Contact"
│   │       ├── EngagementsSection.vue # Section "Nos engagements"
│   │       └── HeroSection.vue        # Section hero avec titre principal
│   ├── locales/                       # Fichiers de traduction
│   │   ├── en.json                    # Traductions anglaises
│   │   └── fr.json                    # Traductions françaises
│   ├── main.js                        # Point d'entrée JavaScript principal
│   ├── stores/                        # Stores Pinia pour la gestion d'état
│   │   └── language.js                # Store pour la gestion des langues
│   ├── style.css                      # Styles CSS globaux et Tailwind imports
│   └── views/                         # Vues/Pages principales
│       ├── Home.vue                   # Page d'accueil principale
│       └── LanguageSelection.vue      # Page de sélection de langue
├── tailwind.config.js                 # Configuration Tailwind CSS
└── vite.config.js                     # Configuration du bundler Vite
```

## 🔧 Technologies utilisées

- **Vue.js 3** - Framework JavaScript réactif
- **Vite** - Build tool et serveur de développement
- **Tailwind CSS** - Framework CSS utilitaire
- **Pinia** - Gestion d'état pour Vue
- **Vue Router** - Routage côté client
- **PostCSS** - Traitement CSS

## 🌐 Fonctionnalités

### ✅ Implémentées
- Interface multilingue (FR/EN) avec sélection au démarrage
- Design responsive et moderne
- Navigation fluide avec scroll smooth
- Section Hero avec toggle mode éco/standard
- Section Ambition avec animations
- Section Conception avec modules cliquables et détaillés
- Section Engagements avec icônes animées
- Section Contact avec informations complètes
- Modales interactives pour afficher les détails des modules
- Support vidéos YouTube intégrées
- Galerie d'images avec navigation et zoom
- Footer complet avec liens sociaux (LinkedIn, GitHub)
- Animations et effets visuels modernes

### 🎨 Design
- Palette de couleurs orange/noir moderne
- Effets de glassmorphism et backdrop-blur
- Animations CSS fluides
- Gradients et effets de lumière
- Design adaptatif selon les sections
- Micro-interactions sur hover

### 📱 Responsive
- Mobile First approach
- Breakpoints optimisés : mobile, tablet, desktop
- Navigation mobile avec menu hamburger
- Modales adaptées pour mobile
- Images et contenus adaptatifs

## 🛠️ Scripts disponibles

```bash
# Développement
npm run dev          # Serveur de développement avec hot-reload

# Production
npm run build        # Build optimisé pour production
npm run preview      # Prévisualiser le build de production

# Docker
docker build -t nowlight-website .
docker run -p 80:80 nowlight-website
```

## ✏️ Personnalisation du contenu

### Modifier les textes des modules
Les contenus des modules se trouvent dans les fichiers de traduction :

**Pour le français :** `src/locales/fr.json`
**Pour l'anglais :** `src/locales/en.json`

Structure dans le JSON :
```json
{
  "modules": {
    "initialElectric": {
      "title": "Électronique",
      "description": "Description avec syntaxe markdown...",
      "images": ["image1.jpg", "image2.png"]
    }
  }
}
```

Syntaxe supportée dans les descriptions :
- **Titres** : `## Mon Titre` ou `### Sous-titre`
- **Gras** : `**texte en gras**`
- **Listes** : `• Point de liste`
- **Références d'images cliquables** : `[Img:1, Txt:"Figure 1"]`
- **Liens** : `***https://mon-lien.com***`
- **Saut de ligne** : `\n\n`

### Ajouter des images
Placez vos images dans `src/assets/images/` et référencez-les dans les fichiers JSON avec leur nom exact.

### Modifier les informations de contact
Éditez les fichiers :
- `src/components/sections/ContactSection.vue`
- `src/components/common/Footer.vue`

## 🎯 Fonctionnalités avancées

### Mode Éco
- Désactive les animations coûteuses
- Remplace les images par des placeholders
- Optimise les performances

### Modules interactifs
- Navigation par images numérotées
- Références cliquables dans le texte
- Support vidéo YouTube intégré
- Zoom et navigation dans les galeries

### Internationalisation
- Commutation de langue en temps réel
- Persistance du choix de langue
- URLs et métadonnées adaptées

*Projet d'étude - NowLight 2025*
