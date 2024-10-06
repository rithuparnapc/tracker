
import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import './Map.css';



const caseTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 200, 
      },
      recovered: {
        hex: "#7dd71d",
        multiplier: 300, 
      },
      deaths: {
        hex: "#fb4443",
        multiplier: 500, 
      },
};

const showDataOnMap = (data, caseType = "cases") =>
    data.map((country) => (
      <Circle
        key={country.country}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={caseTypeColors[caseType].hex}
        fillColor={caseTypeColors[caseType].hex}
        fillOpacity={0.4}
        radius={
          Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier
        }
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            ></div>
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Cases: {country.cases}
            </div>
            <div className="info-recovered">
              Recovered: {country.recovered}
            </div>
            <div className="info-deaths">
              Deaths: {country.deaths}
            </div>
          </div>
        </Popup>
      </Circle>
    ));
  

const MapComponent = ({ countries, caseType = "cases", center, zoom }) => {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, caseType)}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
