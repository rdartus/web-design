
	var randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
    };
    var randomColorFactor = function() {
        return Math.round(Math.random() * 255);
    };
    var randomColor = function(opacity) {
        return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
    };

    var config = {
        type: 'radar',
        data: {
            labels: ["Attaque", "Vitesse", "Defense", "PV", "Attaque SPE", "Defense SPE"],
            datasets: [{
                label: "Bulbizarre",
                backgroundColor: "rgba(20,220,220,0.2)",
                pointBackgroundColor:"rgba(151,7,205,1)",
                pointHighlightStroke: "rgba(151,87,205,1)",
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            },]
        },
        options: {
			responsive:true,
			maintainAspectRatio:false,
			legend: {
                position: 'top',
            },
            scale: {
              reverse: false,
              ticks: {
                beginAtZero: true
              }
            }
        }
    };

    window.onload = function() {
        window.myRadar = new Chart(document.getElementById("canvas"), config);
    };
 