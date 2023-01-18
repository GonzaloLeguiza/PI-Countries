

const initialState = {
    countries : [],
    allCountries : [],
    sortCountries: [],
    activities: [],
    sortActivities:[],
    detail: [],
    myCountry: []
}

function rootReducer(state=initialState, action) {
    switch(action.type){
        case 'GET_COUNTRIES':
            return {
                ...state,
                 countries:action.payload,
                // allCountries : action.payload,
                sortCountries : action.payload
            }
        case 'FILTER_BY_CONTINENT':
            console.log('payloadCont ' + action.payload);
            const allCountries =state.allCountries;
            const continentFiltered = action.payload === 'All'? allCountries : allCountries.filter(el => el.continente === action.payload)
            return{
                ...state,
                countries:continentFiltered
                
            }
        case 'GET_ACTIVITIES':
            return {
                ...state,
                activities :action.payload,
                sortActivities : action.payload
            }

        case 'FILTER_ACTIVITY':
            console.log('payloadAct: ' +action.payload)
      
            const countriesAct = state.sortCountries.filter((pais) => pais.Activities.length > 0);  
      
            let array = [];
      
            for (let i = 0; i < countriesAct.length; i++) {
              for (let j = 0; j < countriesAct[i].Activities.length; j++) {
                if (countriesAct[i].Activities[j].nombre === action.payload) {
                  array.push(countriesAct[i]);
                }
              }
            }
            return {
              ...state,
              countries : action.payload === 'All' ? state.sortCountries : array
            }

            case 'GET_COUNTRY_NAME':
                return{
                    ...state,
                    countries: action.payload
                }

            case 'SORT_COUNTRY_POB':
                return{
                    ...state,
                    countries:action.payload === 'Asc' ? state.countries.sort((a,b) => a.population - b.population) : state.countries.sort((a,b) => b.population - a.population)
                }
            case 'FILTER_CONTINENT':
                const allCountries2 = state.countries;
                let filtered;
                if(action.payload !== 'All')filtered = allCountries2.filter((c) => c.continente === action.payload)

                return {
                    ...state,
                    countries: action.payload === 'All'? allCountries2 : filtered
                }

                case 'POST_ACTIVITY':
                    console.log('payload post:' + action.payload)
                    return {
                      ...state,
                    }
                case 'GET_DETAIL':
                    return {
                        ...state,
                        detail : action.payload
                    }



            default: return state;
    }
}

export default rootReducer;







// const initialState = {
//     countries : [],
//     allCountries : [],
//     Activities: [],
//     page: 1,
//     currentPage : 1
// }
//  const countriesPerPage = 10;

// function rootReducer(state=initialState, action) {
//     switch(action.type){
//         case 'GET_COUNTRIES':
//             return {
//                 ...state,
//                 countries:action.payload,
//                 allCountries : action.payload
//             }
//         case 'FILTER_BY_CONTINENT':
//             console.log('payloadCont ' + action.payload);
//             const allCountries =state.allCountries;
//             const continentFiltered = action.payload === 'All'? allCountries : allCountries.filter(el => el.continents[0] === action.payload)
//             return{
//                 ...state,
//                 countries:continentFiltered
                
//             }
//         // case 'GET_ACTIVITY':
//         //     return {
//         //         ...state,
//         //         activities :action.payload,
//         //         sortActivities : action.payload
//         //     }





//         case 'FILTER_ACTIVITY':
//             const allCountries2 =state.allCountries;
//             const createdFilter = action.payload === 'All' ? allCountries2 : allCountries2.filter(e => e.Activities && e.Activities.some(a => a.nombre === action.payload))
//             return {
//                 ...state,
//                 countries : createdFilter,
//                 page : Math.ceil(createdFilter.length/countriesPerPage),
//                 currentPage :1
//             }



//             default: return state;
//     }
// }

// export default rootReducer;