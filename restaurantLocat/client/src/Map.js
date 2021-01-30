import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import axios from "axios";

function Map() {
  const [mapData, setMapData] = useState([]);
  const [selectedRest, setSelectedRest] = useState(null);
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/rests",
    }).then((res) => {
      setMapData(res.data.restaurants);
    });
  }, []);

  console.log(mapData);
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
    >
      {mapData.map((obj) => (
        <Marker
          key={obj._id}
          position={{ lat: Number(obj.latitude), lng: Number(obj.longitude) }}
          onClick={() => {
            setSelectedRest(obj);
          }}
        ></Marker>
      ))}

      {selectedRest && (
        <InfoWindow
          position={{
            lat: Number(selectedRest.latitude),
            lng: Number(selectedRest.longitude),
          }}
          onCloseClick={() => setSelectedRest(null)}
        >
          <div>
            <h2>{selectedRest.name}</h2>
            <p> longitude : {selectedRest.longitude}</p>
            <p> latitude: {selectedRest.latitude} </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
