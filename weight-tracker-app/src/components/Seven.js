import { useState, useContext, useEffect } from "react";
import { Context } from '../store/userCredentials';

const Seven = () => {
    const [lastSeven, setLastSeven] = useState(null);
    const URL = 'http://localhost:3000/data/userseven';
    const [userState, setUserState] = useContext(Context);


    //-----------
    //FETCH DATA
    //-----------
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
                    console.log(result);
                    setLastSeven(result);
                    //------------------------
                    // LOOP TROUGH LAST SEVEN
                    //------------------------

                    // Get formated date
                    // const newDateArr = lastSeven.map((element) => {
                    //     let d = new Date(element.timestamp);
                    //     return `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()}`;
                    // });


                } else {
                    console.log('Fel vid kontakt med databas');
                }
            } catch (error) {
                console.error('Kunde inte hämata data:', error);
            }
        };

        fetchData();

    }, [userState.email]);



    // See if lastseven is set before maping over array
    const listItems = lastSeven && lastSeven.map((lastSeven) =>
        <li key={lastSeven._id}>{lastSeven.timestamp.slice(0, 10)} {lastSeven.weight} <button>Red</button> <button>Rad</button></li>)


    return (


        <div className=" w-52 h-52 bg-slate-50">
            <ul>
                {listItems}
            </ul>
        </div>
    );
}

export default Seven;