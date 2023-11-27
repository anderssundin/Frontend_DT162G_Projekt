import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from '../store/userCredentials';
const MyAccount = () => {
    const [userState, setUserState] = useContext(Context);
    const [startW, setStartW] = useState(userState.startWeight);
    const [goalW, setGoalW] = useState(userState.goalWeight);
    const [success, setSuccess] = useState(false);
    const URL = 'http://localhost:3000/users/update';
    //-------------------------
    //ADD NEW WEIGHTS FOR USER
    //-------------------------
    const addW = async (e) => {
        e.preventDefault();
        try {
            // Define data
            const data = {
                userEmail: userState.email,
                startWeight: startW,
                goalWeight: goalW
            }

            const response = await fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Set new value to userState
                setUserState(prevState => ({
                    ...prevState,
                    startWeight: startW,
                    goalWeight: goalW
                }));
                setSuccess(true);

            } else {
                console.log('Fel vid kontakt med databas');
            }
        } catch (error) {
            console.error('Kunde inte hämata data:', error);
        }
    };



    const setStartValue = (e) => {
        setStartW(e.currentTarget.value);

    }
    const setGoalValue = (e) => {
        setGoalW(e.currentTarget.value);
    }


    return (
        <>
            <div className=' bg-dashboard-grey flex flex-col md:flex-row relative w-full'>
                <section className='md:relative left-0 top-0'>
                    <Navbar />
                </section>
                <main className='flex flex-1 flex-col mt-20'>
                    <section className="p-10 bg-slate-200 my-4 w-full md:my-0 md:w-2/5 rounded-md shadow-md mx-auto">
                        <h1 className='text-2xl font-bold ml-5'> Mitt konto</h1>
                        {success && <p className=" text-green-600">Dina vikter är ändrade!</p>}
                        <form onSubmit={addW} className='flex flex-col'>
                            <label htmlFor="startW'" className='font-semibold text-sm mt-3'>Ange ny startvikt:</label>
                            <input type="number" id="startW" defaultValue={userState.startWeight} onChange={setStartValue} />

                            <label htmlFor="goalW" className='font-semibold text-sm mt-3'>Ange ny målvikt:</label>
                            <input type="number" id="goalW" defaultValue={userState.goalWeight} onChange={setGoalValue} />


                            <input type="submit" className='my-5 bg-primary-green py-2 rounded-md shadow-sm hover:bg-secondary-green hover:cursor-pointer' />
                        </form>

                        <Link to="/dashboard" className='text-xl text-cyan-600 text-center block'>Avbryt</Link>
                    </section>
                </main>
            </div>
        </>
    );
}

export default MyAccount;