var app = angular.module('store',['ngRoute','duScroll','infinite-scroll']);
/*on rajoute le duScroll pour gérer les encrage dans le ng-view
 l'infinite-scroll est utilisé pour éviter de charger trop d'images en même temps
 permettant ainsi a l'utilisateur de profiter du site plus rapidement*/

app.filter('filtrePerso', function($filter) {
//filtre custom pour ordonner notre liste de pokemons
	return function(minipoked,search,pokedex,params,reverse) {
		/*minipoked est le pokedex restreint à la taille de l'écran
		 search est le string contenant l'input de la barre de recherche
		 params correspond aux éléments d'ordonnance
		 order quand a lui conditionne l'ordre de façon croissante ou decroissante*/
		var orderedTab=Array.from($filter('filter')(pokedex, search));
		//utilisation du filtre de google pour la recherche
		if(params != "" && params != undefined) {
			//utilisation du filtre de google pour l'ordre
			orderedTab = Array.from($filter('orderBy')(orderedTab,params,reverse));
		}
		//restriction de l'array ordonné dans la limitte de l'ecran de l'utilisateur
		if (minipoked.length<orderedTab.length){
			orderedTab.splice(minipoked.length,orderedTab.length-minipoked.length);
		}
		/*récupération du tableau contenant la recherche restreinte
		 organisation de celui ci*/

		return orderedTab;
	};
});
//valeur de l'offset du smooth scrolling
app.value("duScrollOffset",60);

//controller de la liste
app.controller('mainController', function(pokemonServices,$scope,$document,$location){
	var scope = this;
	this.Params = "id";
	this.reverse = false;
	this.pokedex = [];
	this.miniPoked=[];
	this.click=false;
	/*fonction de chargement des données activées lors de l'atteinte du bas de la page
	 remplit le minipoked des données du pokedex
	 fonction qui ne commence qu'après réception des données du pokedex*/
	pokemonServices.getPokedex().success(function(data) {
		scope.pokedex = data;
		scope.length= data.length;
		var init = 0;
		//paramètres de tailles d'ecran optimisés pour le chargement
		if (window.innerWidth < 768)
			init=3;
		else if (window.innerWidth < 992 && window.innerWidth >= 768)
			init=9;
		else
			init=12;
		// minipoked initial
		for(var i=0;i<init;i++){
			scope.miniPoked.push(scope.pokedex[i]);
		}
		//chargement continu du minipoked
		$scope.loadMore = function() {
			var last = scope.miniPoked[scope.miniPoked.length - 1];
			var supp = 0;

			if (window.innerWidth < 768)
				var supp = parseInt(last.id);
			else if (window.innerWidth < 992 && window.innerWidth >= 768)
				var supp = parseInt(last.id) +2;
			else
				var supp = parseInt(last.id) +3;

			var i = parseInt(last.id);
			//ajout des elements dans le minipoked
			for(i;i <= supp; i++) {
				if(i<scope.pokedex.length) {
					scope.miniPoked.push(scope.pokedex[i]);
				}
			}
		};

	});
	//fonction permetant de savoir si le bouton de recherche avancés est utilisé
	this.isClicked = function(){
		var i;
		i = scope.click;
		scope.click = i != true? true:false;
		return scope.click;
	};

	this.setParams = function(param){
		this.reverse = (this.Params === param) ? !this.reverse : false;
		this.Params=param;
	};


	$scope.goto =function(lien) {
		$document.scrollTop(top);
		console.log($location);
		console.log(lien);
		$location.path(lien)
	};
});
//controller de tous les liens aleatoire du site
app.controller('randomController', function($scope,$document,$location){
	var scope = this;
	/*fonction fixant rand à une valeur aléatoire
	 création de celle-ci à cause d'un problème au niveau du Digest
	 à chaque passage la valeur des liens change entrainant une erreur angular*/
	$scope.getRandom=function(max){
		scope.rand = undefined;
		var num = Math.floor((Math.random()*max))+1;


		if(num < 10){
			scope.rand= "00"+num;
		}

		else if (num >= 10 && num < 100){
			scope.rand= "0"+num;
		}

		else{
			scope.rand= num;
		}
	};
	$scope.goto =function(lien) {
		$document.scrollTop(top);
		console.log($location);
		console.log(lien);
		$location.path(lien)
	};
});


/*ajout du gestionnaire de comment
 peu de différences avec celui vu en cours*/
app.controller('ReviewController',function(loadCommentServices,saveCommentServices,$scope){
	var scope=this;
	this.click=true;
	this.id=getIdByUrl();
	loadCommentServices.getComment().success(function(data){
		scope.reviews=getReviewsById(scope.id,data);
	});


	this.addReview=function($scope){
		scope.review.date = Date.now();
		scope.reviews.push(scope.review);
		scope.review={};
		saveCommentServices.setComment(scope.reviews).then(function(data){
		});
	};
	this.isClicked = function(){
		var i;
		i = this.click;
		this.click = i != true? true:false;
		return this.click;
	};

});

/*service permettant la charge des commentaires asynchrone
 renvoie une promesse que l'on évalue plus tard*/
app.factory('loadCommentServices', function($http) {
	var getComment = function (callbackFn) {
		return $http.get('data/comment.json');
	};

	return {
		getComment: getComment
	};

});
// NE FONCTIONNE PAS QU GRAND DAMN DE SON CREATEUR.
app.factory('saveCommentServices', function($http) {
	var setComment = function (data) {
		return $http.post('data/comment.json', data);
	};
	return {
		setComment: setComment
	};

});

//
app.controller('pokemonController',function(pokemonServices,$scope,$document,$location) {

	const Stats = ["pv","attaque","defense","attaqueSpe","defenseSpe","vitesse"];
	var scope = this;
	pokemonServices.getPokedex().success(function(data){
		var id = getIdByUrl();
		scope.pokemon = getPokemonById(id,data);
		scope.listPokemon = getListPokemon(scope.pokemon.evolutions,data);
		scope.zones=getZones(scope.pokemon.zone);
		var configng= setConfig(Stats);
		scope.dataset =addDataPokemon(scope.pokemon,configng);
		window.myRadar = new Chart(document.getElementById("canvas"), scope.dataset);
		scope.gotEvolution = function(poke){
			return poke.evolutions.length == 1 ;
		};
		scope.isPokemonSelected = function(poke){
			if(this.pokemon.id == poke.id){
				return "poke-selected";
			}
			else{
				return "";
			}
		};
		scope.classNext = getClassNext(scope.pokemon.id);
		scope.classPrevious = getClassPrevious(scope.pokemon.id);
		scope.next = getNextPokemon(scope.pokemon.id);
		scope.previous = getPreviousPokemon(scope.pokemon.id);

	});

	$scope.goto =function(lien) {
		$document.scrollTop(top);
		console.log($location);
		console.log(lien);
		$location.path(lien)
	};
});

//service de charge de variable pokedex
//renvoie une promesse que l'on evaluera plus tard
app.factory('pokemonServices', function($http) {
	var getPokedex = function(callbackFn) {
		return $http.get('data/pokAPI.json');

	};

	return {
		getPokedex: getPokedex
	};



});

//controlleur du comparateur
app.controller('battleController',function($scope,pokemonServices) {
	const Stats = ["pv","attaque","defense","attaqueSpe","defenseSpe","vitesse"];
	var scope = this;
	var configng= setConfig(Stats);


	$scope.selectedItemChanged= function(){
		pokemonServices.getPokedex().success(function(data){
			if($scope.selectedItem1 != undefined){
				scope.pokemon1=getPokemonById($scope.selectedItem1,data);
				scope.pokemon1.changed=true;
				scope.configng =addDataPokemon(scope.pokemon1,configng,1);
			}
			if($scope.selectedItem2 != undefined){
				scope.pokemon2=getPokemonById($scope.selectedItem2,data);
				scope.pokemon2.changed=true;
				scope.configng =addDataPokemon(scope.pokemon2,configng,2);
			}
			if($scope.selectedItem1 != undefined && $scope.selectedItem2 != undefined){
				window.myRadar = new Chart(document.getElementById("canvas"),configng);
				verificationPokemon(configng,[scope.pokemon1,scope.pokemon2]);
			}
		});

	};
});

//controlleur de la page a propos
app.controller('aboutController', function(){
	var scope = this;
	window.shownFile = 'none';

	// If an error happens I want to know about it!
	window.onerror = function (msg, url, ln) {
		msg = msg.toString();
		// In Chrome and Firefox an error on a script form a foreign domain will cause this, see link bellow:
		// http://stackoverflow.com/questions/5913978/cryptic-script-error-reported-in-javascript-in-chrome-and-firefox
		if (msg === 'Script error.' && url === '' && ln === 0) return;
		console.log('OnError', "'" + msg + "' in '" + url + "' @ " + ln + " /u:'" + window.navigator.userAgent + "'");
		// Track only one error per page load
		window.onerror = function () {
		};
	};

	// First, make sure we can run.
	if (!koala.supportsCanvas()) {
		console.log('NoCanvas', window.navigator.userAgent);
		alert("Sorry, KoalsToTheMax needs HTML5 Canvas support which your browser does not have. Supported browsers include Chrome, Safari, Firefox, Opera, and Internet Explorer 9, 10");
		return;
	}

	if (!koala.supportsSVG()) {
		console.log('NoSVG', window.navigator.userAgent);
		alert("Sorry, KoalsToTheMax needs SVG support which your browser does not have. Supported browsers include Chrome, Safari, Firefox, Opera, and Internet Explorer 9, 10");
		return;
	}
	// Try you must. If there is an error report it to me.
	try {
		function goToHidden(location, string) {
			location.href = '//' + location.host + location.pathname + '?' + utf8_to_b64(string);
		}

		function basicLoad(location) {
			var file = 'img/team.jpg';
			return {
				file: file,
				shownFile: location.protocol + '//' + location.host + location.pathname + file
			};
		}
		function parseUrl(location) {
			var href = location.href;
			var idx, param, file;

			idx = href.indexOf('?');
			if (idx === -1 || idx === href.length - 1) {
				return basicLoad(location); // Case 1
			}

			param = href.substr(idx + 1);
			if (!/^[a-z0-9+\/]+=*$/i.test(param)) {
				// Does not look base64
				goToHidden(location, param);
				return null;
			}

			// Fall though
			return basicLoad(location);
		}
		var parse = parseUrl(location);
		if (!parse) return;
		var file = parse.file;
		window.shownFile = parse.shownFile;

		if (parse.background) {
			d3.select(document.body)
					.style('background', parse.background);
		}
		if (parse.hideNote) {
			d3.select('#footer')
					.style('display', 'none');
		}

		if (/^https?:/.test(file)) {
			file = "image-server.php?url=" + file;
		}

		function onEvent(what, value) {
			console.log(what, value);

			if (what === 'LayerClear' && value == 0) {
				d3.select('#next')
						.style('display', null)
						.select('input')
						.on('keydown', function() {
							d3.select('div.err').remove();
							if (d3.event.keyCode !== 13) return;
							var input = d3.select(this).property('value');

							if (input.match(/^http:\/\/.+\..+/i)) {
								console.log('Submit', input);
								d3.select('#next div.msg').text('Thinking...');
								d3.select(this).style('display', 'none');
								setTimeout(function() {
									goToHidden(location, input);
								}, 750);
							} else {
								d3.select('#next').selectAll('div.err').data([0])
										.enter().append('div')
										.attr('class', "err")
										.text("That doesn't appear to be a valid image URL. [Hint: it should start with 'http://']")
							}
						});
			}
		}

		var img = new Image();
		img.onload = function() {
			var colorData;
			try {
				colorData = koala.loadImage(this);
			} catch (e) {
				colorData = null;
				console.log('BadLoad', "Msg: '" + e.message + "' file: '" + file + "'");
				alert("Sorry, KoalsToTheMax could not load the image '" + file + "'");
				setTimeout(function() {
					window.location.href = domian;
				}, 750);
			}
			if (colorData) {
				koala.makeCircles("#dots", colorData, onEvent);
				console.log('GoodLoad', 'Yay');
			}
		};
		img.src = file;
	} catch (e) {
		console.log('Problemo', String(e.message));
	}
	this.getRandom=function(max){
		var num = Math.floor((Math.random()*max))+1;
		return num;
	}
});

// route params
app.config(
		['$routeProvider',
			function($routeProvider,$routeParams){
				$routeProvider
						.when('/liste', {
							templateUrl: 'partials/liste.html',
							controller:"mainController"
						})

						.when('/fiche/:msg',{
							templateUrl:'partials/fiche.html',
							controller: 'pokemonController',
							redirectTo: function ($routeParams) {
								/*autorisation d'un certain nombre de Pokemon visible
								 il aurait fallu metre ce nombre en variable pour pouvoir le changer plus facilement*/
								var i = parseInt($routeParams.msg);
								if(i<=0 || i>151){
									return "/error 404";
								}
							}
						})
						.when('/combat',{
							templateUrl:'partials/comparateur.html',
							controller: 'battleController'
						})
						.when('/aleatoire',{
							templateUrl:'partials/fiche.html',
							controller: 'pokemonController'
						})
						.when('/about',{
							templateUrl:'partials/about.html'
						})
						.when('/error404',{
							templateUrl:"partials/error404.html",

						})
						.otherwise({redirectTo: '/error404'})
			}
		]);