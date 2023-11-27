import { useState, useContext, useEffect } from "react";
import { Context } from '../store/userCredentials';
import 'react-vis/dist/style.css';
import {
    XYPlot,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    LineSeries
} from 'react-vis';

const Trend = ({ updateSignal }) => {
    const [data, setData] = useState([]);
    const URL = 'https://weight-tracker-app.onrender.com/data/userseven';
    const [userState, setUserState] = useContext(Context);
    
    //---------------------
    //FETCH LAST SEVEN
    //---------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const data = {
                    userEmail: userState.email
                };
    
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
                if (response.ok) {
                    const result = await response.json();
                    const newData = result.map(item => ({
                        x: new Date(item.timestamp),
                        y: item.weight
                    }));
                    setData(newData);
                  
                } else {
                    console.log('Fel vid kontakt med databas');
                }
            } catch (error) {
                console.error('Kunde inte hämata data:', error);
            }
        };
   
        fetchData(); 
    
    }, [userState.email, updateSignal]);

  
    return (
        <>
            <div className="p-10 bg-slate-50 my-4 md:my-0 md:w-2/5 rounded-md shadow-md">
                <h2 className="mb-3 text-2xl font-bold">Trend</h2>
                <div className="overflow-x-scroll">

                    <XYPlot width={600} height={250}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis title="Datum"
                           tickFormat={(v) => new Date(v).toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })} />
                        <YAxis title="Vikt" />
                        <LineSeries data={data} />
                    </XYPlot>
                </div>
            </div>
        </>
    );
}

export default Trend;