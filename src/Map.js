import React, { useState, useEffect} from 'react';

function Map({socket, setup}) {
  
  const [drawMap, setDrawMap] = useState(setup.map);
  const [initialPosition, setInitialPosition] = useState([]);
  const [showStart, setShowStart] = useState(false); 
  const [showCleaning, setShowCleaning] = useState(false); 
  const [showFinish, setShowFinish] = useState(false); 
  const [areaCover, SetAreaCover] = useState(0);
  const [areaPercent, SetAreaPercent] = useState(0);
  const [productivity, SetProductivity] = useState(0);
  const [time, SetTime] = useState(0);

  const startPoint = (row, col, value) => {
    if (value === 1 && !showStart) {
      let tempMap = drawMap; 
      tempMap[row][col] = 3;
      setInitialPosition([row, col]);
      setDrawMap(tempMap);
      setShowStart(true);
    }
  }

  const start = () => {
    if (initialPosition.length > 0) {
      socket.emit('start', initialPosition, drawMap);
      setShowCleaning(true);
    }
  }

  const blocks = [
    'bg-white w-8 h-8', 
    'bg-orange-100 w-8 h-8 shadow-inner cursor-pointer', 
    'bg-blueGray-500 w-8 h-8 shadow-inner',
    'bg-lime-500 w-8 h-8 shadow-inner rounded-lg'
  ];

  useEffect(() => {
    socket.on('update_data', (update) => {
      setDrawMap(update.map);
      SetAreaCover(update.areaCover);
      SetAreaPercent(update.areaPercent);
      SetProductivity(update.productivity);
      setShowFinish(update.isFinish);
      SetTime(update.time);

      console.log(update)

    })
  }, [socket]);



  return (
    <div>
      <div className="flex flex-col justify-center h-screen">
        <div
          className="relative flex flex-col space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 mx-auto border border-white bg-white">
          

          <div className="flex flex-row justify-between max-w-3xl text-blueGray-700 border rounded-lg">
            <div className="w-48 h-20 flex flex-col items-center border-r">
              <div className="text-lime-700 text-3xl h-12 py-3 font-semibold">{areaCover}</div>
              <div>Covered area</div>
            </div>
            <div className="w-48 h-20 flex flex-col items-center border-r">
              <div className="text-lime-700 text-3xl h-12 py-3 font-semibold">{areaPercent} %</div>
              <div>of covered area</div>
            </div>
            <div className="w-48 h-20 flex flex-col items-center border-r">
              <div className="text-lime-700 text-3xl h-12 py-3 font-semibold">{productivity}</div>
              <div>Productivity</div>
            </div>
            <div className="w-48 h-20 flex flex-col items-center border-r">
              <div className="text-lime-700 text-3xl h-12 py-3 font-semibold">{time}</div>
              <div>Elapsed time</div>
            </div>
          </div>


          <div className="flex flex-col max-w-3xl justify-center p-4">

            {drawMap.map((group, row) => {
              return <div key={row} className="inline-flex justify-center">              
                
                {group.map((value, col) => {
                  return (
                    <div key={col} className={blocks[value]} onClick={() => startPoint(row, col, value)}></div>
                  );
                })}

              </div>
            })}

          </div>
          
          
          {!showStart ? (
            <div className="font-bold text-blueGray-700 h-10">
              Choose the starting position selecting a dirty square (yellow square)
            </div>
          ) : (
            <div className="my-2">
              {!showCleaning ? (
                <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
                  onClick={start}>
                  Start cleaning
                </button>
              ) : (
                <div className="font-bold text-green-700 h-10">
                  {!showFinish ? (
                    <div>Cleaning...</div>
                  ) : (
                    <div className="text-3xl">Task Completed!!!</div>
                  )}
                </div>
              )}

            </div>
          )}

          {showFinish && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80  transition duration-500 blur-2xl hover:scale-110">
              <img src="https://www.avidbots.com/wp-content/uploads/2021/07/Footer-Neo-2.0.1_400x457.png" alt="Finish"/>
            </div>
          )}

          
            
        </div>
      </div>
    </div>
  )
}

export default Map
