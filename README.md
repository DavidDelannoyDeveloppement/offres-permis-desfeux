# Offres DESFEUX — version installable DDD

Cette version ajoute à l’application existante :

- une installation comme application sur téléphone ou ordinateur ;
- le logo David Delannoy Développement comme icône de l’application ;
- un écran de lancement noir et orange ;
- la mention « Powered by David Delannoy Développement » ;
- les formats d’icône standard et adaptatif.

## Installation dans le projet existant

Copier tous les fichiers de ce dossier à la racine du projet DESFEUX et
remplacer `index.html`, `script.js`, `styles.css` et `styles.scss` lorsqu’ils
existent déjà.

Conserver les dossiers existants `images` et `pdf` : ils ne sont pas inclus ici
et restent nécessaires au fonctionnement du site.

## Fichiers ajoutés

- `manifest.webmanifest`
- `logo-ddd.png`
- `apple-touch-icon.png`
- `icon-192.png`
- `icon-512.png`
- `icon-maskable-512.png`

## Mise à jour d’une application déjà installée

Si l’ancienne version est déjà installée, la désinstaller puis la réinstaller
depuis le site afin de forcer le renouvellement de l’icône et du manifest.
