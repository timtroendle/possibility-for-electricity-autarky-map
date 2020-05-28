const COLOR_LIKELY_POSSIBLE = 'hsla(89, 47%, 40%, 0.6)';
const COLOR_MAYBE_POSSIBLE = 'hsla(89, 47%, 40%, 0.4)';
const COLOR_LIKELY_IMPOSSIBLE = 'hsla(2, 78%, 35%, 0.3)';
const COLOR_IMPOSSIBLE = 'hsla(2, 78%, 35%, 0.5)'
const COLOR_MISSING = 'hsla(0, 0%, 0%, 0)'
const COLOR_OUTLINE = 'hsla(0, 0%, 100%, 1)'
const COLOR_OUTLINE_HIGH_ZOOM = 'hsla(0, 0%, 100%, 0.6)'
const COLOR_HOVER = 'white';

const CONDITIONAL_COLORING = [
    "match",
    ["get", "our_rating"],
    "is impossible",
    COLOR_IMPOSSIBLE,
    "is likely impossible",
    COLOR_LIKELY_IMPOSSIBLE,
    "is maybe possible",
    COLOR_MAYBE_POSSIBLE,
    "is likely possible",
    COLOR_LIKELY_POSSIBLE,
    COLOR_MISSING
]
const CONDITIONAL_BORDER = ["case",
    ["boolean", ["feature-state", "hover"], false],
    3,
    0.0
]
TEXT_COLOR_HIGH_ZOOM = "hsl(0, 0%, 34%)"
const CONDITIONAL_TEXT_COLOR_CITY = [
    "interpolate",
    ["exponential", 1],
    ["zoom"],
    6,
    "hsl(0, 0%, 42%)",
    9,
    TEXT_COLOR_HIGH_ZOOM
]
const CONDITIONAL_TEXT_COLOR_TOWN = {
    "base": 1,
    "stops": [
      [8, "hsl(0, 0%, 62%)"],
      [9, TEXT_COLOR_HIGH_ZOOM]
    ]
}
const CONDITIONAL_TEXT_COLOR_VILLAGE = {
    "base": 1,
    "stops": [
      [10, "hsl(0, 0%, 62%)"],
      [11, TEXT_COLOR_HIGH_ZOOM]
    ]
}
const HIGH_ZOOM_TEXT_LAYERS = [
    'place-hamlet',
    'place-suburb',
    'place-neighbourhood',
    'place-islets-archipelago-aboriginal',
    'place-islands',
]

function styleMap(map) {
    // Increase font contrast on high zoom levels
    map.setPaintProperty('place-city-lg-n', 'text-color', CONDITIONAL_TEXT_COLOR_CITY);
    map.setPaintProperty('place-city-lg-s', 'text-color', CONDITIONAL_TEXT_COLOR_CITY);
    map.setPaintProperty('place-city-md-n', 'text-color', CONDITIONAL_TEXT_COLOR_CITY);
    map.setPaintProperty('place-city-md-s', 'text-color', CONDITIONAL_TEXT_COLOR_CITY);
    map.setPaintProperty('place-city-sm', 'text-color', CONDITIONAL_TEXT_COLOR_CITY);
    map.setPaintProperty('place-town', 'text-color', CONDITIONAL_TEXT_COLOR_TOWN);
    map.setPaintProperty('place-village', 'text-color', CONDITIONAL_TEXT_COLOR_VILLAGE);
    for (var i = 0; i < HIGH_ZOOM_TEXT_LAYERS.length; i++) {
        map.setPaintProperty(HIGH_ZOOM_TEXT_LAYERS[i], 'text-color', TEXT_COLOR_HIGH_ZOOM);
    }
    // Find the index of the first symbol layer in the map style
    var layers = map.getStyle().layers;
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    // Add data layers
    map.addSource("continental", {
        "type": "vector",
        "url": "mapbox://timtroendle.8p5jv6p0"
    });
    map.addSource("national", {
        "type": "vector",
        "url": "mapbox://timtroendle.bena6hoy"
    });
    map.addSource("regional", {
        "type": "vector",
        "url": "mapbox://timtroendle.38ibxh4r"
    });
    map.addSource("municipal", {
        "type": "vector",
        "url": "mapbox://timtroendle.a0731wai"
    });

    map.addLayer({
        "id": "continental",
        "type": "fill",
        "source": "continental",
        "source-layer": "continentaltechnicalsocialpotential",
        "maxzoom": 3.5,
        "layout": {},
        "paint": {
            "fill-color": CONDITIONAL_COLORING,
            "fill-outline-color": COLOR_OUTLINE
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "continental-borders",
        "type": "line",
        "source": 'continental',
        "source-layer": "continentaltechnicalsocialpotential",
        "maxzoom": 3.5,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "national",
        "type": "fill",
        "source": "national",
        "source-layer": "nationaltechnicalsocialpotential",
        "minzoom": 3.5,
        "maxzoom": 6,
        "layout": {},
        "paint": {
            "fill-color": CONDITIONAL_COLORING,
            "fill-opacity": 1,
            "fill-outline-color": COLOR_OUTLINE
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "national-borders",
        "type": "line",
        "source": 'national',
        "source-layer": "nationaltechnicalsocialpotential",
        "minzoom": 3.5,
        "maxzoom": 6,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "regional",
        "type": "fill",
        "source": "regional",
        "source-layer": "regionaltechnicalsocialpotential",
        "minzoom": 6,
        "maxzoom": 9,
        "layout": {},
        "paint": {
            "fill-outline-color": COLOR_OUTLINE,
            "fill-color": CONDITIONAL_COLORING
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "regional-borders",
        "type": "line",
        "source": 'regional',
        "source-layer": "regionaltechnicalsocialpotential",
        "minzoom": 6,
        "maxzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "municipal",
        "type": "fill",
        "source": "municipal",
        "source-layer": "municipaltechnicalsocialpotential",
        "minzoom": 9,
        "layout": {},
        "paint": {
            "fill-color": CONDITIONAL_COLORING,
            "fill-outline-color": COLOR_OUTLINE_HIGH_ZOOM
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "municipal-borders",
        "type": "line",
        "source": 'municipal',
        "source-layer": "municipaltechnicalsocialpotential",
        "minzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({ // different country outlines necessary because levels do not match exactly
        "id": "country-thick-outline-country",
        "type": "line",
        "source": {
            type: 'vector',
            url: 'mapbox://timtroendle.0u8aumaa'
        },
        "source-layer": "national-boundaries-national--5fk3kj",
        "minzoom": 4,
        "maxzoom": 6,
        "layout": {},
        "paint": {
            "line-color": COLOR_OUTLINE,
            "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 6, 1, 9, 2]
        }
    }, firstSymbolId);
    map.addLayer({ // different country outlines necessary because levels do not match exactly
        "id": "country-thick-outline-regional",
        "type": "line",
        "source": {
            type: 'vector',
            url: 'mapbox://timtroendle.djc7n2y2'
        },
        "source-layer": "national-boundaries-regional--0omid4",
        "minzoom": 6,
        "maxzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_OUTLINE,
            "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 6, 1, 9, 2]
        }
    }, firstSymbolId);
    map.addLayer({ // different country outlines necessary because levels do not match exactly
        "id": "country-thick-outline-municipal",
        "type": "line",
        "source": {
            type: 'vector',
            url: 'mapbox://timtroendle.b0f7q184'
        },
        "source-layer": "national-boundaries-municipal-5xb816",
        "minzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_OUTLINE,
            "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 6, 1, 9, 2]
        }
    }, firstSymbolId);
}
