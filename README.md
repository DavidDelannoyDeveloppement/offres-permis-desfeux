# Offres DESFEUX — version 2.1.4

## Correction 2.1.4

- Mise à jour de l’offre Reprise de dossier : deux évaluations initiales réalisées en voiture et nouveau total de 794 €.

## Correction 2.1.3

- Mise à jour du tarif et des prestations de la formation B96.
- Mise à jour des deux offres BE avec financement personnel.
- Suppression de la fabrication du permis dans l’offre BE sans code.

## Correction 2.1.2

- Synchronisation des offres AM cyclomoteur et quadricycle avec la base de devis.
- Correction du permis BE avec code et de la passerelle A2 vers A.
- Vérification des 42 totaux et des prestations associées avec la base de référence.

## Correction 2.1.1

- Harmonisation des majuscules et minuscules dans toutes les lignes de prestations des offres complémentaires.

## Nouveautés 2.1.0

- intégration du lancement commun DDD / client validé dans l’application « Disponibilités élèves » ;
- logo DDD et mention « Powered by David Delannoy Développement » ;
- emblème DESFEUX seul, sur fond blanc, et mention « For École de Conduite DESFEUX » ;
- harmonisation des majuscules et minuscules dans les intitulés de toutes les offres.

Cette version repart du site de présentation original et conserve intégralement ses cartes commerciales :

- formules Sérénité, Essentiel et Basique ;
- différences entre boîte manuelle et automatique ;
- tarifs particuliers des heures incluses et supplémentaires ;
- conditions et précisions « à votre charge » ;
- boutons et noms des documents PDF existants ;
- présentation graphique originale.

Les 15 offres absentes du site initial sont ajoutées à la suite dans `offres-complementaires.js`, sans remplacer les 27 offres déjà présentées.

## Modifications tarifaires validées

- Levée 78 : livret numérique à 30 €, total 521 € ;
- B96 : ajout du livret numérique à 35 €, total 448 € ;
- A2 sans code : frais administratifs à 70 €, évaluation, plateau, conduite et examens à 40 €, suppression de la fabrication du permis, total 1 030 €.

## Installation

1. Sauvegarder la version actuellement publiée.
2. Conserver impérativement les dossiers existants `images` et `pdf`.
3. Remplacer les fichiers de la racine du site par ceux de cette archive.
4. Ajouter `offres-complementaires.js` à la racine.
5. Republier puis actualiser avec `Ctrl + F5`.

Les dossiers `images` et `pdf` ne sont pas inclus dans l’archive. Les documents propres aux offres complémentaires ne sont proposés que lorsque leur nom de fichier est déjà connu dans le site actuel ; aucun lien PDF n’a été inventé.
