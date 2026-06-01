import { useState,useEffect } from "react"
import axios from "axios";

import { shortsurl,additemurl } from "./utils/constants";
import Header from "./header";

const Shorts =()=>{

    const [items,setitems] =useState([]);
    const [selectedSize, setSelectedSize] = useState({});
    const [showNotification, setShowNotification] = useState(false);
    const [showSizeNotification, setShowSizeNotification] = useState(false);
    const [shownostock,setshownostock]=useState(false);

    //we are calling the addItem fn with argument in add to cart button
    const addItem=async(item)=>{
        //notification to show if item selected without size and setting it false after 2 sec
        if (!selectedSize[item._id]) {
            setShowSizeNotification(true);

            setTimeout(() => {
            setShowSizeNotification(false);
        }, 2000);

        return; // stop function here
        }
        try{
            if(item.instock===true){
                await axios.post(additemurl,{
                itemName: item.itemName,
                itemType: item.itemType,
                color: item.color[0],
                price: item.price,
                fabric: item.fabric,
                boughtearlier:item.boughtearlier,
                photoUrl: item.photoUrl,
                itemCategory: item.itemCategory,
                size: selectedSize[item._id]
            },{withCredentials:true});

            //console.log(res?.data);
            //setting to show itemm added notification
            setShowNotification(true);

            //setting back the show notification to false to remove it but after 2 sec 
            setTimeout(() => {
                setShowNotification(false);
            }, 2000);

            //removing the selected size of previously added item in cart from selected size state variable
            setSelectedSize((prev) => ({
                ...prev,
                [item._id]: null,
            }));
            }
            else{
                setshownostock(true);
                setTimeout(() => {
                setshownostock(false);
                }, 2000);

                setSelectedSize((prev) => ({
                ...prev,
                [item._id]: null,
            }));
            }
        }
        catch(err){
            console.error("Add to cart error:", err.response?.data || err.message);
        }
        
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(shortsurl, { withCredentials: true });
                setitems(res?.data?.data);
            } 
            catch (err){
                console.error(err);
            }
        };
        fetchData();
    }, []);

    //console.log(items);

    return(
        <div className="bg-gray-200/90">
            <Header/>

            {showNotification && (
                <div className="fixed top-6 ml-36 left-1/2 -translate-x-1/2 z-50 animate-bounce">
                    <div className="bg-black text-red-400 px-8 py-4 rounded-2xl shadow-2xl border border-black backdrop-blur-md flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="font-semibold tracking-wide text-sm sm:text-base">Item added to cart</span>
                    </div>
                </div>
            )}

            {showSizeNotification && (
                <div className="fixed top-6 ml-36 left-1/2 -translate-x-1/2 z-50 animate-shake">
                    <div className="bg-black text-red-400 px-8 py-4 rounded-2xl shadow-2xl border border-black flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="font-semibold tracking-wide text-sm sm:text-base">Please select a size first</span>
                    </div>
                </div>
            )}

            {shownostock && (
                <div className="fixed top-6 ml-36 left-1/2 -translate-x-1/2 z-50 animate-shake">
                    <div className="bg-black text-red-400 px-8 py-4 rounded-2xl shadow-2xl border border-black flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="font-semibold tracking-wide text-sm sm:text-base">Out of stock</span>
                    </div>
                </div>
            )}

            <div className="flex">
                <div className="w-72 bg-white border-r border-gray-300 min-h-screen p-6 fixed top-20">

                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-red-400">Filters</h1>
                        <button className="text-sm text-gray-500 hover:text-red-400 transition cursor-pointer">Clear All</button>
                    </div>

                    <div className="border-b border-gray-200 pb-5">

                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h2>

                        <div className="flex flex-col gap-3 text-sm text-gray-700">
                            <label className="flex items-center gap-3 cursor-pointer hover:text-red-400 transition">
                                <input type="radio" name="price" className="accent-red-400" />Under ₹500
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer hover:text-red-400 transition">
                                <input type="radio" name="price" className="accent-red-400" />₹500 - ₹1000
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer hover:text-red-400 transition">
                                <input type="radio" name="price" className="accent-red-400" />₹1000 - ₹2000
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer hover:text-red-400 transition">
                                <input type="radio" name="price" className="accent-red-400" />Above ₹2000
                            </label>
                        </div>
                    </div>

                    <div className="mt-6 border-b border-gray-200 pb-5">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Availability</h2>
                        <div className="flex flex-col gap-3 text-sm text-gray-700">
                            <label className="flex items-center gap-3 cursor-pointer hover:text-red-400 transition">
                                <input type="radio" name="availability" className="accent-red-400" />In Stock
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer hover:text-red-400 transition">
                                <input type="radio" name="availability" className="accent-red-400" />Out of Stock
                            </label>
                        </div>
                    </div>
    
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Sizes</h2>
                        <div className="flex flex-wrap gap-3">
                            {["S", "M", "L", "XL", "XXL"].map((size) => (
                                <button key={size} className="w-10 h-10 border border-gray-300 rounded-lg text-sm hover:border-red-400 hover:text-red-400 transition cursor-pointer">{size}</button>
                            ))}
                        </div>
                     </div>

                </div>

                <div className="max-w-7xl ml-72  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-6 mt-10 w-screen">
                {items.map((item, i) => (
                    <div key={i} className="bg-white shadow-md hover:shadow-xl transition overflow-hidden group mb-5">

                        <div className="overflow-hidden">
                            <img src={item.photoUrl} alt={item.itemName} className="h-58 w-full group-hover:scale-105 transition duration-500"/>
                        </div>

                        <div className="p-4">
                            <div className="flex justify-between items-start gap-3">
                                <div>
                                    <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">{item.itemName}</h2>
                                    <p className="text-xs text-gray-500 capitalize">{item.itemCategory} • {item.itemType}</p>
                                </div>
                                <span className="text-lg font-bold text-black">₹{item.price}</span>
                            </div>

                            <p className="text-sm text-gray-600 mt-2">{item.fabric}</p>

                            <div className="flex flex-wrap gap-2 mt-3">{item.color.map((clr, index) => (
                                <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded-full">{clr}</span>
                                ))}
                            </div>

                            <div className="flex gap-2 mt-3">
                                {item.size.map((size, index) => (
                                    <button key={index} onClick={() =>
                                        setSelectedSize({...selectedSize,[item._id]: size,})
                                }
                                className={`w-8 h-8 flex items-center justify-center border rounded-md text-xs font-medium cursor-pointer transition
                                ${
                                    selectedSize[item._id] === size ? "bg-black text-white border-black" : "bg-white text-black border-gray-300"
                                }`}>
                                        {size}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <span className={`text-sm font-medium ${item.instock ? "text-green-600" : "text-red-500"}`}>{item.instock ? "In Stock" : "Out of Stock"}</span>
                                <span className="text-xs text-gray-500">{item.boughtearlier}+ sold</span>
                            </div>
       
                            <button onClick={() => addItem(item)}  className="w-full mt-4 bg-red-400 text-white py-2 rounded-xl hover:bg-white hover:text-red-400 border border-red-400 transition font-medium cursor-pointer">Add to cart</button>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            
        </div>
    )
}

export default Shorts;