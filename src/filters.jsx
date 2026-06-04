const Filters = ({ SelectedPrice, setSelectedPrice, SelectedStock, setSelectedStock, selectedSizeFilter, setSelectedSizeFilter, originaldata, setitems, Filter }) => {
    return (
        <div id="filters" className="w-72 bg-white border-r border-gray-300 min-h-screen p-6 fixed top-20">
            <div id="clearfilters" className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-red-400">Filters</h1>
                <button onClick={() => {
                    setSelectedPrice("");
                    setSelectedStock("");
                    setSelectedSizeFilter("");
                    setitems(originaldata);
                }} className="text-sm text-gray-500 hover:text-red-400 transition cursor-pointer">Clear All</button>
            </div>

            <div id="price filters" className="border-b border-gray-200 pb-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h2>
                <div className="flex flex-col gap-3 text-sm text-gray-700">
                    <label className="flex items-center gap-3 cursor-pointer hover:text-red-400 transition">
                        <input checked={SelectedPrice === "under1000"} onChange={() => { setSelectedPrice("under1000"); Filter("under1000", SelectedStock, selectedSizeFilter) }} type="radio" name="price" className="accent-red-400" />Under ₹1000
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-red-400 transition">
                        <input checked={SelectedPrice === "1000-2000"} onChange={() => { setSelectedPrice("1000-2000"); Filter("1000-2000", SelectedStock, selectedSizeFilter) }} type="radio" name="price" className="accent-red-400" />₹1000 - ₹2000
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-red-400 transition">
                        <input checked={SelectedPrice === "above2000"} onChange={() => { setSelectedPrice("above2000"); Filter("above2000", SelectedStock, selectedSizeFilter) }} type="radio" name="price" className="accent-red-400" />Above ₹2000
                    </label>
                </div>
            </div>

            <div id="stock filters" className="mt-6 border-b border-gray-200 pb-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Availability</h2>
                <div className="flex flex-col gap-3 text-sm text-gray-700">
                    <label className="flex items-center gap-3 cursor-pointer hover:text-red-400 transition">
                        <input checked={SelectedStock === "instock"} onChange={() => { setSelectedStock("instock"); Filter(SelectedPrice, "instock", selectedSizeFilter) }} type="radio" name="availability" className="accent-red-400" />In Stock
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-red-400 transition">
                        <input checked={SelectedStock === "outofstock"} onChange={() => { setSelectedStock("outofstock"); Filter(SelectedPrice, "outofstock", selectedSizeFilter) }} type="radio" name="availability" className="accent-red-400" />Out of Stock
                    </label>
                </div>
            </div>

            <div id="sizefilters" className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Sizes</h2>
                <div className="flex flex-wrap gap-3">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <button key={size} onClick={() => {
                            const newSize = selectedSizeFilter === size ? "" : size;
                            setSelectedSizeFilter(newSize);
                            Filter(SelectedPrice, SelectedStock, newSize);
                        }}
                        className={`w-10 h-10 border rounded-lg text-sm transition cursor-pointer ${selectedSizeFilter === size ? "bg-black text-white border-black" : "border-gray-300 hover:border-red-400 hover:text-red-400"}`}>
                            {size}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filters;