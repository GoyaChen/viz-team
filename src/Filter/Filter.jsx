import React from 'react';
import {autocomplete_text_fields, obj_autocomplete_text_fields} from './Components/vars'
import Dropdown from './Components/Dropdown';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
const header={ "Authorization": 'Token bd233c83dceb9a0f70ffd2b47d6cd3a18a095260',
}
export const AppContext = React.createContext();

function Filter(props) {
  //originally in Dropdown.js
  const [name, setName] = React.useState(autocomplete_text_fields[0]);
  const [textInput, setTestInput] = React.useState("");
  const [dropdownOptions, setDropdownOptions] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const [label, setLabel] = React.useState([]);
  const [object, setObject] = React.useState([]);

      //******************************* The function to get all autocomplete labels*/
    
      const optionCall = async () => {
        var myHeaders = new Headers();
          myHeaders.append("Authorization", "Token bd233c83dceb9a0f70ffd2b47d6cd3a18a095260");
  
          var formdata = new FormData();
          formdata.append("voyage_dates__date_departed_africa", "");
  
          var requestOptions = {
            method: 'OPTIONS',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };
  
          fetch("https://voyages3-api.crc.rice.edu/voyage/?hierarchical=False", requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log('666666666666',result)
              var array_result = []
              
              for(var i in result){
                array_result.push([i,result[i]])
              }
              console.log("🚀 ~ file: Dropdown.js ~ line 74 ~ optionCall ~ array_result", array_result)
              // Array(2)
              //   0: "voyage_itinerary__int_second_port_emb__geo_location__child_of__spatial_extent"
              //   1: {type: "<class 'rest_framework.relations.PrimaryKeyRelatedField'>", label: 'Polygon', flatlabel: 'Itinerary : Second intended port of embarkation (EMBPORT2) : Location : Child of : Polygon'}
              // length: 2
  
              // const flatlabels =  array_result.map((obj) => ({
              //             flatlabel: obj[1].flatlabel
              //           }))
              // console.log("😇 ~ file: Dropdown.js ~ line 102 ~ flatlabels ~ flatlabels", flatlabels)
              //         }
              
              const pokemon = array_result.map((obj) => ({
                name: obj[0],
                type: obj[1].type,
                label: obj[1].label,
                flatlabel: obj[1].flatlabel,
              }))
              console.log("🚀 ~ file: Dropdown.js ~ line 85 ~ pokemon ~ pokemon", pokemon)
              //{name: 'voyage_itinerary__int_second_port_emb__geo_location__child_of__spatial_extent', type: "<class 'rest_framework.relations.PrimaryKeyRelatedField'>", label: 'Polygon', flatlabel: 'Itinerary : Second intended port of embarkation (EMBPORT2) : Location : Child of : Polygon'}
  
  
              // const filteredPokemonsByType= pokemon.filter(x=>x.type==="<class 'rest_framework.fields.CharField'>");
              // console.log("🚀 ~ filteredPokemonsByType", filteredPokemonsByType)
              // 0: {name: 'voyage_itinerary__port_of_departure__geo_location__child_of__name', type: "<class 'rest_framework.fields.CharField'>", label: 'Location name', flatlabel: 'Itinerary : Port of departure (PORTDEP) : Location : Child of : Location name'}
              // 1: {name: 'voyage_itinerary__port_of_departure__geo_location__parent_of__name', type: "<class 'rest_framework.fields.CharField'>", label: 'Location name', flatlabel: 'Itinerary : Port of departure (PORTDEP) : Location : Geographic Location : Location name'}
              // 2:
  
              var flatlabels = []
              var objects = []
              
              for(var i in pokemon){
                flatlabels.push(pokemon[i]['flatlabel'])
                if (autocomplete_text_fields.includes(pokemon[i]['name'])){
                  objects.push(pokemon[i])
                }
              }
              console.log("🚀 ~ file: Dropdown.js ~ line 74 ~ optionCall ~ objects", objects)
              //3: {name: 'voyage_itinerary__port_of_departure', type: 'table', label: 'Port of departure (PORTDEP)', flatlabel: 'Itinerary : Port of departure (PORTDEP)'}
              //4: {name: 'voyage_itinerary__port_of_departure__id', type: "<class 'rest_framework.fields.IntegerField'>", label: 'ID', flatlabel: 'Itinerary : Port of departure (PORTDEP) : ID'}

              setLabel(flatlabels)
              setObject(objects)
              })
  
            .catch(error => console.log('error', error));
       }
       React.useEffect(()=> {
        optionCall()}, []);

    React.useEffect(()=>{
        const fetchData = async (name,textInput) => {
            var formdata = new FormData();
            formdata.append(name, textInput);
            console.log("🚀 ~ name, textInput", name, textInput)
            var requestOptions = {
                method: 'POST',
                headers: header,
                body: formdata,
                redirect: 'follow'
            };
            fetch("https://voyages3-api.crc.rice.edu/voyage/autocomplete", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log("🚀YAYAYAY fetch is successful!!! result", result)
                    var newOptions = result[name]
                    console.log("🚀 ~ file: Dropdown.js ~ line 43 ~ fetchData ~ newOptions", newOptions)
                    setDropdownOptions(newOptions) })
        }

        fetchData(name,textInput).catch(console.error)
    },[name,textInput])
     
      //**************************************** */

  return (
    <AppContext.Provider
    value={{
      name,
      setName,
      textInput,
      setTestInput,
      dropdownOptions,
      setDropdownOptions,
      value,
      setValue,
      label,
      object

    }}
  >

      <Dropdown data={props.data} setData={props.setData} name={name} setName={setName} textInput={textInput} setTestInput={setTestInput} dropdownOptions={dropdownOptions}
                setDropdownOptions={setDropdownOptions} value={value} setValue={setValue} label={label} object={object}/>
 
    </AppContext.Provider>
  );
}

export default Filter;
