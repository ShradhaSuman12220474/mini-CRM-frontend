import Navbar from "../components/Navbar";
import BannerImage from "../assets/banner.jpg";

import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    function handleClick(){
        
        navigate('/login');
    }
    return <>
        
        <Navbar></Navbar>
        <div className="w-full h-[40arem] relative">
            <img src={BannerImage} alt="" 
            className="w-full h-full"
            />


            <div className="absolute top-20 left-0 right-0 mx-auto w-[60rem]">
                <div className="flex flex-col gap-4">

                    <div className="font-semibold text-5xl text-white">
                        Transform your Bussiness to next level !!
                    </div>

                    <div className="font-semibold text-sm text-white text-center">
                        CRM designed to provide inner Insight
                    </div>

                    <div className="flex justify-center">
                        <button className="btn btn-outline text-white"
                            onClick={handleClick}
                        >SignIn</button>
                    </div>

                </div>
            </div>
        </div>
    </>
};

export default Home;
