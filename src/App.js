// src/App.js
import { Select, FormControl, MenuItem, Card, CardContent } from '@mui/material';
import React, { useEffect,useState } from 'react';
import './App.css';
import InfoBox from './components/InfoBox';
import MapComponent from './components/MapComponent';
import Table from './components/Table';
import PieChartComponent from './components/PieChart';
import { sortData } from './util';
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCountry, setTableData, setMapCountries, setMapCenter, setMapZoom, setPieData } from './Redux/actions/countryActions';

function App() {
  const dispatch = useDispatch();

  const countryInfo = useSelector((state) => state.country.countryInfo);
  const mapCenter = useSelector((state) => state.country.mapCenter);
  const mapZoom = useSelector((state) => state.country.mapZoom);
  const mapCountries = useSelector((state) => state.country.mapCountries);
  const tableData = useSelector((state) => state.country.tableData);
  const pieData = useSelector((state) => state.country.pieData);
  const selectedCountry = useSelector((state) => state.country.selectedCountry);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const getCountriesData = async () => {
      try {
        const response = await fetch('https://disease.sh/v3/covid-19/countries');
        if (!response.ok) throw new Error('Failed to fetch countries');
        const data = await response.json();

        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));

        dispatch(setMapCountries(data));
        dispatch(setTableData(sortData(data)));
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    getCountriesData();
  }, [dispatch]);


  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCountry('Worldwide', data));
        calculatePieData(data);
      });
  }, [dispatch]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === 'Worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (countryCode !== 'Worldwide' && data.countryInfo) {
        dispatch(setCountry(countryCode, data));
        calculatePieData(data);
        dispatch(setMapCenter([data.countryInfo.lat, data.countryInfo.long]));
        dispatch(setMapZoom(4));
      } else {
        dispatch(setCountry('Worldwide', data));
        calculatePieData(data);
        dispatch(setMapCenter([34.80746, -40.4796])); 
        dispatch(setMapZoom(3));
      }
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };


  const calculatePieData = (data) => {
    const total = data.cases;
    const cases = (data.cases / total) * 100;
    const recovered = (data.recovered / total) * 100;
    const deaths = (data.deaths / total) * 100;
    dispatch(setPieData([cases, recovered, deaths]));
  };

  return (
    <div className="App">
      <div className='app__left'>
        <div className="App-header">
          <h1>COVID TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={selectedCountry} onChange={onCountryChange}>
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {mapCountries.map((country) => (
                <MenuItem
                  key={country.countryInfo.iso3 || country.countryInfo._id}
                  value={country.countryInfo.iso2}
                >
                  {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
        <InfoBox  onClick={(e) => setCasesType("cases")} title="Coronavirus Cases"  active={casesType === "cases"} cases={countryInfo.todayCases} total={countryInfo.cases} ></InfoBox>
          <InfoBox  onClick={(e) => setCasesType("recovered")} title="Recovered"  isGreen active={casesType === "recovered"} cases={countryInfo.todayRecovered} total={countryInfo.recovered} ></InfoBox>
          <InfoBox  onClick={(e) => setCasesType("deaths")} title="Deaths"  active={casesType === "deaths"}  cases={countryInfo.todayDeaths} total={countryInfo.deaths} ></InfoBox>
        </div>
        <MapComponent countries={mapCountries} caseType="cases" center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          <PieChartComponent data={pieData} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
