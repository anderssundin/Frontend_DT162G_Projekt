import Navbar from '../components/Navbar';
import Overview from '../components/Overview';
const Dashboard = () => {
    return ( 
        <>
        <div className=' bg-dashboard-grey flex'>
       
        <Navbar />
        <Overview />
        </div>
        </>
     );
}
 
export default Dashboard;
