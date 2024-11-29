import { ConstanData, ConstantError, ControllerError } from "../common/ConstantError.js";
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
                    searchType: ConstanData.PERSON,
                    createdAt: new Date()
                }
            }
        });

        return res.status(ConstantError.SUCCESS).json({ success: true, content: data });
    } catch (error) {
        console.log(ControllerError.SEARCH_PERSON, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
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
                    searchType: ConstanData.MOVIE,
                    createdAt: new Date()
                }
            }
        });

        return res.status(ConstantError.SUCCESS).json({ success: true, content: data });
    } catch (error) {
        console.log(ControllerError.SEARCH_MOVIE, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
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
                    searchType: ConstanData.TV,
                    createdAt: new Date()
                }
            }
        });

        return res.status(ConstantError.SUCCESS).json({ success: true, content: data });
    } catch (error) {
        console.log(ControllerError.SEARCH_TV, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}

export async function getSearchHistory(req, res) {
    try {
        const data = await User.findById(req.user._id).populate(ConstanData.SEARCH_HISTORY);
        return res.status(ConstantError.SUCCESS).json({ success: true, content: data.searchHistory });
    } catch (error) {
        console.log(ControllerError.GET_SEARCH_HISTORY, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}

export async function deleteSearchHistory(req, res) {
    try {
        const data = await User.findByIdAndUpdate(req.user._id, { $set: { searchHistory: [] } }, { new: true }).populate(ConstanData.SEARCH_HISTORY);
        return res.status(ConstantError.SUCCESS).json({ success: true, content: data.searchHistory });
    } catch (error) {
        console.log(ControllerError.DELETE_SEARCH_HISTORY, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}

export async function removeItemFromSearchHistory(req, res) {
    let { id } = req.params;
    id = parseInt(id)
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: {
                    id: id
                },
            },
        });

        const data = await User.findById(req.user._id).populate(ConstanData.SEARCH_HISTORY);
        return res.status(ConstantError.SUCCESS).json({ success: true, content: data.searchHistory });
    } catch (error) {
        console.log(ControllerError.REMOVE_ITEM_FROM_SEARCH_HISTORY, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}