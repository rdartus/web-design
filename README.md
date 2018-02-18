Application Web Design
Richard DARTUS
Elliot HALLAIS
Emmanuelle POIFFAUT
TIC 2


	- Fonctionalités implémentés:
		-utilisation de librairies tierces : du-scroll, parallaxe, angular, bootstrap, custom bootstrap (bootswatch-paper)
		-design responsive que ce soit pour des écran de 320px aux larges écrans de 4k
		-implémentation de ng-click dans la plupart des liens, dans les boutons,
		-implémentation de ng-hide,ng-show et ng-if dans les elements a cacher tel les types, les commentaires ....
		-implémentation de ng-model, ng-submit dans les elements de commentaires ou de recherche avancé.
		-implémentation de ng-repeat pour tous les pokemon de la liste et leur evolution
		-implémentation de ng-class pour définir les classes et les couleurs des types (plante, feu, eau, etc.)
		-implémentation de filtre custom gérant les elements de la liste de pokemons affichés
		-les données sont chargées à l'aide d'un JSON fait maison sur les Pokémons regroupant les informations utiles en français car nous n'avons pas trouvé d'équivalent sur Internet
	
	- Fonctionalités bonus:
		-design en partant de 0, style personnalisé
		-utilisation de factories notamment pour charger les JSON
		-intégration d'un fichier audio sur la page d'accueil
		-respect des conventions matériel design avec effets d'ombre sur les composants
		-animation custom sur des zones de la carte dans la fiche individuelle
		-utilisation de media query pour gérer les éléments qui ne sont pas nativement responsives
	
	- Fonctionalités non implémentées et limites:
		-vérification des pokemons dans le comparateur : limitation lorsque les deux pokemons comparés sont les mêmes
		-sauvegarde des commentaires dans le JSON
		-l'outil visualisation mobile de Chrome n'est pas adapté mais fonctionne sous Firefox (utiliser un appareil mobile ou Firefox)
		
	- Description de l'application:
		- page d'accueil avec redirection vers le site
		
		- arrivée sur la liste des pokemons comportant 
			-une navbar
				-choix d'accéder à la fiche d'un pokemon de façon aléatoire
				-comparateur de pokemons sur un même graph kiviat
				-accès à la page à propos du projet
				-barre de recherche en fonction de mots clés se rapportant au nom, à la description, ou au types
			-affichage progressif des pokemons de manière responsive en fonction de la taille du device
			-filtre custom de manière croissante/décroissante en fonction de l'id, du poids et de la taille et ordre alphabétique
			-possibilité de sélectionner un pokemon pour accéder à la fiche
		
		- fiche individuelle du pokemon
			-passage au pokemon précédent ou suivant grâce à une pagination et gestion du débordement
			-affichage de la description, taille, poids
			-kiviat des statistiques de bases
			-avis d'expert personnalisé pour certains pokemon
			-carte des zones de localisation des pokemons (voir Chenipan ou Roucool qui sont très présents contre Bulbizarre qui est absent)
			-affichage des évolutions avec contour customisé si le pokemon est celui qui est actuellement affichés
			-redirection vers la fiche détaillée de l'évolution en cliquant sur le pokemon en question
			-possibilité d'affichage de commentaires (voir Bulbizarre)
			-possibilité de poster un commentaire sur chaque fiche individuelle mais pas de sauvegarde
			-changement d'affichage si le formulaire est valable ou pas
			-navabar contenant des ancres renvoyant à description, avis (kiviat lorsque l'affichage est réduit pour un mobile), évolution et carte
			-mise en valeur de la navbar en fonction de la position dans la page
		
		- comparateur de pokemon
			-choix parmis tous les pokemons via des select
			-affichage du thumbnail du pokemon en question lorsque sélectionné
			-accès à la fiche individuelle du pokemon en cliquant sur le thumbnail
			-affichage des statistiques de base de chacun de pokemons sélectionnés sur le même kiviat pour comparer
		
		- à propos
			-description du projet et de l'équipe
			-utilisation d'un parallaxe
		
		- autre
			-erreur 404
			-redirection vers la page erreur 404 lorsque l'adresse suivant pokedex.htm#/ n'est pas référencée