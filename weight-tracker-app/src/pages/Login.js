import { useState, useContext, useEffect } from "react";
import {Context} from '../store/userCredentials';
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
               
                  // Push user to dashboard
                  navigate("/dashboard");
            } else {
                console.log('Fel användarnamn eller lösernord');
            }
        }
        catch (error){
            console.log(error);
        }

    } 

    // useEffect för att observera ändringar i userState
  useEffect(() => {
    console.log("Uppdaterat userState:", userState);
  }, [userState]); // Detta hook körs varje gång userState ändras
    return (
        <>
       
        <div className="login-container">
            <div className="login-signup">
                <h2>Inget konto?</h2>
            </div>
            <div className="login-form">
            <h1>Login page</h1>
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
                <input type="submit" value={"Logga in"} />
            </form>
            </div>
            
            </div>
           
        </>
    );
}

export default Login;