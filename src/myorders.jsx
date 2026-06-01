import { useState } from "react";

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Processing", "Shipped", "Delivered"];
  //here we take tabs as hardcoded but we will call this from backend

  return (
    <div className="bg-[#141212] w-screen">
        <div id="heading" className="mt-7 ml-6">
            <h1 className="text-white text-4xl font-sans font-semibold">My<span className="text-red-400 ml-2.5">Orders</span></h1>
            <p className="text-gray-100/50 mt-2 text-md font-sans ml-1">Track and manage your purchases</p>
        </div>

        <div id="ordertabs" className="mt-10 flex gap-2 mb-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-[14px] p-1 w-fit ml-6">
            {tabs.map((i) => (
                <button key={i} onClick={() => setActiveTab(i)} className={`rounded-[10px] px-4 py-2 text-xs cursor-pointer transition-all duration-200 ${
                    activeTab === i ? "bg-red-400 text-white font-semibold" : "bg-transparent text-[#666] font-normal"
                }`}>{i}
                </button>
            ))}
        </div>
    </div>
  );
};

export default MyOrders;