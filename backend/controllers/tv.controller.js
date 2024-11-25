import { fetchFromTMBD } from "../services/tmbd.service.js";

export async function getTrendingtTv(req, res) {
    try {
        const data = await fetchFromTMBD("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvTrailers(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvDetail(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getSimilarTvs(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvShowsByCategory(req, res) {
    const { category } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}