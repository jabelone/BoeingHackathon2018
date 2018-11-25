let num_planes = 2;
let plane_entities = {};

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function updateUI() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status === 200) {
                let locations = JSON.parse(xmlhttp.responseText);
                console.log(locations);

                for (let x = 1; x <= num_planes; x++) {
                    locations[x]["location"] = locations[x]["location"].replace('[', '');
                    locations[x]["location"] = locations[x]["location"].replace(']', '');

                    lat = locations[x]["location"].split(",")[0];
                    lon = locations[x]["location"].split(",")[1];
                    alt = locations[x]["location"].split(",")[2];

                    let location_string = "latitude: " + lat + "; longitude: " + lon + "; radius: 75000; world_radius: 13727982; elevation:0";
                    let entity_string = "<a-entity id=\"plane" + x + "\" a-location=\"" + location_string + "\"> <a-entity rotation=\"-90 0 0\"> <a-gltf-model id=\"plane-model\" src=\"#plane\" rotation=\"0 0 0\" position=\"0 15 0\" scale=\"0.1 0.1 0.1\"></a-gltf-model> </a-entity> </a-entity>";

                    // document.getElementById("plane" + x).outerHTML = "";
                    // document.getElementById("world").innerHTML += entity_string;
                    console.log("updated planes");
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

    M.toast({html: "8 aircraft found.", displayLength: 1000});

    setTimeout(function () {
        M.toast({html: 'Loading terrain data...', displayLength: 1000});
    }, 1000);
    // setInterval(updateUI, 10000);
});
