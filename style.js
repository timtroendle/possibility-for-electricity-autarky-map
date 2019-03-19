const COLOR_LIKELY_POSSIBLE = 'hsla(89, 47%, 40%, 0.6)';
const COLOR_MAYBE_POSSIBLE = 'hsla(89, 47%, 40%, 0.4)';
const COLOR_LIKELY_IMPOSSIBLE = 'hsla(2, 78%, 35%, 0.3)';
const COLOR_IMPOSSIBLE = 'hsla(2, 78%, 35%, 0.5)'
const COLOR_MISSING = 'hsla(0, 0%, 0%, 0)'
const COLOR_OUTLINE = 'hsla(0, 0%, 100%, 1)'

const CONDITIONAL_COLORING = [
    "step",
    ["coalesce", ["get", "normed_potential"], -1], // catch NaNs
    COLOR_MISSING,
    0,
    COLOR_IMPOSSIBLE,
    1,
    COLOR_LIKELY_IMPOSSIBLE,
    2,
    COLOR_MAYBE_POSSIBLE,
    10,
    COLOR_LIKELY_POSSIBLE
    ]

function styleMap(map) {
    var layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    map.addLayer({
        "id": "europe",
        "type": "fill",
        "source": {
            type: 'vector',
            url: 'mapbox://timtroendle.91r5pfch'
        },
        "source-layer": "merged-results-5c45qb",
        "maxzoom": 3.5,
        "layout": {},
        "paint": {
            "fill-color": CONDITIONAL_COLORING,
            "fill-outline-color": COLOR_OUTLINE
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "country",
        "type": "fill",
        "source": {
            type: 'vector',
            url: 'mapbox://timtroendle.b2se99fd'
        },
        "source-layer": "merged-results-33ke27",
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
        "id": "region",
        "type": "fill",
        "source": {
            type: 'vector',
            url: 'mapbox://timtroendle.0dly3483'
        },
        "source-layer": "merged-results-2jcgj1",
        "minzoom": 6,
        "maxzoom": 9,
        "layout": {},
        "paint": {
            "fill-outline-color": COLOR_OUTLINE,
            "fill-color": CONDITIONAL_COLORING
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "municipality",
        "type": "fill",
        "source": {
            type: 'vector',
            url: 'mapbox://timtroendle.8lu7xodw'
        },
        "source-layer": "merged-results-4xkc2x",
        "minzoom": 9,
        "layout": {},
        "paint": {
            "fill-color": CONDITIONAL_COLORING,
            "fill-outline-color": COLOR_OUTLINE
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
