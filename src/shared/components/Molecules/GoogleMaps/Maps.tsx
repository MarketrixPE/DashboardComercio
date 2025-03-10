import React, { useState, useCallback } from 'react';
import { GoogleMap } from '@react-google-maps/api';

interface MapProps {
  center: { lat: number; lng: number };
  containerStyle: { width: string; height: string };
  zoom?: number;
  polygonOptions?: google.maps.PolygonOptions;
  onPolygonComplete?: (path: { lat: number; lng: number }[]) => void;
}

const Maps: React.FC<MapProps> = ({
  center,
  containerStyle,
  zoom = 13,
  polygonOptions = {
    fillColor: '#2196F3',
    fillOpacity: 0.5,
    strokeWeight: 2,
    zIndex: 1,
    editable: true,
    draggable: true,
  },
  onPolygonComplete,
}) => {
  const [, setShapes] = useState<any[]>([]);

  const handlePolygonComplete = useCallback(
    (polygon: google.maps.Polygon) => {
      const path = polygon.getPath().getArray().map(latLng => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }));

      setShapes(prevShapes => [...prevShapes, path]);

      if (onPolygonComplete) {
        onPolygonComplete(path);
      }

      polygon.setOptions(polygonOptions);
    },
    [onPolygonComplete, polygonOptions]
  );

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.POLYGON],
        },
        polygonOptions,
      });

      drawingManager.setMap(map);
      google.maps.event.addListener(drawingManager, 'polygoncomplete', handlePolygonComplete);
    },
    [handlePolygonComplete, polygonOptions]
  );

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
    />
  );
};

export default Maps;
