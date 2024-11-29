import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "./Home/Navbar";
import { SMALL_IMG_BASE_URL } from "../../utilis/constant";
import { formatDate } from "../../utilis/dateFunction";
import { Loader, Trash } from "lucide-react";

const SearchHistoryPage = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        const getSearchHistory = async () => {
            try {
                const res = await axios.get(`/api/v1/search/history`);
                setSearchHistory(res.data.content);
            } catch (error) {
                console.log(error);
                setSearchHistory([]);
            }
        };
        getSearchHistory();
    }, []);

    const handleDelete = async (entry) => {
        setDeleting(entry.id);
        try {
            await axios.delete(`/api/v1/search/history/${entry.id}`);
            setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete search item");
        } finally {
            setDeleting(null);
        }
    };

    const handleDeleteAll = async () => {
        if (window.confirm("Are you sure you want to delete all search history?")) {
            try {
                await axios.delete(`/api/v1/search/deleteHistory`);
                setSearchHistory([]);
            } catch (error) {
                console.error("Failed to delete all history:", error);
            }
        }
    };

    if (searchHistory?.length === 0) {
        return (
            <div className='bg-black min-h-screen text-white'>
                <Navbar />
                <div className='max-w-6xl mx-auto px-4 py-8'>
                    <h1 className='text-3xl font-bold mb-8'>Search History</h1>
                    <div className='flex justify-center items-center h-96'>
                        <p className='text-xl'>No search history found</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-black text-white min-h-screen'>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Search History</h1>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        onClick={handleDeleteAll}
                    >
                        Delete All History
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchHistory?.map((entry) => (
                        <div key={entry.id} className="bg-gray-800 p-4 rounded flex items-start">
                            <img
                                src={SMALL_IMG_BASE_URL + entry.image}
                                alt="History image"
                                className="size-16 rounded-full object-cover mr-4"
                            />
                            <div className="flex flex-col">
                                <span className="text-white text-lg">{entry.title}</span>
                                <span className="text-gray-400 text-sm">{formatDate(entry.createdAt)}</span>
                            </div>

                            <span
                                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${entry.searchType === "movie"
                                    ? "bg-red-600"
                                    : entry.searchType === "tv"
                                        ? "bg-blue-600"
                                        : "bg-green-600"
                                    }`}
                            >
                                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
                            </span>

                            {deleting === entry.id ? (
                                <Loader className="size-5 ml-4 animate-spin text-red-600" />
                            ) : (
                                <Trash
                                    className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                                    onClick={() => handleDelete(entry)}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default SearchHistoryPage;