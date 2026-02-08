import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet default icon path
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to recenter map when selection changes
function Recenter({ coords }) {
  const map = useMap();
  map.setView(coords, 5, { animate: true });
  return null;
}

export default function MapWindow({ uiTheme = "glass" }) {
  const isMac = uiTheme === "macos";

  // -----------------------------
  // Place details
  // -----------------------------
  const placeDetails = {
    spain: {
      title: "Spain",
      description: "Where I grew up — sunny, warm, and full of memories.",
      funFact: "Primary home base until 2020.",
      coords: [40.4168, -3.7038], // Madrid
    },
    nl: {
      title: "Netherlands",
      description: "My university years — biking, canals, and design school.",
      funFact: "Lots of UX, bikes, and rain.",
      coords: [52.3676, 4.9041], // Amsterdam
    },
    germany: {
      title: "Germany",
      description: "Exchange semester — research, tech, and pretzels.",
      funFact: "Short but intense academic chapter.",
      coords: [52.52, 13.405], // Berlin
    },
    stockholm: {
      title: "Stockholm, Sweden",
      description: "My current home — design, fika, and snow.",
      funFact: "Where this portfolio OS is being built.",
      coords: [59.3293, 18.0686],
    },
    canada: {
      title: "Canada",
      description: "A short adventure abroad in 2015.",
      funFact: "First taste of life outside Europe.",
      coords: [43.6532, -79.3832], // Toronto
    },
  };

  const [selected, setSelected] = useState("stockholm");

  // -----------------------------
  // Theme styles
  // -----------------------------
  const styles = useMemo(() => {
    return {
      textMain: isMac ? "text-black/80" : "text-white/90",
      textStrong: isMac ? "text-black" : "text-white",
      textSub: isMac ? "text-black/60" : "text-white/70",
      cardBg: isMac ? "bg-white" : "bg-white/6",
      cardBorder: isMac ? "border-black/10" : "border-white/10",
      divider: isMac ? "bg-black/10" : "bg-white/10",
      chip: isMac ? "bg-black/5 border-black/10" : "bg-white/5 border-white/10",
    };
  }, [isMac]);

  const places = [
    { key: "spain", label: "Spain", year: "2002–2020" },
    { key: "nl", label: "Netherlands", year: "2020–2024" },
    { key: "germany", label: "Germany", year: "2022–2023" },
    { key: "stockholm", label: "Stockholm, Sweden", year: "2024 →" },
    { key: "canada", label: "Canada", year: "2015" },
  ];

  return (
    <div className={`h-full flex flex-col ${styles.textMain}`}>
      {/* Header */}
      <div className="px-6 pt-5 pb-3">
        <div className={`${styles.textStrong} text-lg font-semibold`}>
          Where I’ve lived & studied
        </div>
        <div className={`${styles.textSub} text-sm mt-1`}>
          Check out the places I’ve called home — and what I was up to there.
        </div>
        <div className={`mt-4 h-px ${styles.divider}`} />
      </div>

      {/* Layout */}
      <div className="flex-1 overflow-auto px-6 pb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Map */}
        <div className={`lg:col-span-2 rounded-2xl ${styles.cardBg} border ${styles.cardBorder} p-5 flex flex-col`}>
          <div className={`${styles.textSub} text-xs mb-3`}>Interactive map</div>

          <div className="flex-1 rounded-xl overflow-hidden border relative">
            <MapContainer
              center={placeDetails[selected].coords}
              zoom={5}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <Recenter coords={placeDetails[selected].coords} />

              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              {Object.entries(placeDetails).map(([key, place]) => (
                <Marker key={key} position={place.coords}>
                  <Popup>
                    <strong>{place.title}</strong>
                    <br />
                    {place.description}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="mt-4 text-[11px] opacity-70">
            Later: animated routes, timeline slider, and photo panels.
          </div>
        </div>

        {/* Right: Places list */}
        <div className={`lg:col-span-1 rounded-2xl ${styles.cardBg} border ${styles.cardBorder} p-5 flex flex-col`}>
          <div className="flex items-center justify-between mb-2">
            <div className={`${styles.textStrong} font-semibold`}>Places</div>
            <div className={`${styles.textSub} text-[11px]`}>Tap to change the map</div>
          </div>

          <div className="space-y-2">
            {places.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setSelected(p.key)}
                className={`w-full text-left rounded-xl px-3 py-3 border ${styles.cardBorder} transition ${
                  selected === p.key
                    ? isMac
                      ? "bg-black/10"
                      : "bg-white/15"
                    : isMac
                    ? "hover:bg-black/5"
                    : "hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`${styles.textStrong} text-sm font-medium`}>
                    {p.label}
                  </div>
                  {selected === p.key && (
                    <span className="text-[10px] uppercase tracking-wide opacity-70">
                      Selected
                    </span>
                  )}
                </div>
                <div className={`${styles.textSub} text-xs mt-1`}>{p.year}</div>
              </button>
            ))}
          </div>

          <div className={`${styles.textSub} text-[11px] mt-4 opacity-70`}>
            Tip 💡: This panel drives the map — try clicking around.
          </div>
        </div>
      </div>
    </div>
  );
}
