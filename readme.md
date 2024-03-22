Sujet 2 : Représentation géographique et moteur de recherche

À l'aide de Javascript et de la librairie Leaflet, réalisez une application simple permettant de répertorier et localiser les bornes de recharges électriques en Nouvelle Calédonie. 

<!-- Récupérez la localisation des bornes de recharges avec le flux ici -->
<!-- Centrez la carte sur la Nouvelle-Calédonie et affichez les bornes sur la carte. -->
<!-- À chaque clique sur un marqueur, affichez en dehors de la carte l’ensemble des informations pour chaque borne dans une panneau latéral comme sur le wireframe ci-dessous :  -->

<!-- Ce panneau doit pouvoir être fermé par l’utilisateur. -->
<!-- Ajoutez un moteur de recherche permettant de trouver une borne en la cherchant par plusieurs critères (ville, nom, etc.) -->
Ajoutez un bouton “Itinéraire” qui va :
Récupérer la position de l’utilisateur à l’aide de la Geolocation API.
Trouver la borne la plus proche (vous pouvez essayer Leaflet KNN)
Afficher ensuite l’itinéraire vers celle ci avec Leaflet Routing Machine 
Votre site doit être “responsive” et fonctionnel sur tout type d’appareils.

