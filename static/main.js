let num_planes = 8;
let plane_entities = {};

function updateUI() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status === 200) {
                let locations = JSON.parse(xmlhttp.responseText);
                console.log(locations);

                for (let x = 1; x <= num_planes; x++) {
                    lon = locations[x]["location"].split(",")[0];
                    lat = locations[x]["location"].split(",")[1];
                    alt = locations[x]["location"].split(",")[2];
                    console.log(lon);
                    console.log(lat);
                    console.log(alt);
                    // plane_entities[x] = document.getElementById("plane" + String(x));
                }
            }
            else if (xmlhttp.status === 400) {
                alert('There was an error 400');
            }
            else {
                M.toast({html: 'There was an error fetching data.', displayLength: 1000})
            }
        }
    };

    xmlhttp.open("GET", "/api/locations", true);
    xmlhttp.send();
}

window.addEventListener("load", function () {
    M.toast({html: 'Finished loading situational awareness system.', displayLength: 2000});

    for (let x = 1; x <= num_planes; x++) {
        plane_entities[x] = document.getElementById("plane" + String(x));
    }

    M.toast({html: "8 airctaft found.", displayLength: 1000});

    setTimeout(function () {
        M.toast({html: 'Loading terrain data...', displayLength: 1000});
    }, 1000);
    setInterval(updateUI, 500);
});
