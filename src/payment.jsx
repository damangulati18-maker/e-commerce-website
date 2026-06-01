import { Link } from "react-router";

import address from "./images/address.PNG"
import { useState } from "react";

import cardimg from "../src/images/cardpay.png"
import codimg from "../src/images/cod.png"
import upiimg from "../src/images/upi.png"

const Payment=()=>{

    const [cardpay,setcardpay] = useState(false);
    const [upipay,setupipay] = useState(false);
    const [codpay,setcodpay] = useState(false);

    return(
    <div className="relative w-full min-h-screen">
        <img src={address} className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/20 z-10" />

        <div className="absolute top-1/2 left-10 -translate-y-1/2 z-20">
            <div className="w-130 bg-black backdrop-blur-3xl border border-white/30 shadow-2xl rounded-2xl p-10 ml-8">

                <div id="topbar" className=" w-full flex gap-4 z-20">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <span className="text-sm text-white">Cart</span>
                    </div>

                    <div className="w-20 h-0.5 mt-2 bg-white"></div>

                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <span className="text-sm text-white">Address</span>
                    </div>

                    <div className="w-20 h-0.5 mt-2 bg-white"></div>

                   <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-3 border-red-500 bg-black"></div>
                        <span className="text-sm text-white">Payment</span>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-white mt-7 ml-2">Payment</h1>

                <h6 className="texts-xs font-medium text-gray-200/50 mt-0.5 mb-5 ">• All transactions are secure and encrypted •</h6>

                <div id="outer box" className="flex flex-col gap-4 text-white">

                    <div id="cardpay" className=" w-109 bg-white/10 border border-white/20 rounded-lg">
                        <div className="flex">
                            <div onClick={() => {
                                setcardpay(!cardpay);
                                setcodpay(false);
                                setupipay(false);
                            }} className={`h-4 w-4 mt-6.25 ml-2 rounded-full border border-white/70 cursor-pointer transition-all duration-200 ${cardpay ? "bg-red-400" : "bg-transparent"}`}/>
                            <h1 className="text-sm text-white/70 ml-1.5 mt-6 mb-2 font-sans font-medium">Credit Card or Debit Card</h1>
                            <img src={cardimg} className="w-45 h-18 ml-12" alt="cardimage"/>
                        </div>

                        {cardpay &&(
                            <form>
                                <div className="flex items-center gap-2 mx-4 mb-4 bg-white/10 border border-white/20 rounded-lg px-3 py-2">
                                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4H4V6h16v2zm0 8H4v-6h16v6zM6 14h4v2H6v-2z" />
                                    </svg>
                                    <input type="text" placeholder="Card Number" className="w-full bg-transparent outline-none placeholder-white/60"/>
                                </div>
                                
                                <div className="flex gap-3 mb-4">
                                    <div id="expire date" className=" ml-4 flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 w-1/2">
                                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 2a1 1 0 000 2h1v1h8V4h1a1 1 0 100-2H7z"/>
                                            <path d="M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zm0 4v12h14V8H5z"/>
                                            <path d="M7 10h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM7 14h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/>
                                        </svg>
                                        <input type="text" placeholder="MM/YY"className="w-full bg-transparent outline-none placeholder-white/60"/>
                                    </div>
                                    <div id="CVV" className="mr-4 flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 w-1/2">
                                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V11a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 016 0v3H9zm3 4a2 2 0 110 4 2 2 0 010-4z" />
                                        </svg>
                                    <input type="password" placeholder="CVV" maxLength={4} className="w-full bg-transparent outline-none placeholder-white/60"/>
                                   </div>
                                </div>

                                <div className="flex items-center justify-center mb-4 mt-2">
                                    <button className="bg-red-400 px-4 font-sans font-medium hover:cursor-pointer py-2 text-center rounded-lg">Submit</button>
                                </div>
                            </form>
                        )}
                    </div>

                    <div id="upipay" className=" w-109 bg-white/10 border border-white/20 rounded-lg">
                        <div className="flex">
                            <div onClick={() =>{
                                setupipay(!upipay);
                                setcardpay(false);
                                setcodpay(false);
                            }} className={`h-4 w-4 mt-6.5 ml-2 rounded-full border border-white/70 cursor-pointer transition-all duration-200 ${upipay ? "bg-red-400" : "bg-transparent"}`}/>
                            <h1 className="text-sm text-white/70 ml-1.5 mt-6 mb-2 font-sans font-medium">Pay using upi</h1>
                            <img src={upiimg} className="w-45 h-15 ml-29 mt-3" alt="upi"/>
                        </div>

                        {upipay &&(
                            <img/>
                        )}

                    </div>

                    <div id="codpay" className=" w-109 bg-white/10 border border-white/20 rounded-lg">
                        <div className="flex">
                            <div onClick={() => {
                                setcodpay(!codpay);
                                setcardpay(false);
                                setupipay(false);
                            }} className={`h-4 w-4 mt-4.75 ml-2 rounded-full border border-white/70 cursor-pointer transition-all duration-200 ${codpay ? "bg-red-400" : "bg-transparent"}`}/>
                            <h1 className="text-sm text-white/70 ml-1.5 mt-4.5 mb-2 font-sans font-medium">Cash on delivery</h1>
                            <img src={codimg} className="w-13 h-13 ml-56" alt="cod"/>
                        </div>
                    </div>
                    
                    
                    <div className="mt-6 flex gap-4">
                        <Link to="/address" className="flex-1">
                            <button className="w-full py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white font-medium hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">← Back</button>
                        </Link>
                        <Link to="/payment" className="flex-1">
                            <button className="w-full py-3 rounded-xl bg-red-400 text-white font-semibold shadow-lg shadow-red-500/30 hover:scale-[1.02] hover:shadow-red-500/50 hover:bg-red-500 transition-all duration-300 cursor-pointer">Confirm →</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    </div>
          
    )
}

export default Payment;