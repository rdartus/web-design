/*Ce fichier contient toute les fonction utilisées
  pour afficher les statistiques des pokemon*/

function verificationPokemon(config,listPokemon){
    /*gère principalement le comparateur de pokemon,
      gère l'ajout et suppression de sets de données*/
    var tab = [];
    for(var i=0; i<config.data.datasets.length;i++){
        //parcours des sets de données
        for (var j=0; j<listPokemon.length;j++){
            if(config.data.datasets[i].label == listPokemon[j].nom){
                //récupère les sets de données qui sont dans la liste de pokemon
                tab.push(i)
            }
        }
    }
    /*une fois les sets récupérés on cherche les sets que l'on ne veut plus afficher
      pour cela on va inverser la sélection*/
    if(tab.length != config.data.datasets.length){
        for(i=0; i<config.data.datasets.length;i++){
            if(tab.indexOf(i)>-1){

                tab.splice(tab.indexOf(i),1);
            }
            else {
                tab.push(i)
            }
        }
        /*une fois la sélection inversée
          tab contient les sets a enlever du dataSet 
		  on les splice*/
        for(i=0; i < tab.length;i++) {
            config.data.datasets.splice([tab[i]],1);
        }
        //on n'obtient que les sets de données voulu
        config.options.maintainAspectRatio= true;
        //met à jour le graphique pour prendre en compte les modifications
        window.myRadar.update();
    }
}

function addDataPokemon(pokemon,config,colorId){
    //ajoute les données du pokemon à la variable de config
    var data =[];
    for (var key in pokemon) {
        /*on utilise les données qui sont présentes dans le fichier de config
          cela restreint les données aux types précédement définis
          on évite les informations inutiles telles la taille, poids, ID...*/
        if (config.data.labels.indexOf(key)>-1)
        {
        //on crée notre variable de données
            data.push(parseInt(pokemon[key]));
        }
    }
    if(data.length != 0){
        //vérifier si l'array contient nos données
        var length = config.data.datasets.length;
        //vérifier si le set de données n'existe pas déjà
        for(var i=0;i<length;i++) {
            if (config.data.datasets[i].label == pokemon.nom) {
                return config;
            }
        }
        //ajouter le set de données dans la variable de config
        config.data.datasets.push(setDataset(pokemon.nom,data,colorId));
        return config;
    }
}
function setConfig(stats){
    /*on crée une variable de config par défaut
      celle-ci est utilisée à chaque fois qu'un graph est créé
      elle contient les paramètres de bases et les données entrées par l'utilisateur*/
    var config = {
        type: 'radar',
        data: {datasets: []},
        options: {
            responsive:true,
            maintainAspectRatio:false,
            legend: {
                position: 'top'
            },
            scale: {
                reverse: false,
                ticks: {
                    beginAtZero: true
                }
            }
        }
    };
    //on définit le nombre d'axes du graphique ainsi que les noms des axes
    config.data.labels=stats;
    return config;
}
function setDataset(name ,data,colorId){
    //paramètres du dataset telles que la couleur et le nom du graph
    var dataSet ={};
    dataSet.label = name;

    //plusieurs ID de couleurs sont donnés pour le cas du comparateur
    switch(colorId) {
        case 1:
            dataSet.backgroundColor = "rgba(255,0,0,0.2)";
            dataSet.pointBackgroundColor = "rgba(210,44,44,1)";
            dataSet.pointHighlightStroke = "rgba(210,44,44,1)";
            break;

        case 2:
            dataSet.backgroundColor = "rgba(0,0,255,0.2)";
            dataSet.pointBackgroundColor = "rgba(47,73,206,1)";
            dataSet.pointHighlightStroke = "rgba(47,73,206,1)";
            break;

        default:
            dataSet.backgroundColor = "rgba(255,0,0,0.2)";
            dataSet.pointBackgroundColor = "rgba(210,44,44,1)";
            dataSet.pointHighlightStroke = "rgba(210,44,44,1)";
    }
// on injecte les données dans le dataset (CAD: les pv,attaques des pokemon...)
    dataSet.data = data;
    return dataSet;
}
