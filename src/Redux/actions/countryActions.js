
export const setCountry = (country, info) => ({
    type: 'SET_COUNTRY',
    payload: { country, info }
  });
  
  export const setTableData = (data) => ({
    type: 'SET_TABLE_DATA',
    payload: data
  });
  
  export const setMapCountries = (data) => ({
    type: 'SET_MAP_COUNTRIES',
    payload: data
  });
  
  export const setMapCenter = (center) => ({
    type: 'SET_MAP_CENTER',
    payload: center
  });
  
  export const setMapZoom = (zoom) => ({
    type: 'SET_MAP_ZOOM',
    payload: zoom
  });
  
  export const setPieData = (data) => ({
    type: 'SET_PIE_DATA',
    payload: data
  });
  