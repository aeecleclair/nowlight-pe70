# README - Projet NowLight PE 76

## Présentation

Ce site permet de présenter notre projet de PE 76 sur la NowLight

## Technologies Utilisées 🛠️

* **Vue.js 3 (Composition API)** - Framework JavaScript pour l'interface utilisateur
* **Vite** - Outil de build et serveur de développement
* **Vue-i18n** - Gestion des traductions (FR/EN)
* **CSS** - Styles définis dans `App.vue`
* **Font Awesome** - Bibliothèque d'icônes

## Prérequis

* Node.js (v16+)
* npm ou yarn

## Installation 🚀

1. **Cloner le dépôt :**
   ```bash
   git clone <url-du-repo>
   cd <nom-du-dossier>
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Ouvrir votre navigateur à l'adresse indiquée (`http://localhost:5173/`)

## Production 📦

Pour compiler le projet pour la production :

```bash
npm run build
# ou
yarn build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

## Structure du Projet 📁

```
.
├── public/             # Fichiers statiques (favicon, index.html base)
├── src/
│   ├── assets/         # Ressources (images, styles globaux)
│   │   └── images/     # Images utilisées dans les composants
│   ├── locales/        # Fichiers de traduction JSON
│   │   ├── en.json     # Traductions anglaises
│   │   └── fr.json     # Traductions françaises
│   ├── App.vue         # Composant principal
│   ├── i18n.js         # Configuration de Vue-i18n
│   └── main.js         # Point d'entrée de l'application
├── .gitignore
├── index.html          # Template HTML principal
├── package.json        # Dépendances et scripts
└── README.md
```


### Gestion des Images

1. **Stockage** : Placez les nouvelles images dans `src/assets/images/`
2. **Convention de nommage** : Respectez le format `section-identifiant.jpg` (ex: `module-technicalDrawing.jpg`, `contact-campus.jpg`)
3. **Utilisation** :
   - Dans le template HTML :
     ```html
     <img src="@/assets/images/nom-image.jpg" alt="Description">
     ```
   - Dans le CSS :
     ```css
     background-image: url('@/assets/images/nom-image.jpg');
     ```
   - Images dynamiques : Le code utilise une fonction `getModuleImageUrl()` qui construit le chemin selon la clé du module

### Modification des Textes

1. Ouvrez les fichiers `src/locales/en.json` et `src/locales/fr.json`
2. Localisez la clé correspondant au texte à modifier (ex: `nav.ambition`, `contact.form.submit`)
3. Modifiez la valeur dans les deux fichiers pour maintenir la cohérence des traductions

### Bonnes Pratiques

- Testez vos modifications sur différentes tailles d'écran pour assurer la responsivité
- Vérifiez que vos changements fonctionnent dans les deux langues (FR/EN)
- Utilisez les outils de développement de Vue pour déboguer (`Vue Devtools`)

## Déploiement

Après compilation (`npm run build`), les fichiers du dossier `dist/` peuvent être déployés sur n'importe quel serveur web statique.

## Ressources Utiles

- [Documentation Vue.js 3](https://v3.vuejs.org/)
- [Documentation Vite](https://vitejs.dev/guide/)
- [Documentation Vue-i18n](https://vue-i18n.intlify.dev/)