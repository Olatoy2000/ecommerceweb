import { useDisclosure } from "@mantine/hooks";
import router from "next/router";
import React from "react";
import OpenLoginModal from "./OpenLoginModal";

import PrimaryButton from "./PrimaryButton";


const LandingPage = () => {

  const [loginOpened, { open: openLogin, close: closeLogin }] = useDisclosure(false);
 
  
return ( 
    <section
      className="h-screen w-full bg-[]">
      <section className="flex flex-col h-screen px-[clamp(1rem,6vw,6rem)] w-[90%] mx-auto">    
          <article className="grid grid-flow-row relative font-['Switzer'] ">
            <img
              src="./new-car-logo.jpeg"
              alt="car-logo"
              className="w-[100px] mt-[50px] place-self-start"
            />
            <div className="flex flex-col items-center place-self-center gap-[70px]">
            <div className="flex flex-col gap-10 min-[500px]:w-[500px]">
                <h1 className="font-['Switzer'] text-[50px] leading-[79px]">
                  <span className="block font-normal">Welcome to Our</span>
                  <span className="text-[] font-bold">E-Commerce Website</span>
                </h1> 
              </div>
              <div className="flex flex-col gap-7 text-[18px]">
                <p>Click on either of the buttons below to shop with us</p>
                <div className="flex justify-between items-center">
                <button 
                  onClick={()=> router.push("/register")}
                className="bg-[#289061]  rounded-md px-3 py-2 text-[14px] text-white">Register Now</button>
                <PrimaryButton 
                onClick={() => {
                   openLogin()
                }}  
                text="Login" />
              </div>
              </div>
            </div>          
          </article>
      </section>
      <OpenLoginModal
       loginOpened={loginOpened}
       closeLogin={closeLogin}
       />
    </section>
  );
};

export default LandingPage;
