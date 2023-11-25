import { useState, useContext, useEffect } from "react";
import { Context } from '../store/userCredentials';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';


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
        <div className=" bg-secondary-green flex  justify-around max-w-md my-2 py-2 rounded-md shadow-md font-bold" key={lastSeven._id}>
            <div>{lastSeven.timestamp.slice(0, 10)}</div>
            <div>Vikt: {lastSeven.weight}</div>
            <div><button><EditOutlinedIcon></EditOutlinedIcon></button></div>
            <div><button><DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon></button></div>
        </div>
    );

    return (


        <div className=" p-10 bg-slate-50 w-2/5 rounded-md shadow-md">
            <h2 className="mb-3 text-2xl font-bold">Senaste 7 loggarna</h2>
            <div className="flex flex-col">
                {listItems}
            </div>
        </div>
    );
}

export default Seven;