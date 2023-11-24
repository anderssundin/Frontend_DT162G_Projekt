import { useState, useContext, useEffect } from "react";
import { Context } from '../store/userCredentials';


const Overview = () => {
    const [userState, setUserState] = useContext(Context);
    // useEffect för att observera ändringar i userState
    useEffect(() => {
        console.log("Uppdaterat userState:", userState);
    }, [userState]); // Detta hook körs varje gång userState ändras
    return (  
        <div className="w-full">
            <section className="flex flex-col md:flex-row md:justify-around my-8">
                
                <div className="p-5 bg-secondary-green rounded-lg px-20 shadow-md">
                    <p className=" font-bold">Startvikt</p>
                    <p className="text-center text-2xl font-bold">{userState.startWeight} Kg</p>
                </div>
                <div className="p-5 bg-[#EDEBA0] rounded-lg px-20 shadow-md">
                <p className=" font-bold">Målvikt</p>
                    <p className="text-center text-2xl font-bold">{userState.goalWeight} Kg</p>
                </div>
                <div className="p-5 bg-[#C3C48D] rounded-lg px-20 shadow-md">
                <p className=" font-bold">Senaste vikt</p>
                    <p className="text-center text-2xl font-bold">75 Kg</p>
                </div>
                <div className="p-5 bg-[#928C6F] rounded-lg px-20 shadow-md">
                <p className=" font-bold">Utveckling</p>
                    <p className="text-center text-2xl font-bold">75 Kg</p>
                </div>
            </section>
        </div>
    );
}
 
export default Overview;