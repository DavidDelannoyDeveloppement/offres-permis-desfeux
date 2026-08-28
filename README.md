# Offres DESFEUX — version 2.0.0

Cette version synchronise l’application de présentation avec le catalogue utilisé par les applications **Devis** et **Factures**.

## Contenu du catalogue

- 42 offres actives ;
- 294 prestations après les derniers ajustements tarifaires ;
- catégories B manuelle et automatique, AAC, conduite supervisée, CPF, AM, A1, A2, B78, B96, BE et passerelles.

## Dernières modifications validées

- B78 : ajout du livret numérique à 30 €, total 521 € TTC ;
- B96 : ajout du livret numérique à 35 €, total 448 € TTC ;
- A2 sans code : frais administratifs à 70 €, évaluation, préparation, conduite et examens à 40 €, suppression de la fabrication du permis, total 1 030 € TTC.

## Mise à jour du site existant

1. Sauvegarder le dossier actuellement publié.
2. Conserver les dossiers existants `images` et `pdf` : ils ne sont pas inclus dans cette archive.
3. Remplacer à la racine du site :
   - `index.html`
   - `script.js`
   - `styles.css`
   - `styles.scss`
   - `manifest.webmanifest`
   - `logo-ddd.png`
   - `apple-touch-icon.png`
   - `icon-192.png`
   - `icon-512.png`
   - `icon-maskable-512.png`
4. Ajouter le nouveau fichier `catalogue.js` à la racine du site.
5. Publier les fichiers puis effectuer une actualisation forcée du navigateur (`Ctrl + F5`).

## Organisation

Les tarifs et prestations sont maintenant regroupés dans `catalogue.js`. L’interface est générée par `script.js`, ce qui évite de dupliquer les mêmes données dans plusieurs blocs HTML.

Les boutons d’impression conservent les noms des PDF déjà utilisés. Vérifier que les documents correspondants sont toujours présents dans le dossier `pdf` du site.

L’écran de lancement DDD utilise la version de référence : fond noir, logo orange avec rayon de 16 px, barre de progression et distinction de couleur entre « Powered by » et « David Delannoy Développement ».
