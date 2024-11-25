import { fetchFromTMBD } from './../services/tmbd.service.js';
import { ConstantError, ControllerError } from './../common/ConstantError.js';
export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMBD("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        return res.status(ConstantError.SUCCESS).json({ success: true, content: randomMovie });
    } catch (error) {
        console.log(ControllerError.GET_TRENDING_MOVIE, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}

export async function getMovieTrailers(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        return res.status(ConstantError.SUCCESS).json({ success: true, content: data });
    } catch (error) {
        console.log(ControllerError.GET_MOVIE_TRAILERS, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}

export async function getMovieDetail(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        return res.status(ConstantError.SUCCESS).json({ success: true, content: data });
    } catch (error) {
        console.log(ControllerError.GET_MOVIE_DETAIL, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}

export async function getSimilarMovies(req, res) {
    const { id } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        return res.status(ConstantError.SUCCESS)
            .json({ success: true, content: data });
    } catch (error) {
        console.log(ControllerError.GET_SIMILAR_MOVIES, error);
        return res.status(ConstantError.SERVER_ERROR)
            .json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}

export async function getMoviesByCategory(req, res) {
    const { category } = req.params
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        return res.status(ConstantError.SUCCESS)
            .json({ success: true, content: data });
    } catch (error) {
        console.log(ControllerError.GET_MOVIE_BY_CATEGORY, error);
        return res.status(ConstantError.SERVER_ERROR)
            .json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}