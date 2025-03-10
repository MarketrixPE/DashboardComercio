import React, { useEffect, useState } from "react";
import { GoogleMap, Autocomplete, Marker } from "@react-google-maps/api";

interface LocationPickerProps {
  onSelectLocation: (lat: string, lng: string) => void;
  initialCoordinates?: { lat: number; lng: number }; // Coordenadas iniciales
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  onSelectLocation,
  initialCoordinates = { lat: -12.046309176843495, lng: -77.04274243266966 }, // Coordenadas predeterminadas
}) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [center, setCenter] = useState(initialCoordinates);
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Si las coordenadas iniciales cambian, actualiza el centro del mapa y el marcador
    setCenter(initialCoordinates);
    setMarkerPosition(initialCoordinates);
  }, [initialCoordinates]);

  const onLoad = (autoC: google.maps.places.Autocomplete) => {
    // Agregar restricciones de país a Perú
    autoC.setComponentRestrictions({ country: "PE" });
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location?.lat() || 0;
        const lng = place.geometry.location?.lng() || 0;

        setCenter({ lat, lng }); // Cambia el centro del mapa al buscar una ubicación
        setMarkerPosition({ lat, lng }); // Actualiza la posición del marcador
        onSelectLocation(lat.toString(), lng.toString());
      }
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // Actualiza solo la posición del marcador
      setMarkerPosition({ lat, lng });

      // Notifica al componente padre las coordenadas seleccionadas
      onSelectLocation(lat.toString(), lng.toString());
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={{ height: "300px", width: "100%" }}
        zoom={18}
        center={center} // Mantiene el centro al buscar, pero no lo cambia al hacer clic
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          draggableCursor: "default", // Cursor normal
          draggingCursor: "grab", // Cursor mientras arrastras el mapa
        }}
        onClick={handleMapClick} // Detecta clics en el mapa
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Buscar ubicación"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `300px`, // Más ancho
              height: `40px`, // Más alto
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `16px`, // Texto más grande
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "20px", // Alineado a la izquierda
              top: "10px",
            }}
          />
        </Autocomplete>
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </div>
  );
};

export default LocationPicker;
