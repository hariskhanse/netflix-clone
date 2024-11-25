import { ConstantError, ControllerError } from "../common/ConstantError.js";
import { fetchFromTMBD } from "../services/tmbd.service.js";

export async function getTrendingtTv(req, res) {
    try {
        const data = await fetchFromTMBD("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        return res.status(ConstantError.SUCCESS).json({ success: true, content: data });
    } catch (error) {
        console.log(ControllerError.GET_TRENDING_TV, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}

export async function getTvTrailers(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        return res.status(ConstantError.SUCCESS).json({ success: true, content: data });
    } catch (error) {
        console.log(ControllerError.GET_TV_TRAILERs, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}

export async function getTvDetail(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        return res.status(ConstantError.SUCCESS).json({ success: true, content: data });
    } catch (error) {
        console.log(ControllerError.GET_TV_DETAIL, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}

export async function getSimilarTvs(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        return res.status(ConstantError.SUCCESS).json({ success: true, content: data });
    } catch (error) {
        console.log(ControllerError.GET_SIMILAR_TV, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}

export async function getTvShowsByCategory(req, res) {
    const { category } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        return res.status(ConstantError.SUCCESS).json({ success: true, content: data });
    } catch (error) {
        console.log(ControllerError.GET_TV_SHOWS_BY_CATEGORY, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}