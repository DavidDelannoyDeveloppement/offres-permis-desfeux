# Proposition DESFEUX — sélecteur guidé d’offres

Cette proposition conserve le catalogue et l’identité visuelle de la version 2.3.1, mais place un parcours de sélection en tête de page.

## Parcours client

- Choix du projet : permis B, moto, remorque, AM / BSR, code et autres prestations.
- Pour le permis B, choix entre boîte manuelle et boîte automatique.
- Choix explicite entre financement personnel et financement CPF.
- Affichage uniquement des offres compatibles, avec possibilité de revenir au catalogue complet.
- Désactivation automatique d’un mode de financement lorsqu’aucune offre correspondante n’existe.

## Clarification des financements

- Chaque carte indique désormais « Financement personnel » ou « Financement CPF ».
- Les offres BE sont réparties dans deux rubriques distinctes.
- Les quatre formules BE sont conservées : personnel avec code à 1 190 €, personnel sans code à 1 070 €, CPF avec code à 1 260 € et CPF sans code à 1 190 €.

## Correction 2.3.1

- Réintégration des heures supplémentaires et des présentations supplémentaires à l'examen de la circulation dans les neuf cartes du permis B.
- Pour les offres Essentiel et Basique : tarif majoré à 57 € à partir de la 21e heure en boîte manuelle et dès la 13e heure en boîte automatique.
- Pour les offres Essentiel et Basique : présentation supplémentaire à partir de la deuxième à 57 €.
- Pour les offres Sérénité : heure et présentation supplémentaires conservées au tarif horaire du forfait affiché.
- Pour les deux offres A2 principales : remplacement des arrhes fixes de 295 € par trois échéances égales, arrhes comprises, avec ajustement de la dernière au centime si nécessaire.

## Mise à jour du catalogue

- Synchronisation des 42 offres avec le nouveau catalogue transmis le 16 novembre 2026.
- Actualisation des prix totaux et de toutes les prestations : 27 offres dans la page principale et 15 offres complémentaires.
- Conservation des précisions commerciales non tarifées déjà présentes sur les formules B.
- Harmonisation des libellés et maintien du symbole euro avec le montant sur une même ligne.

## Paiements échelonnés

- Les modalités des permis B sont recalculées depuis le prix total actuellement affiché, y compris lors du passage entre boîte manuelle et automatique.
- Pour toutes les offres concernées, les échéances précédant la dernière sont identiques et arrondies à l'euro supérieur : les arrhes bénéficient donc toujours de l'arrondi supérieur.
- La dernière échéance est ajustée automatiquement afin que la somme corresponde exactement au prix total, sans centime résiduel ni dépassement.
- Les offres Sérénité utilisent six échéances.
- Les autres offres B utilisent quatre échéances, sauf le permis B traditionnel Basique qui conserve trois échéances.
- Les deux offres A2 principales utilisent trois échéances calculées sur le prix total, arrhes comprises.

## Accès aux devis

- Les anciens PDF d'offres ne sont plus utilisés.
- Le lien « Offre / devis » ouvre l'application de devis Google Apps Script dans un nouvel onglet.
- Les autres documents (mandats et règlement intérieur) restent imprimables depuis le site.

## Éléments conservés

- Choix entre boîte manuelle et automatique.
- Modalités de paiement et rappel du partenariat CIC sur les neuf cartes du permis B.
- Écran de lancement, identité visuelle et fonctionnement hors serveur de l'application statique.

## Installation

1. Sauvegarder la version actuellement publiée.
2. Conserver les éventuels dossiers existants `images` et `pdf` : ils ne sont pas inclus dans l'archive.
3. Remplacer les fichiers de la racine du site par ceux de cette archive.
4. Republier puis forcer l'actualisation du navigateur avec `Ctrl + F5`.
