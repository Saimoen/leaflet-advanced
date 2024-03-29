$.ajax({
  type: "GET",
  url: "https://data.gouv.nc/api/explore/v2.1/catalog/datasets/bornes-de-recharge-pour-vehicules-electriques/records?limit=20",
  success: function (data) {
    console.log(data);
    var map = L.map("map").setView([-21.35964121293933, 165.49842555234315], 8);
    var stationNames = []; // Liste des noms de stations
    var userPosition = null;

    var routeButton = L.Control.extend({
      options: {
        position: "bottomright",
      },
      onAdd: function (map) {
        var itineraire = L.DomUtil.create("div", "leaflet-bar leaflet-control");
        itineraire.innerHTML =
          '<button class="btn">Trouver la borne la plus proche</button>';

        itineraire.onclick = function () {
          navigator.geolocation.getCurrentPosition(function (position) {
            userPosition = [
              position.coords.latitude,
              position.coords.longitude,
            ];

            var geoJsonData = {
              type: "FeatureCollection",
              features: [],
            };

            data.results.forEach((element) => {
              var feature = {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [
                    element.geo_point_2d.lon,
                    element.geo_point_2d.lat,
                  ],
                },
                properties: {
                  nom_station: element.nom_station,
                  nom_amenageur: element.nom_amenageur,
                  nom_commercial: element.nom_commercial,
                  nom_operateur: element.nom_operateur,
                  adresse_station: element.adresse_station,
                  code_commune: element.code_commune,
                  code_postal: element.code_postal,
                  commune: element.commune,
                  nb_points_charge: element.nb_points_charge,
                  observations_stations: element.observations_stations,
                },
              };
              geoJsonData.features.push(feature);
            });

            var geoJsonLayer = L.geoJson(geoJsonData);

            var nearestStation = leafletKnn(geoJsonLayer).nearest(
              L.latLng(userPosition[0], userPosition[1]),
              1
            )[0].layer.feature;

            L.Routing.control({
              waypoints: [
                L.latLng(userPosition[0], userPosition[1]),
                L.latLng(
                  nearestStation.geometry.coordinates[1],
                  nearestStation.geometry.coordinates[0]
                ),
              ],
              routeWhileDragging: true,
            }).addTo(map);
          });
        };

        return itineraire;
      },
    });

    map.addControl(new routeButton());

    var searchInput = document.createElement("input");
    var buttonSearch = document.createElement("button");
    searchInput.type = "text";
    searchInput.placeholder = "Rechercher par commune";
    searchInput.className += "input";
    buttonSearch.className += "btn";
    buttonSearch.textContent = "Rechercher";
    buttonSearch.addEventListener("click", function () {
      var searchValue = searchInput.value.toLowerCase();
      var filteredStations = stationNames.filter(function (station) {
        return station.commune.toLowerCase().includes(searchValue);
      });
      if (!searchInput.value) {
        var circle = L.circle(
          [element.geo_point_2d.lat, element.geo_point_2d.lon],
          {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 500,
          }
        ).addTo(map);
        circle.nom_amenageur = element.nom_amenageur;
        circle.nom_commercial = element.nom_commercial;
        circle.nom_operateur = element.nom_operateur;
        circle.nom_station = element.nom_station;
        circle.adresse_station = element.adresse_station;
        circle.code_commune = element.code_commune;
        circle.code_postal = element.code_postal;
        circle.commune = element.commune;
        circle.nb_points_charge = element.nb_points_charge;
        circle.observations_stations = element.observations_stations
        ? element.observations_stations
        : "Pas d'observations particulières";

        circle.on("click", onMapClick);
      }
      console.log(filteredStations);
      filteredStations.forEach((element) => {
        var circle = L.circle(
          [element.geo_point_2d.lat, element.geo_point_2d.lon],
          {
            color: "green",
            fillColor: "green",
            fillOpacity: 0.5,
            radius: 500,
          }
        ).addTo(map);
        circle.nom_amenageur = element.nom_amenageur;
        circle.nom_commercial = element.nom_commercial;
        circle.nom_operateur = element.nom_operateur;
        circle.nom_station = element.nom_station;
        circle.adresse_station = element.adresse_station;
        circle.code_commune = element.code_commune;
        circle.code_postal = element.code_postal;
        circle.commune = element.commune;
        circle.nb_points_charge = element.nb_points_charge;
        circle.observations_stations = element.observations_stations
        ? element.observations_stations
        : "Pas d'observations particulières";
        circle.on("click", onMapClick);
      });
    });

    data.results.forEach((element) => {
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      var circle = L.circle(
        [element.geo_point_2d.lat, element.geo_point_2d.lon],
        {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: 500,
        }
      ).addTo(map);
      stationNames.push(element);

      circle.nom_amenageur = element.nom_amenageur;
      circle.nom_commercial = element.nom_commercial;
      circle.nom_operateur = element.nom_operateur;
      circle.nom_station = element.nom_station;
      circle.adresse_station = element.adresse_station;
      circle.code_commune = element.code_commune;
      circle.code_postal = element.code_postal;
      circle.commune = element.commune;
      circle.nb_points_charge = element.nb_points_charge;
      circle.observations_stations = element.observations_stations
      ? element.observations_stations
      : "Pas d'observations particulières";
      circle.on("click", onMapClick);

      searchInput.addEventListener("input", function (event) {
        if (event.target.value === "") {
          var circle = L.circle(
            [element.geo_point_2d.lat, element.geo_point_2d.lon],
            {
              color: "red",
              fillColor: "#f03",
              fillOpacity: 0.5,
              radius: 500,
            }
          ).addTo(map);
          circle.nom_amenageur = element.nom_amenageur;
          circle.nom_commercial = element.nom_commercial;
          circle.nom_operateur = element.nom_operateur;
          circle.nom_station = element.nom_station;
          circle.adresse_station = element.adresse_station;
          circle.code_commune = element.code_commune;
          circle.code_postal = element.code_postal;
          circle.commune = element.commune;
          circle.nb_points_charge = element.nb_points_charge;
          circle.observations_stations = element.observations_stations
            ? element.observations_stations
            : "Pas d'observations particulières";
          circle.on("click", onMapClick);
        }
      });
    });

    var customControl = L.control({ position: "topright" });
    customControl.onAdd = function (map) {
      var div = L.DomUtil.create("div", "custom-control flex");
      div.appendChild(searchInput);
      div.appendChild(buttonSearch);
      return div;
    };
    customControl.addTo(map);

    L.Control.geocoder().addTo(map);
  },
});

function onMapClick(e) {
  const panneau = document.getElementById("panneau");
  panneau.style.display = "flex";
  panneau.style.flexDirection = "column";
  panneau.style.alignItems = "center";
  panneau.innerHTML =
    '<i class="fa fa-times" id="cross" style="cursor: pointer; position: absolute; right: 1vw;" aria-hidden="true"></i>';
  panneau.innerHTML += "<h1>Informations concernant la borne</h1>";
  "<h3>Nom aménageur : </h3>" + "" + e.target.nom_amenageur + "</br>";
  panneau.innerHTML +=
    "<h3>Nom commercial : </h3>" + "" + e.target.nom_commercial + "</br>";
  panneau.innerHTML +=
    "<h3>Nom opérateur : </h3>" + "" + e.target.nom_operateur + "</br>";
  panneau.innerHTML +=
    "<h3>Nom station : </h3>" + "" + e.target.nom_station + "</br>";
  panneau.innerHTML +=
    "<h3>Adresse de la borne : </h3>" + "" + e.target.adresse_station + "</br>";
  panneau.innerHTML +=
    "<h3>Code commune : </h3>" + "" + e.target.code_commune + "</br>";
  panneau.innerHTML +=
    "<h3>Code postal : </h3>" + "" + e.target.code_postal + "</br>";
  panneau.innerHTML += "<h3>Commune : </h3>" + "" + e.target.commune + "</br>";
  panneau.innerHTML +=
    "<h3>Nombre points de charge : </h3>" +
    "" +
    e.target.nb_points_charge +
    "</br>";
  panneau.innerHTML +=
    "<h3>Observations : </h3>" + "" + e.target.observations_stations + "</br>";
  const cross = document.getElementById("cross");
  cross.addEventListener("click", () => {
    panneau.style.display = "none";
  });
}
