import logo from '../images/logotyp.jpg';
import { useContext } from "react";
import { Context } from '../store/userCredentials';
import { useNavigate, Link } from "react-router-dom";
const Navbar = () => {

    const navigate = useNavigate();
    const [userState, setUserState] = useContext(Context);
    const logout = () => {
        setUserState(prevState => ({
            ...prevState,
            name: "",
            email: "",
            startWeight: "",
            goalWeight: "",
            isLoggedIn: false
        }));
        navigate("/");
    }
    return (
        <div className='flex flex-col md:w-[250px] w-full'>
           <div className="bg-primary-green">
            <img src={logo} alt="Weight tracker logotyp" className='m-auto' />
           </div>

           {/* Nav */}
           <div className=' bg-primary-green md:min-h-screen w-full'>
            <nav className=' text-left ml-4'>
                <ul>
                <li className='my-4 text-center md:text-left'>
                    <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className='my-4 text-center md:text-left'>
                    <Link to="/all-logs">Alla registreringar</Link>
                    </li>
                    <li className='my-4 text-center md:text-left'>
                       <Link to="/account">Mitt konto</Link>
                    </li>
                    <li className='my-4 text-center md:text-left'>
                       <Link to="/new-weight">Lägg till ny vikt</Link>
                    </li>
                    <li className='my-4 text-center md:text-left'>
                        <button onClick={logout}>Logga ut</button>
                    </li>
                </ul>
            </nav>
           </div>
        </div>
      );
}
 
export default Navbar;