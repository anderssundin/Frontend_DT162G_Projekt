import Navbar from '../components/Navbar';
import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Context } from '../store/userCredentials';
import Overview from '../components/Overview';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const AllLogs = () => {
    
    const URL = 'http://localhost:3000/data/userall'
    const [userState, setUserState] = useContext(Context);
    const [allLogs, setAllLogs] = useState(null);
    const deleteURL = 'http://localhost:3000/data/delete';
  
        const fetchAll = async () => {
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
                    setAllLogs(result);
                } else {
                    console.log('Fel vid kontakt med databas');
                }
            } catch (error) {
                console.error('Kunde inte hämta data:', error);
            }
        };
    
        useEffect( () => {
            fetchAll();
        }, []);
        
   


    //------------
    // DELETE LOG
    //------------
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
                // Update after deleting log
                fetchAll();
            } else {
                console.log('Fel vid kontakt med databas');
            }
        } catch (error) {
            console.error('Kunde inte hämata data:', error);
        }
    };

    //---------------
    // GENERATE LIST
    //---------------
    const listItems = allLogs && allLogs.map((allLogs) =>
    <div className="bg-secondary-green flex justify-around max-w-md my-2 py-2 mx-auto rounded-md shadow-md font-bold w-full" key={allLogs._id}>
        <div>{allLogs.timestamp.slice(0, 10)}</div>
        <div>Vikt: {allLogs.weight}</div>
        <div><button data-id={allLogs._id} onClick={deleteLog}><DeleteForeverOutlinedIcon /></button></div>
    </div>
);

    return (
        <>
            <div className=' bg-dashboard-grey flex flex-col md:flex-row relative w-full'>
                <section className='md:relative left-0 top-0'>
                    <Navbar />
                </section>
                <main className='flex flex-1 flex-col'>
                    <Overview />
                    <section className="p-10 bg-slate-50 my-4  w-full md:my-0 md:w-2/5 rounded-md shadow-md mx-auto">
                        <h1 className='text-2xl font-bold ml-5'>{userState.name}, här är dina loggar</h1>
                    
                    {listItems}
               
                        <Link to="/dashboard" className='text-xl text-cyan-600 text-center block'>Till Dashboard</Link>
                    </section>
                </main>
            </div>
        </>
    );
}

export default AllLogs; <>

</>