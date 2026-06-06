import { Link } from "react-router";
import { useState,useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router";

import { getcarturl,clearcarturl,removeitemurl,getloginuserurl,addcartbillcoins } from "./utils/constants";
import empty from "../src/images/empty cart.png";
import Header from './header';

const Cart =()=>{

    const [cart,setcart] =useState([]);
    const [loading, setLoading] = useState(true);
    const [loguser,setloguser]=useState("");

    const navigate = useNavigate();
 
    //we will send curruser id from front end only because if we get loggeduser id from middleware in delete api we get toekn issue

    //we will use reduce function to make similar elements with numbers 
    const groupSimilarItems = cart.reduce((acc, item) => {
        const key = item.itemName + item.size + item.color;
        if (acc[key]) {
            //if key in acc exists means a similar item found
            acc[key].quantity += 1;
        }else {
            //when new item we set quantity as 1
            acc[key] = { ...item, quantity: 1 };
        }
        return acc;
    }, {});

    const groupedItems = Object.values(groupSimilarItems);//converts object into array

    const clearcart=async()=>{
        try{
            await axios.post(clearcarturl,{},{withCredentials:true});
            await axios.post(addcartbillcoins,{cartBill:0,cartCoins:0 },{withCredentials:true});
            setcart([]);
        }
        catch(err){
            console.error(err);
        }
    }

    const addCartBillCoins =async()=>{
        try{
            await axios.post(addcartbillcoins,{cartBill:cart.reduce((acc, item) => acc + item.price, 0),cartCoins:Math.floor(cart.reduce((acc, item) => acc + item.price, 0)/10) },{withCredentials:true});
            navigate("/address")
        }
        catch(err){
            console.error("Add to cart error:", err.response?.data || err.message);
        }
    }

    const removeItem=async(id,loguser)=>{
        try{
            await axios.post(removeitemurl,{deleteobjid:id,loguser: loguser},{withCredentials:true});
            setcart(prev => prev.filter(item => item._id !== id));
        }
        catch(err){
            console.error(err);
        }
    }

    //api to get cart data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(getcarturl, { withCredentials: true });
                setcart(res?.data);
            } 
            catch (err){
                console.error(err);
            }
            //finally block always run and it sets false only when cart state variable gets data otherwise it shows loading screen
            finally {
            setLoading(false); 
            }
        };
        fetchData();
    }, []);

    //api to get loggeduser data
    useEffect(() => {
        const getCurruser=async()=>{
            try{
                const res=await axios.get(getloginuserurl,{withCredentials:true});
                setloguser(res?.data?._id)
            }
            catch(err){
                console.error(err);
            }
        };
        getCurruser();
    }, []);

    //console.log(cart);

    //loading screen until cart state variable gets data
    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading cart...</p>
            </div>
        );
    }
    
    //if cart is empty we show this
    if(cart.length==0)
    {
        clearcart();
        return(
            <div>
                <div>
                    <Header/>
                </div>
                <div className="bg-[#1a1919] h-screen ">
                    <div className="bg-[#1a1919] pt-10">
                        <img className="w-65 m-auto h-75 pt-5 animate-bounce mt-5 shadow" src={empty}></img>
                    </div>
                    <div className="font-bold text-xl text-center p-2 text-red-400">Your cart is empty</div>
                    <div className="text-center text-white pb-8">Go to home page and start building your cart now</div>
                    <Link to="/home">
                        <button className="relative mx-auto block px-8 py-3 rounded-xl font-semibold tracking-wide text-white bg-red-400 shadow-lg shadow-red-400/30 border border-red-300 
                            transition-all duration-300 ease-out hover:bg-white hover:text-red-400 hover:cursor-pointer chover:shadow-red-400/40chover:scale-105 hover:-translate-y-1 active:scale-95 before:absolute before:inset-0 before:rounded-xl
                           before:bg-red-300/20 before:blur-xl before:opacity-0 hover:before:opacity-100 overflow-hidden">SEE LATEST TRENDS <span className="ml-2">→</span>
                        </button>
                    </Link>
                </div>
            </div>
        )
    } 
    
    //console.log(cart);

    return (
    <div>
        <Header />

        <div className="flex min-h-screen bg-gray-200">
            <div className="flex-1 px-10 py-6">
                <div className="max-w-4xl mx-auto space-y-4 ml-30">
                    {groupedItems.map((item, index) => (
                        <div key={index} className="relative flex bg-white rounded-2xl shadow-md hover:shadow-xl hover:border hover:border-red-500/90 transition overflow-hidden">
                            <div className="w-36 h-36 bg-gray-100 shrink-0">
                                <img src={item.photoUrl} alt={item.itemName} className="w-full h-full object-cover rounded-md"/>
                            </div>
                            <div className="flex-1 p-5 flex flex-col justify-between relative">
                                <div className="absolute top-4 right-5">
                                    <p className="text-lg mt-10 font-bold text-black">₹{item.price}</p>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">{item.itemName}</h2>
                                    {item.quantity > 1 && (
                                        <div className="absolute top-5 left-120 w-6 h-6 xs text-white text-sm rounded-full bg-red-400 p-4 font-semibold  flex items-center justify-center">X{item.quantity}</div>
                                    )}
                                    <p className="text-sm text-gray-500">• Fit - {item.itemType}</p>
                                    <p className="text-sm text-gray-600 mt-1"> {item.fabric}</p>
                                </div>
                                <div className="flex gap-2 mt-3 flex-wrap">
                                    <span className="px-3 py-1 text-xs bg-gray-100 rounded-full text-gray-700">{item.color}</span>
                                    <span className="px-3 py-1 text-xs bg-black text-white rounded-full">{item.size}</span>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <p className="text-xs text-gray-500">{item.boughtearlier} + sold</p>
                                    <button onClick={()=>removeItem(item._id,loguser)} className="px-4 py-2 text-sm bg-red-400 hover:cursor-pointer text-white rounded-xl hover:bg-red-500 transition">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div> 

            <div className="w-1/4 bg-linear-to-b from-black to-gray-900 rounded-2xl p-6 shadow-2xl h-fit mt-6 mr-20">
                <h2 className="text-white text-lg font-semibold mb-4">Cart Summary</h2>
                <div className="space-y-3 text-gray-300 text-sm">
                    <div className="flex justify-between">
                        <span>Total Items</span>
                        <span>{cart.length}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{cart.reduce((acc, item) => acc + item.price, 0)}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3 flex justify-between font-semibold text-white">
                        <span>Total</span>
                        <span>₹{cart.reduce((acc, item) => acc + item.price, 0)} </span>
                    </div>
                </div>
                <button onClick={addCartBillCoins} className="w-full mt-6 bg-red-400 text-white py-3 rounded-xl font-semibold hover:bg-red-500 hover:cursor-pointer transition flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 6h15l-1.5 9h-13z" /> 
                        <path d="M6 6L5 3H2" />
                        <circle cx="9" cy="20" r="1" />
                        <circle cx="18" cy="20" r="1" />
                    </svg>
                    Checkout
                </button>
                <button onClick={clearcart} className="w-full mt-3 bg-red-400 text-white py-3 rounded-xl font-semibold hover:bg-red-500 hover:cursor-pointer transition flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18" />
                        <path d="M8 6V4h8v2" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                    </svg>
                    Clear Cart
                </button>
                <p className="text-gray-100/70 font-sans font-light text-sm mt-5 ml-3">*You will get {Math.floor(cart.reduce((acc, item) => acc + item.price, 0)/10)} <span className="text-red-400">Snikket coins</span> on this purchase*</p>
            </div>

        </div>
    </div>
);
};

export default Cart;