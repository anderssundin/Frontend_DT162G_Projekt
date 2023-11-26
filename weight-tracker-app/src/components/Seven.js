import { useState, useContext, useEffect, useRef } from "react";
import { Context } from '../store/userCredentials';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const Seven = ({onUpdate}) => {
    const [lastSeven, setLastSeven] = useState(null);
    const URL = 'http://localhost:3000/data/userseven';
    const deleteURL = 'http://localhost:3000/data/delete';
    const changeURL = 'http://localhost:3000/data/update';
    const [userState, setUserState] = useContext(Context);
    const [editValue, setEditValue] = useState(null);
    const [newEditWeight, setNewEditWeight] = useState(null);
    const editIDRef = useRef(null)

    //---------------------
    //FETCH LAST SEVEN
    //---------------------
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
                setLastSeven(result);
            } else {
                console.log('Fel vid kontakt med databas');
            }
        } catch (error) {
            console.error('Kunde inte hämata data:', error);
        }
    };


    //---------------
    // DELETE POST
    //---------------
    const deleteLog = async (e) => {
        const id = e.currentTarget.dataset.id;

        try {
            const data = {
                id: id
            };

            const response = await fetch(deleteURL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Update after deleteing log
                fetchData();
            } else {
                console.log('Fel vid kontakt med databas');
            }
        } catch (error) {
            console.error('Kunde inte hämata data:', error);
        }
    };



    //----------------
    // POPULATE FORM
    //----------------

    const populateForm = (e) => {
        const editID = e.currentTarget.dataset.id;
        const editWeight = e.currentTarget.dataset.weight;
        editIDRef.current = editID;
        setEditValue(editWeight);
    }

    //-----------------------------
    // SET NEW WEIGHT TO VARIABEL
    //-----------------------------
    const setNewWeight = (e) => {
        setNewEditWeight(e.target.value);
    }


    //--------------------
    // SUBMIT NEW WEIGHT
    //--------------------
    const submitEditWeight = async (e) => {
        e.preventDefault();

        // Get IDref
        const editID = editIDRef.current;

        // Get new weight
        const weight = newEditWeight;
       

        try {
            const data = {
                id: editID,
                weight: weight
            };

            const response = await fetch(changeURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {

                fetchData();

                // Signal to dashboard
                onUpdate();
            } else {
                console.log('Fel vid kontakt med databas');
            }
        } catch (error) {
            console.error('Kunde inte hämata data:', error);
        }
        setEditValue(null);
    };

    useEffect(() => {
        fetchData();
    }, [userState.email]);


    //--------------
    // ABORT CHANGE
    //--------------
const abortChange = () =>{
    setEditValue(null);
}

//---------------------
//LIST LAST SEVEN LOGS
//---------------------
    const listItems = lastSeven && lastSeven.map((lastSeven) =>
        <div className="bg-secondary-green flex justify-around max-w-md my-2 py-2 rounded-md shadow-md font-bold w-full" key={lastSeven._id}>
            <div>{lastSeven.timestamp.slice(0, 10)}</div>
            <div>Vikt: {lastSeven.weight}</div>
            <div><button data-id={lastSeven._id} data-weight={lastSeven.weight} onClick={populateForm}><EditOutlinedIcon /></button></div>
            <div><button data-id={lastSeven._id} onClick={deleteLog}><DeleteForeverOutlinedIcon /></button></div>
        </div>
    );

    return (
        <>
            <div className="p-10 bg-slate-50 my-4 md:my-0 md:w-2/5 rounded-md shadow-md">
                <h2 className="mb-3 text-2xl font-bold">Senaste 7 loggarna</h2>
                <div className="flex flex-col items-center">
                    {listItems}
                </div>
            </div>

            <section>
                {/* IF EDITVALUE IS TRUE, RENDER FORM */}
            { editValue && <div className="absolute top-0 left-0 z-10 opacity-95 w-full h-full bg-gray-100">
    <div className="bg-[#EDEBA0] w-1/3 z-20 ml-auto mr-auto mt-16 opacity-100 rounded-lg font-bold">
      <form onSubmit={submitEditWeight} className="flex flex-col text-center p-10">
        <label htmlFor="editWeight" className="mb-2">Ändra vikt:</label>
        <input
          type="number"
          id="editWeight"
          defaultValue={editValue}
          onChange={setNewWeight}
        />
        <input type="submit" className="my-3 bg-secondary-green rounded shadow-sm p-2 hover:bg-primary-green hover:cursor-pointer" />
        <button onClick={abortChange} className=" bg-secondary-green rounded shadow-sm p-2 hover:bg-primary-green">Avbryt</button>
      </form>
    </div>
  </div>
}
            </section>
        </>
    );
}

export default Seven;
