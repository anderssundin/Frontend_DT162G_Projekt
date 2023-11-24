import { useState, useContext, useEffect } from "react";
import { Context } from '../store/userCredentials';
import { useNavigate } from "react-router-dom";

const Login = () => {


    // Constant for usehistory
    const navigate = useNavigate();
    // Set constants to hold inputdata
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userState, setUserState] = useContext(Context);




    // function to handle submit and passing data to backend
    const handleSubmit = async (event) => {
        event.preventDefault();


        const url = 'http://localhost:3000/users/login';
        // Post request to backend usind fetch

        const data = {
            email: userEmail,
            password: password
        }
        console.log(data);
        try {
            const response = await fetch(url, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();

                // Set user state to hold new information
                setUserState(prevState => ({
                    ...prevState,
                    name: result.name,
                    email: result.email,
                    startWeight: result.startWeight,
                    goalWeight: result.goalWeight,
                    isLoggedIn: true
                }));

                // Navigate user to dashboard
                navigate("/dashboard");
            } else {
                console.log('Fel användarnamn eller lösernord');
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    // useEffect för att observera ändringar i userState
    useEffect(() => {
        console.log("Uppdaterat userState:", userState);
    }, [userState]); // Detta hook körs varje gång userState ändras
    return (
        <>

            <div className="login-container flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="login-signup bg-primary-green p-10 rounded-l-lg text-center">
                    <h2 className=" text-3xl">Inget konto?</h2>
                    <div className="mt-4 text-blue-700">
                    <a href="">Skapa konto</a>
                    </div>
                </div>
                <div className="login-form bg-secondary-green p-5 rounded-r-lg">

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Epost:</label>
                        <br />
                        {/* Ask for email and save input to constant */}
                        <input type="email" id="email" placeholder="Epost" onChange={(e) => setUserEmail(e.target.value)} />
                        <br />

                        <label htmlFor="password">Lösenord:</label>
                        <br />
                        {/* Ask for password and save input to constant */}
                        <input type="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <div className="flex justify-center items-center ">
                            <input type="submit" value={"Logga in"} className="text-sm bg-lime-600 rounded-md px-2 py-1 mx-4 my-2 transition-all hover:cursor-pointer hover:bg-lime-500" />
                        </div>
                    </form>
                </div>

            </div>

        </>
    );
}

export default Login;