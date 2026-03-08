#  Compagnons

**Compagnons** est un prototype de réseau social dédié aux propriétaires d’animaux.  
Ce site a été réalisé dans le cadre d’une **SAE du BUT Informatique**.

L'objectif du projet était de concevoir l'interface d'une plateforme permettant aux utilisateurs de partager des contenus autour de leurs animaux, d'échanger avec d'autres propriétaires et de créer une communauté.

---

#  Objectif du projet

Le projet vise à simuler un réseau social orienté autour du monde animalier.  
Les utilisateurs peuvent imaginer :

- partager des publications concernant leurs animaux
- consulter un fil d’actualité
- interagir avec d’autres membres de la communauté
- accéder à différentes pages du site (aide, connexion, accueil, etc.)

Ce projet est principalement centré sur **la conception d'une interface web** et l'organisation d'un projet front-end.

---

#  Technologies utilisées

- **HTML5** → structure des pages
- **CSS3** → mise en forme et design
- **JavaScript** → interactions côté client

---

#  Structure du projet


Compagnons/
│
├── accueil/ # Pages liées à l'accueil
├── aide/ # Page d'aide
├── feed/ # Fil d'actualité
├── login/ # Pages de connexion
├── includes/ # Éléments réutilisables (header, footer...)
├── images/ # Images du site
├── js/ # Scripts JavaScript
├── CSS/ # Feuilles de style
│
└── index.html # Page principale


---

# 🚀 Lancer le projet

Le projet doit être lancé via un **serveur local** pour que les scripts JavaScript fonctionnent correctement.  
Ouvrir directement `index.html` avec le navigateur (protocole `file://`) peut empêcher certains scripts et ressources de se charger.

## Méthode recommandée : Live Server (VS Code)

1. Installer **Visual Studio Code**
2. Installer l’extension **Live Server**
3. Ouvrir le dossier du projet dans VS Code
4. Faire **clic droit sur `index.html`**
5. Cliquer sur **"Open with Live Server"**

Le site s’ouvrira automatiquement dans votre navigateur.

## Alternative : serveur Python

Si Python est installé sur votre machine, vous pouvez lancer un serveur local avec la commande suivante :


python -m http.server 8000

Puis ouvrir dans votre navigateur :

http://localhost:8000


#  Historique du repository

Ce projet a été réalisé dans le cadre d'une SAE du BUT Informatique.

Il a permis de travailler plusieurs compétences :

conception d'interfaces web

structuration d'un projet front-end

organisation de fichiers et ressources

travail collaboratif sur un projet web
Le projet était initialement hébergé sur un serveur Git privé (Gitea) dans le cadre du travail de groupe.

Ce repository GitHub a été créé après coup pour publier le projet, ce qui explique la présence d'un seul commit dans l'historique.
