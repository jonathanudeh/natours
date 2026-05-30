export const displayMap = (locations) => {
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jonasschmedtmann/cl06z6z6z000115l5qz5qz5qz',
    scrollZoom: false,
    //   center: [locations[0].coordinates[0], locations[0].coordinates[1]],
    //   zoom: 4,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';

    //   add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
      anchor: 'top',
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // extend bounds to include locations
    bounds.extend([loc.coordinates[0], loc.coordinates[1]]);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
