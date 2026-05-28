import bg from "./images/signupbg.PNG"
import logo from "./images/app logo.png"
import twitter from "./images/twitter logo.png";
import facebook from "./images/facebook logo.png";
import instagram from "./images/instagram logo.png"

import { Link,useNavigate} from "react-router";
import axios from "axios";
import { useState } from "react";

import { signupurl,loginurl } from './utils/constants';

const SignUp = ()=>{

    const [open,setopen] = useState(false);
    const [mode, setMode] = useState("signup");
    const [userName,setuserName] = useState("");
    const [mobile,setmobile] = useState("");
    const [otp,setotp] =useState("");
    const [showotp,setshowotp]=useState(false);
    const [err,seterr]=useState(false);
    const [otperr,setotperr]=useState(false);

    const navigate = useNavigate();

    const handleSignup = async () =>{
        try{
            await axios.post(signupurl,{userName,mobile},{withCredentials:true});
            navigate("/home")
        }
        catch(err){
            console.error(err);
        }
    }

    const handleLogin=async ()=>{
        seterr(false);
        try{
            await axios.post(loginurl,{mobile},{withCredentials:true});
            //console.log(res);
            setshowotp(true);
        }
        catch(err){
            console.error(err);
            seterr(true);
        }
    }

    const checkOtp =()=>{
        if(otp==="0000")
        {
            navigate("/home");
        }
        else{
            setotperr(true);
        }
    }


    return(
        <div className="relative">
            <img id="bg-image" src={bg} className="w-full h-screen" />
            <div id="button" className="absolute left-15 top-110">
                <button onClick={()=>{
                    setopen(true);
                     setMode("signup");}} className="border border-gray-400 text-gray-100 bg-black px-4 py-2 rounded-xl hover:cursor-pointer text-md font-semibold font-sans">SHOP NOW →
                </button>
            </div>

            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="w-110  bg-black/20 rounded-xl border border-gray-400 backdrop-blur-xl">
                        <img src={logo} className="w-14 h-14 mt-6 mx-auto"/>
                        <button onClick={()=>setopen(false)} to="/" className="hover:cursor-pointer absolute top-2 right-3 text-2xl font-medium scale-x-[1.5] scale-y-[1.3] mr-3 mt-1 text-gray-200">x</button>
                        <h1 className="text-center text-gray-200 mt-3 text-3xl font-sans font-semibold">{mode === "signup" ? "Welcome to Snikket" : "Welcome Back"}</h1>
                        <p className="text-center text-gray-400 text-lg font-serif font-medium">{mode === "signup" ? "Built for the bold." : "Your style awaits."}</p>
                        <div className="mt-10 space-y-4">
                            {mode=="signup" ?(
                                <>
                                    <div className="flex items-center bg-[#333032] border border-gray-500/40 rounded-lg px-4 py-3 backdrop-blur-md ml-5 mr-5">
                                        <svg className="w-5 h-5 text-gray-100/70 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
                                        </svg>
                                        <input type="text" value={userName} onChange={(e) => setuserName(e.target.value)} required placeholder="Username" className="bg-transparent outline-none text-gray-200 w-full placeholder-gray-100/50"/>
                                    </div>
                            
                                    <div className="flex items-center bg-[#333032] mt-6 border border-gray-500/40 rounded-lg px-4 py-3 backdrop-blur-md ml-5 mr-5">
                                        <svg className="w-5 h-5 text-gray-100/70 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6.6 10.8c1.6 3.1 4.5 5.9 7.6 7.6l2.5-2.5c.3-.3.8-.4 1.2-.2 1 .4 2.1.7 3.2.7.7 0 1.2.5 1.2 1.2V21c0 .7-.5 1.2-1.2 1.2C10.7 22.2 1.8 13.3 1.8 2.4 1.8 1.7 2.3 1.2 3 1.2h3.2c.7 0 1.2.5 1.2 1.2 0 1.1.2 2.2.7 3.2.2.4.1.9-.2 1.2L6.6 10.8z"/>
                                        </svg>
                                        <input type="tel" value={mobile} onChange={(e) => setmobile(e.target.value)} required placeholder="Mobile Number" className="bg-transparent outline-none text-gray-200 w-full placeholder-gray-100/50"/>
                                    </div>
                                    <div>
                                        <button onClick={handleSignup} className="text-gray-200 bg-[#1a1a1a] rounded-xl mt-7 text-md font-semibold font-sans ml-37 px-4 py-2 border border-gray-400 hover:cursor-pointer hover:text-red-400">Get Started →</button>
                                    </div>
                                </>
                            ):(
                                <>
                                    <div>
                                        <h1 className="text-lg ml-6 font-sans font-medium text-gray-200">Enter your registered mobile number</h1>
                                    </div>
                                    {err && (
                                        <div>
                                            <p className="ml-6 text-md font-sans text-red-400">*Incorrect mobile number*</p>
                                        </div>
                                    )}
                                    <div className="flex items-center bg-[#333032]  border border-gray-500/40 rounded-lg px-4 py-3 backdrop-blur-md ml-5 mr-5">
                                        <svg className="w-5 h-5 text-gray-100/70 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6.6 10.8c1.6 3.1 4.5 5.9 7.6 7.6l2.5-2.5c.3-.3.8-.4 1.2-.2 1 .4 2.1.7 3.2.7.7 0 1.2.5 1.2 1.2V21c0 .7-.5 1.2-1.2 1.2C10.7 22.2 1.8 13.3 1.8 2.4 1.8 1.7 2.3 1.2 3 1.2h3.2c.7 0 1.2.5 1.2 1.2 0 1.1.2 2.2.7 3.2.2.4.1.9-.2 1.2L6.6 10.8z"/>
                                        </svg>
                                        <input type="tel" value={mobile} onChange={(e) => setmobile(e.target.value)} required placeholder="Mobile Number" className="bg-transparent outline-none text-gray-200 w-full placeholder-gray-100/50"/>
                                    </div>
                                    {showotp &&(
                                        <>
                                        {otperr &&(
                                            <div>
                                                <p className="ml-6 text-md font-sans text-red-400">*Incorrect OTP*</p>
                                            </div>
                                        )}
                                        <div className="flex items-center bg-[#333032] mt-6 border border-gray-500/40 rounded-lg px-4 py-3 backdrop-blur-md ml-5 mr-5">
                                            <svg className="w-5 h-5 text-gray-200 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.66 0 3-1.34 3-3V6a3 3 0 10-6 0v2c0 1.66 1.34 3 3 3zm-7 2a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2v-5a2 2 0 00-2-2H5z"/>
                                            </svg>
                                            <input type="tel" value={otp} onChange={(e) => setotp(e.target.value)} required placeholder="Enter OTP" className="bg-transparent outline-none text-gray-200 w-full placeholder-gray-200"/>
                                        </div>
                                        <p className="text-center text-gray-400 ">Didn’t receive the OTP? <span className="underline text-red-400 hover:cursor-pointer ml-1">Click to Resend</span></p>
                                    </>
                                    )}
                                    <div>
                                        <button onClick={showotp ? checkOtp : handleLogin}  className="text-gray-200 bg-[#1a1a1a] rounded-xl mt-3 text-md font-semibold font-sans ml-37 px-4 py-2 border border-gray-400 hover:cursor-pointer hover:text-red-400">{showotp ? "Submit OTP →" : "Get OTP →"}</button>
                                    </div>
                                </>
                            )}
                        </div>
                        
                        <h1 className="text-center text-gray-400 mt-5 mb-8">{mode === "signup" ? "Already an User?" : "New User?"}<span>
                            <button onClick={()=>{
                                setopen(true);
                                setMode(prev => (prev === "signup" ? "login" : "signup"));//prev means value of mode before click and it says if value of mod===signup than chnage to login else change to signup
                            }} className="underline text-red-400 hover:cursor-pointer ml-1">Click
                            </button></span> {mode === "signup" ? "to Login" : "to Signup"}</h1>
                    </div>
                </div>
            )}

            <div id="app logo" className="absolute left-5 top-7">
                <img src={logo} className="h-19 w-24"/>
            </div>

            <div id="appname" className="absolute top-11.5 left-31 text-3xl font-bold font-sans text-gray-100">
                <h1>Snikket</h1>
            </div>
            
            <div id="slidebars" className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute right-0 top-[24%]  bg-linear-to-r from-gray-800/80 to-gray-600/70 backdrop-blur-sm border border-gray-400/20 text-white px-8 py-3 text-xl font-bold tracking-[4px] shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-l-xl" style={{ animation: "slideText 1s ease-out forwards"}}>NEW COLLECTION</div>
                
                <div className="absolute right-0 top-[34%] bg-linear-to-r from-gray-800/80 to-gray-600/70 backdrop-blur-sm border border-gray-400/20 text-white px-8 py-3  text-xl font-bold tracking-[4px] shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-l-xl" style={{ animation: "slideText 1s ease-out 0.3s forwards"}}>STREET FASHION</div>

                <div className="absolute right-0 top-[44%] bg-linear-to-r from-gray-800/80 to-gray-600/70 backdrop-blur-sm border border-gray-400/20 text-white px-8 py-3  text-xl font-bold tracking-[4px] shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-l-xl" style={{ animation: "slideText 1s ease-out 0.6s forwards"}}>LIMITED DROP</div>
                
                <div className="absolute right-0 top-[54%] bg-linear-to-r from-gray-800/80 to-gray-600/70 backdrop-blur-sm border border-gray-400/20 text-white px-8 py-3  text-xl font-bold tracking-[4px] shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-l-xl" style={{ animation: "slideText 1s ease-out 0.9s forwards" }}>PREMIUM STYLE</div>
            </div>

            <style>
                {`@keyframes slideText {
                    0%{
                        transform: translateX(120%);
                        opacity: 0;
                    }
                    100%{
                        transform: translateX(0%);
                        opacity: 1;
                    }
                  }
                `}
            </style>

            <footer className="bg-[#0f0f0f] pt-9">
                <ul className="flex justify-center">
                    <li><Link className="mr-4 text-[#9b9b9b] hover:underline">About us</Link></li>
                    <li><Link className="mr-4 text-[#9b9b9b] hover:underline">Contact</Link></li>
                    <li><Link className="mr-4 text-[#9b9b9b] hover:underline">Terms of use</Link></li> 
                    <li><Link className="mr-4 text-[#9b9b9b] hover:underline">Cookies</Link></li> 
                    <li><Link className="text-[#9b9b9b] hover:underline">Privacy</Link></li> 
                </ul>

                <div className="flex justify-center mt-11">
                    <a href="https://x.com/"><img src={twitter} className="w-9 h-9 mr-8"/></a>
                    <a href="https://www.instagram.com/?hl=en"><img src={instagram} className="w-9 h-9 mr-8"/></a>
                    <a href="https://www.facebook.com"><img src={facebook} className="w-9 h-9"/></a>
                </div>

                <p className="text-[#9b9b9b] text-center mt-11 pb-15">Copyright © {new Date().getFullYear()} - All right reserved by Snikket Industries Ltd</p>

            </footer>
        </div>
    )
}

export default SignUp;