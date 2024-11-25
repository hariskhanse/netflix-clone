export const ConstantError = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
    UNPROCESSABLE_ENTITY: 422,
    UNAUTHORIZED_USER: 1001,
    FORBIDDEN_USER: 1002,
    CREATED: 201,
    SUCCESS: 200,
    FIELD_REQUIRED: "All fields are required",
    INVALID_EMAIL: "Invalid email format",
    PASSWORD_SHORT: "Password must be at least 6 characters long",
    ALREADY_EXITS: "User already exists",
    USER_CREATED: "User created successfully",
    WRONG_PASSWORD: "Wrong password",
    USER_NOT_FOUND: "User not found",
    INTERNAL_SERVER_ERROR: "Internal server error",
}

export const ControllerError = {
    SIGNUP: "Error in signup controller",
    LOGIN: "Error in login controller",
    LOGOUT: "Error in logout controller",
    UPDATE_WATCH_LIST: "Error in updateWatchList controller",
    GET_LIKE_DISLIKE_HISTORY: "Error in getLikeDislikeHistory controller",
    LIKE_DISLIKE_CONTENT: "Error in likeDislikeContent controller",
    GET_TRENDING_TV: "Error in getTrendingtTv controller",
    GET_TV_TRAILERs: "Error in getTvTrailer controller",
    GET_TV_DETAIL: "Error in getTvDetail controller",
    GET_SIMILAR_TV: "Error in getSimilarTvs controller",
    GET_TV_SHOWS_BY_CATEGORY: "Error in getTvShowsByCategory controller",
    REMOVE_ITEM_FROM_SEARCH_HISTORY: "Error in removeItemFromSearchHistory controller",
    DELETE_SEARCH_HISTORY: "Error in deleteSearchHistory controller",
    GET_SEARCH_HISTORY: "Error in getSearchHistory controller",
    SEARCH_TV: "Error in searchtv controller",
    SEARCH_MOVIE: "Error in searchmovie controller",
    SEARCH_PERSON: "Error in searchPerson controller",
    GET_MOVIE_BY_CATEGORY: "Error in getMovieByCategory controller",
    GET_SIMILAR_MOVIES: "Error in getSimilarMovies controller",
    GET_MOVIE_DETAIL: "Error in getMovieDetail controller",
    GET_MOVIE_TRAILERS: "Error in getMovieTrailers controller",
    GET_TRENDING_MOVIE: "Error in getTrendingMovie controller"
}

export const ConstanData = {
    ITEM_REMOVED: "Item removed from history",
    ITEM_ADDED: "Item added to history",
    WATCHLIST: "watchList",
    LIKE_DISLIKE_HISTORY: "likeDislikeHistory",
    SEARCH_HISTORY: "searchHistory",
    TV: "tv",
    MOVIE: "movie",
    PERSON: "person"
}