import oversize from "./images/oversize.jpeg";
import regular from "./images/regular.jpg"
import shorts from "./images/shorts.jpeg"
import shirts from "./images/shirt.jpg"
import denims from "./images/denim.jpg"
import joggers from "./images/joggers.jpg"


import { Link} from "react-router";

const MonthOffers = ()=>{
    return(
      <>
        {[
          { name: "Oversized T-shirts", price: "399",photo:oversize,path:"/oversized"},
          { name: "Regular T-shirts", price: "299",photo:regular,path:"/regular" },
          { name: "Shorts", price: "499",photo:shorts,path:"/shorts" },
          { name: "Shirts", price: "699",photo:shirts,path:"/shirts" },
          { name: "Denims", price: "899",photo:denims,path:"/denims" },
          { name: "Joggers", price: "799",photo:joggers,path:"/joggers" },
        ].map((item, i) => (
          <div key={i} className="bg-gray-100 rounded-xl shadow hover:shadow-2xl transition p-4">
              <div className="h-64 bg-gray-200 rounded mb-4 ml-4 mr-4 mt-1.5">
                <img src={item.photo} className="h-64 w-full rounded-md" alt="add photo"/>
              </div>
              <h3 className="font-semibold underline">{item.name}</h3>
              <p className="text-gray-600 font-serif">Starting at</p>
              <p className="text-gray-600 font-serif"><span className="font-sans">₹</span> {item.price}</p>
              <Link to={item.path} ><button className="mt-3 w-full border border-red-400 bg-red-400 text-white py-2 rounded-lg hover:bg-white hover:text-red-400 hover:cursor-pointer">Buy Now</button></Link>
          </div>
        ))}
      </>
    )
}

export default MonthOffers;