function getIdByUrl (){
     /*fonction de récupération de l'id du pokemon par le biais de l'URL
       pour le cas de l'aléatoire on redirige directement vers un numero
       fichier trié*/

     var url = window.location.href;
     var tab = url.split("/");
     //on récupère le dernier élément de l'URL
	 msg = tab[tab.length-1];
     return msg;

 }

 function getPokemonById (id, poked){
    /*on récupère l'objet Pokemon contenant toutes ses informations
      on considère le fichier trié*/
    var i = parseInt(id);
    var val;

    try{
        val = poked[i-1];
    }
    catch (e){
        
    }
    return  val;

 }

 function getReviewsById(id,comments) {
     //fichier trié par ordre chronologique
     return comments[parseInt(id) - 1].comments;
 }

 function getNextPokemon (id){
     /*permet de naviguer dans le pokedex sans repasser par la liste
       permet d'afficher directement le prochain pokemon*/
     var num = parseInt(id);

     //comme on le fait avec les ID il faut faire des string avec 3 decimales ex: 001 ou 020
     if(num < 9){
         return "00"+ (num+1);
     }
     else if (num >= 9 && num < 99){
         return "0"+(num+1);
     }
     else{
         return (num+1);
     }
 }

 function getPreviousPokemon (id){
     //permet de naviguer dans le pokedex sans repasser par la liste
     //cela permet de recupérer le pokemeon précedent pour pouvoir l'afficher
     var num = parseInt(id);

     if(num < 11){
         return "00"+ (num-1);
     }
     else if (num >= 11 && num < 101){
         return "0"+(num-1);
     }
     else{
         return (num-1);
     }
 }

 function getClassNext (id){
     /*permet de naviguer dans le pokedex sans repasser par la liste
       cette classe permet de définir si l'utilisateur peut naviguer vers le pokemon suivant*/
     if(id=="151")
        return "next disabled";
     else
        return "next";
 }

 function getClassPrevious (id){
     /*permet de naviguer dans le pokedex sans repasser par la liste
       cette classe permet de definir si l'utilisateur peut naviguer vers le pokemon précedent*/
     if(id=="001")
         return "previous disabled";
     else
         return "previous";
 }
 
 function getListPokemon(ids,pokedex){
     /*on récupère la liste des pokemon liés à celui dont on fourni l'ID
       il s'agit de ses évolutions*/
     var listPokemon =[];
     for(var i= 0;i<ids.length;i++)
     {
		listPokemon.push(getPokemonById(ids[i],pokedex));
     }
     return listPokemon;
 }

	function getZones(zones){
        //permet d'afficher les zones de rencontre de ce pokemon
		var result = "";
		if(zones[0] == 0)
		{
            //si on ne connait pas sa zone on affiche un message
			return "Ce Pokémon n'a pas de zone prédéfinie, alors bon courage pour le trouver...";
		}
		else if(zones.length == 1){
            //si l'objet pokemon a un array de zone recuperer celui ci
			return "Zone " + zones[0];
		}
		else{
			result+="Zones ";
			for (var i=0;i<zones.length;i++)
			{
				result+= zones[i] + ", ";
			}
			return result.substring(0,result.length-2);
		}
	};

/*function watching scrolling
  permet d'activer le slide lorsqu'on est suffisament proche de l'objet*/
 $(document).ready(function () {
     $(window).scroll(function () {
         $(".slideanim").each(function () {
             var window_height = $(window).height();
             var window_top_position = $(window).scrollTop();
             var window_bottom_position = (window_top_position + window_height);
             var $element = $(this);
             var element_height = $element.outerHeight();
             var element_top_position = $element.offset().top;
             var element_bottom_position = (element_top_position + element_height);
             if ((element_bottom_position >= window_top_position) &&
                 (element_top_position <= window_bottom_position)) {
                 $element.addClass("slide");
             }
         });
     });
 });



