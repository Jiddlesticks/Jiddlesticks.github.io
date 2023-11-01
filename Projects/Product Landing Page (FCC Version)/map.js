function initMap() {
    // Set the initial map options, like center and zoom level
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 1
    });

    // Create an array to store markers
    var markers = [];

    // Get references to the input field and search button
    var input = document.getElementById('location-input');
    var searchButton = document.getElementById('search-button');

    // Initialize the PlacesService
    var service = new google.maps.places.PlacesService(map);

    // Initialize the Autocomplete object
    var autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });

    // Add an event listener to handle place selection from Autocomplete
    autocomplete.addListener('place_changed', function () {
        var selectedPlace = autocomplete.getPlace();
        if (!selectedPlace.geometry) {
            // User entered the name of a place that was not suggested and pressed Enter
            alert('No details available for entered location');
            return;
        }

        // Add an event listener for the Enter key press outside of the click event listener
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                // Prevent the default form submission behavior
                event.preventDefault();

                // Trigger the click event of the search button
                searchButton.click();
            }
        });

        // Add an event listener to the search button
        searchButton.addEventListener('click', function () {
            var location = input.value;

            // Use the Google Geocoding API to convert the entered location into latitude and longitude
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: location }, function (results, status) {
                if (status === 'OK' && results[0]) {
                    var userLocation = results[0].geometry.location;

                    // Update the map to center on the user's entered location
                    map.setCenter(userLocation);

                    // Set the zoom level (replace YOUR_ZOOM_LEVEL with your desired value)
                    map.setZoom(11);

                    // Clear any existing markers on the map
                    markers.forEach(marker => {
                        marker.setMap(null);
                    });
                    markers = [];

                    // Create a request object for nearby places search with specific keywords
                    var request = {
                        location: userLocation,
                        radius: 8047, // Adjust as needed
                        keyword: 'cookie shop', // Add other relevant keywords as needed
                    };

                    // Perform the nearby places search
                    service.nearbySearch(request, function (results, status) {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                        
                            // Process and display the results (add markers)
                            results.forEach(function (place) {
                                var marker = new google.maps.Marker({
                                    map: map,
                                    position: place.geometry.location,
                                    title: place.name,
                                });

                                markers.push(marker);

                                // Add a click event listener to the marker to open Google Maps in a new tab/window
                                marker.addListener('click', function() {

                                    // Retrieve place details using the Place Details API
                                    service.getDetails({ placeId: place.place_id }, function(placeDetails, status) {
                                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                                    
                                            // Construct the URL with the place's name and coordinates for Google Maps
                                            var mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' +
                                            encodeURIComponent(placeDetails.name) +
                                            '&query_place_id=' + place.place_id;

                                            // Open a new browser window or tab with the Google Maps URL
                                            window.open(mapsUrl, '_blank');
                                        } else {
                                            // Handle the details request error
                                            alert('Error fetching place details.');
                                        }
                                    });
                                });
                            });
                        } else {
                            // Handle the search error
                            alert('Location not found or no cookie shops found near this location.');
                        }
                    });
                }
            });
        });
    })
}

// Get references to the input field and clear button
var input = document.getElementById('location-input');
var clearButton = document.getElementById('clear-button');

// Attach an event listener to the clear button
clearButton.addEventListener('click', function () {
            input.value = ''; // Clear the input field
});




// Function to set padding for sections
function setSectionPadding() {
    const header = document.getElementById('header'); // Get the header element
    const sections = document.querySelectorAll('.section'); // Get all sections

    const headerHeight = header.clientHeight; // Get the height of the header

    // Apply padding to each section
    sections.forEach(section => {
        section.style.paddingTop = headerHeight + 'px';
    });
}

// Call the function when the page loads and when it resizes
window.addEventListener('load', setSectionPadding);
window.addEventListener('resize', setSectionPadding);
