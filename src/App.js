import './App.css';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import Map from './Map'

//const socket = io.connect('http://localhos:5000'); 
const socket = io.connect('https://avidbotsapp.herokuapp.com/'); 
//const socket = io.connect('http://172.17.74.231:5000'); // CHANGE WITH YOUR SERVER CONFIG

function App() {

  const iniMap = '####################\n#             ## # #\n# # ## #####   # # #\n# # ## #####  ## # #\n# #            #   #\n# # ########  #### #\n# #              # #\n# # ########  ## # #\n#                # #\n####################';

  const [rawMap, setMap] = useState(iniMap); 
  const [setup, setSetup] = useState([]); 
  const [showMap, setShowMap] = useState(false); 

  const sendMap = async () => {
    if (rawMap !== '') {
      await socket.emit('raw_map', rawMap);
    }
  };

  useEffect(() => {
    socket.on('setup_map', (setup) => {
      setSetup(setup);
      setShowMap(true);
    })
  });


  return (
    <div className="App">
      
      {!showMap ? (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center">
          <div className="flex-shrink-0">
          </div>
          <div>
            <div className="text-2xl font-medium text-blueGray-600">Welcome to Robot Cleanning Map</div>
            <p className="text-blueGray-600 pt-2">Enter your map and load it!</p>

            <div className="form-group">
              <textarea 
                className="font-mono text-center leading-none w-full text-blueGray-600 border border-blueGray-300 rounded rounded-xl my-2 p-2 focus:outline-none focus:ring-1 ring-green-300" 
                name="rawMap" 
                id="rawMap" 
                rows="15"
                defaultValue={rawMap}
                /* onKeyPress={(e) => validateChar(e)} */
                onChange={(event) => {setMap(event.target.value)}}
              >
              </textarea>
            </div>

            <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
              onClick={sendMap}
            >
              Load Map
            </button>

          </div>
        </div>
      ) : (
  
        <Map socket={socket} setup={setup} />

      )}



    </div>
  );
}

export default App;
