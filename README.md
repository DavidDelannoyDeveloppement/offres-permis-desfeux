# Offres DESFEUX — version 2.1.9

## Correction 2.1.9

- Suppression de la mention « chèque ou virement » dans les échéanciers du permis A2.
- Les montants, les 295 € d’arrhes et le calcul automatique du solde restent inchangés.

## Amélioration 2.1.8

- Arrondi à l’euro entier des cinq premières échéances des offres Sérénité.
- La sixième et dernière échéance est automatiquement ajustée pour conserver exactement le prix total.
- Exemple pour un total de 1 705 € : cinq échéances de 284 €, puis une dernière de 285 €.
- Les autres échéanciers, notamment les modalités spécifiques du permis A2, restent inchangés.

## Correction 2.1.7

- Remplacement des échéanciers A2 par les modalités actuellement utilisées : un chèque d’arrhes de 295 €, puis deux paiements par chèque ou virement.
- Le solde après les arrhes est recalculé automatiquement à partir du prix total de chaque formule.
- A2 avec code, 30 heures : 295 € d’arrhes, puis deux paiements de 525 €.
- A2 sans code, 20 heures : 295 € d’arrhes, puis deux paiements de 367,50 €.

## Nouveautés 2.1.6

- Ajout des modalités de paiement aux deux offres principales du permis A2.
- Permis A2 avec code, 30 heures : calcul automatique en 6 échéances.
- Permis A2 sans code, 20 heures : calcul automatique en 4 échéances.
- Les offres A2 financées par le CPF et la passerelle A2 vers A ne sont pas concernées.

## Nouveautés 2.1.5

- Ajout des modalités de paiement à la suite des prestations pour les offres Permis B, B CS et B AAC.
- Calcul automatique depuis le prix total affiché : 6 échéances pour Sérénité, 4 pour les autres offres, avec l’exception actuelle du Permis B Basique en 3 échéances.
- Pour Sérénité, la dernière échéance est indiquée « Avant examen, suivant besoins réels ».
- Le symbole euro reste solidaire du montant grâce à une espace insécable et à la protection CSS contre les retours à la ligne.

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
- B96 : livret numérique à 30 €, total 512 € ;
- A2 sans code : frais administratifs à 70 €, évaluation, plateau, conduite et examens à 40 €, suppression de la fabrication du permis, total 1 030 €.

## Installation

1. Sauvegarder la version actuellement publiée.
2. Conserver impérativement les dossiers existants `images` et `pdf`.
3. Remplacer les fichiers de la racine du site par ceux de cette archive.
4. Ajouter `offres-complementaires.js` à la racine.
5. Republier puis actualiser avec `Ctrl + F5`.

Les dossiers `images` et `pdf` ne sont pas inclus dans l’archive. Les documents propres aux offres complémentaires ne sont proposés que lorsque leur nom de fichier est déjà connu dans le site actuel ; aucun lien PDF n’a été inventé.
