

const initialState = {
    selectedCountry: 'Worldwide',
    countryInfo: {},
    mapCenter: [34.80746, -40.4796],
    mapZoom: 3,
    tableData: [],
    mapCountries: [],
    pieData: [0, 0, 0]
  };
  
  const countryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_COUNTRY':
        return { 
          ...state, 
          selectedCountry: action.payload.country,
          countryInfo: action.payload.info
        };
      case 'SET_TABLE_DATA':
        return { ...state, tableData: action.payload };
      case 'SET_MAP_COUNTRIES':
        return { ...state, mapCountries: action.payload };
      case 'SET_MAP_CENTER':
        return { ...state, mapCenter: action.payload };
      case 'SET_MAP_ZOOM':
        return { ...state, mapZoom: action.payload };
      case 'SET_PIE_DATA':
        return { ...state, pieData: action.payload };
      default:
        return state;
    }
  };
  
  export default countryReducer;
  