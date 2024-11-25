import User from "../models/user.model.js";
import { fetchFromTMBD } from "../services/tmbd.service.js";

export async function searchPerson(req, res) {
    const { query } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/search/person?query=${query}&language=en-US&page=1&include_adult=false`);

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].profile_path,
                    title: data.results[0].name,
                    searchType: "person",
                    createdAt: new Date()
                }
            }
        });

        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function searchmovie(req, res) {
    const { query } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1&include_adult=false`);

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].title,
                    searchType: "movie",
                    createdAt: new Date()
                }
            }
        });

        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function searchtv(req, res) {
    const { query } = req.params;
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=1&include_adult=false`);

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].title,
                    searchType: "tv",
                    createdAt: new Date()
                }
            }
        });

        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getSearchHistory(req, res) {
    try {
        const data = await User.findById(req.user._id).populate("searchHistory");
        return res.status(200).json({ success: true, content: data.searchHistory });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function deleteSearchHistory(req, res) {
    try {
        const data = await User.findByIdAndUpdate(req.user._id, { $set: { searchHistory: [] } }, { new: true }).populate("searchHistory");
        return res.status(200).json({ success: true, content: data.searchHistory });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function removeItemFromSearchHistory(req, res) {
    const { id } = req.params;
    id = parseInt(id)
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: {
                    id: id
                },
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}