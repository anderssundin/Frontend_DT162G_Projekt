import logo from '../images/logotyp.jpg';

const Navbar = () => {
    return (
        <div className='flex flex-col w-[250px]'>
           <div className="bg-primary-green">
            <img src={logo} alt="Weight tracker logotyp" className='m-auto' />
           </div>

           {/* Nav */}
           <div className=' bg-primary-green min-h-screen'>
            <nav className=' text-left ml-4'>
                <ul>
                    <li className='my-4'>
                        <a href="#">Alla registreringar</a>
                    </li>
                    <li className='my-4'>
                        <a href="#"> Mitt konto</a>
                    </li>
                    <li className='my-4'>
                        <a href="#">Lägg till ny vikt</a>
                    </li>
                    <li className='my-4'>
                        <a href="#">Logga ut</a>
                    </li>
                </ul>
            </nav>
           </div>
        </div>
      );
}
 
export default Navbar;