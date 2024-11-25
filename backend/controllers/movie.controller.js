import { fetchFromTMBD } from './../services/tmbd.service.js';
export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMBD("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        return res.status(200).json({ success: true, content: randomMovie });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getMovieTrailers(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getMovieDetail(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getSimilarMovies(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getMoviesByCategory(req, res) {
    const { category } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        return res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}