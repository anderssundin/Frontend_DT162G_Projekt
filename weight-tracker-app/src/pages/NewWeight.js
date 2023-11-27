import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from '../store/userCredentials';
import { useNavigate } from "react-router-dom";



const NewWeight = () => {
    const URL = 'http://localhost:3000/data/';
    const [userState, setUserState] = useContext(Context);
    const [userWeight, setUserWeight] = useState(0);
    const navigate = useNavigate();

    const setValue = (e) => {
        setUserWeight(e.currentTarget.value);

    }
    //----------------
    // ADD NEW WEIGHT
    //----------------
    const addWeight = async (e) => {
        e.preventDefault();
        try {
            const data = {
                userEmail: userState.email,
                weight: userWeight,
                timestamp: new Date()
            };

            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                navigate("/dashboard");

            } else {
                console.log('Fel vid kontakt med databas');
            }
        } catch (error) {
            console.error('Kunde inte hämata data:', error);
        }
    };



    return (
        <>
            <div className=' bg-dashboard-grey flex relative '>
                <section className='relative left-0 top-0'>
                    <Navbar />
                </section>
                <main className='flex flex-1 flex-col mt-20'>
                    <section className="p-10 bg-slate-200 my-4 md:my-0 md:w-2/5 rounded-md shadow-md mx-auto">
                        <h1 className='text-2xl font-bold ml-5'> Lägg till ny vikt</h1>
                       
                            <form onSubmit={addWeight} className='flex flex-col'>
                                <label htmlFor="newWeight" className='font-semibold text-sm mt-3'>Ange ny vikt:</label>
                                <input type="number" value={userState.weight} onChange={setValue} />
                                <input type="submit" className='my-5 bg-primary-green py-2 rounded-md shadow-sm hover:bg-secondary-green hover:cursor-pointer' />
                            </form>
                       
                        <Link to="/dashboard" className='text-xl text-cyan-600 text-center block'>Avbryt</Link>
                    </section>
                </main>
            </div>
        </>
    );
}

export default NewWeight;