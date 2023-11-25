import Navbar from '../components/Navbar';
import Overview from '../components/Overview';
import Seven from '../components/Seven';
const Dashboard = () => {
    return ( 
        <>
        <div className=' bg-dashboard-grey flex relative '>
       <section className='relative left-0 top-0'>
        <Navbar />
        </section>
        <main className='flex flex-1 flex-col'>
        <Overview />
        <section className=' flex flex-col md:flex-row justify-around'>
        <Seven />
        
        </section>
        </main>
        </div>
        </>
     );
}
 
export default Dashboard;
