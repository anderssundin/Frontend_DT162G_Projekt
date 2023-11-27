import { useState, useContext, useEffect } from "react";
import { Context } from '../store/userCredentials';

const Overview = ({ updateSignal }) => {
    const [userState, setUserState] = useContext(Context);
    const [weightProgress, setWeightProgress] = useState(null);
    const [userWeight, setUserWeight] = useState(0);

  

    //------------------------------
    //Fetch data for latest weight
    //------------------------------

    const url = 'http://localhost:3000/data'; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = {
                    userEmail: userState.email
                };

                const response = await fetch(url + '/userLast', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const result = await response.json();
                 
                    setUserWeight(result[0].weight);
                    
                    //-----------------------------
                    // CALCULATE WEIGHT PROGRESS
                    //-----------------------------
                    const calcResult = result[0].weight - userState.startWeight;
                    setWeightProgress(calcResult);
                } else {
                    console.log('Fel vid kontakt med databas');
                }
            } catch (error) {
                console.error('Kunde inte hämata data:', error);
            }
        };

        fetchData(); 

    }, [userState.startWeight,userState.goalWeight, userState.email, updateSignal,]);

    return (  
        <div className="w-full">
            <section className="flex flex-col md:flex-row md:justify-around my-8">
                
                <div className="p-5 bg-secondary-green rounded-lg px-20 shadow-md">
                    <p className=" font-bold">Startvikt</p>
                    <p className="text-center text-2xl font-bold">{userState.startWeight} Kg</p>
                </div>
                <div className="p-5 bg-[#EDEBA0] rounded-lg px-20 shadow-md">
                    <p className=" font-bold">Målvikt</p>
                    <p className="text-center text-2xl font-bold">{userState.goalWeight} Kg</p>
                </div>
                <div className="p-5 bg-[#C3C48D] rounded-lg px-20 shadow-md">
                    <p className=" font-bold">Senaste vikt</p>
                    <p className="text-center text-2xl font-bold">{userWeight} Kg</p>
                </div>
                <div className="p-5 bg-[#928C6F] rounded-lg px-20 shadow-md">
                    <p className=" font-bold">Utveckling</p>
                    <p className="text-center text-2xl font-bold">{weightProgress} Kg</p>
                </div>
            </section>
        </div>
    );
}
 
export default Overview;