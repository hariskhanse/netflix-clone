import { ConstanData, ConstantError, ControllerError } from '../common/ConstantError.js';
import User from './../models/user.model.js';

export async function likeDislikeContent(req, res) {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        if (!id) {
            return res.status(ConstantError.BAD_REQUEST).json({ success: false, message: ConstantError.FIELD_REQUIRED });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(ConstantError.BAD_REQUEST).json({ success: false, message: ConstantError.USER_NOT_FOUND });
        }

        const existingItem = user.likeDislikeHistory.find(item => item.id === id);

        let updatedUser;
        if (existingItem) {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $pull: { likeDislikeHistory: { id } },
                },
                { new: true }
            ).populate(ConstanData.LIKE_DISLIKE_HISTORY);
        } else {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $push: { likeDislikeHistory: { id, createdAt: new Date() } },
                },
                { new: true }
            ).populate(ConstanData.LIKE_DISLIKE_HISTORY);
        }
        return res.status(ConstantError.SUCCESS).json({
            success: true,
            message: existingItem
                ? ConstanData.ITEM_REMOVED
                : ConstanData.ITEM_ADDED,
            content: {
                ...updatedUser._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.error(ControllerError.LIKE_DISLIKE_CONTENT, error.message);
        return res.status(ConstantError.SERVER_ERROR).json({
            success: false,
            message: ConstantError.INTERNAL_SERVER_ERROR,
        });
    }
};

export async function getLikeDislikeHistory(req, res) {
    try {
        const data = await User.findById(req.user._id).populate(ConstanData.LIKE_DISLIKE_HISTORY);
        return res.status(ConstantError.SUCCESS).json({ success: true, content: data.likeDislikeHistory });
    } catch (error) {
        console.log(ControllerError.GET_LIKE_DISLIKE_HISTORY, error);
        return res.status(ConstantError.SERVER_ERROR).json({ success: false, message: ConstantError.INTERNAL_SERVER_ERROR });
    }
}

export async function updateWatchList(req, res) {
    const { id, title, poster_path, media_type, overview } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(ConstantError.BAD_REQUEST).json({ success: false, message: ConstantError.USER_NOT_FOUND });
        }

        const existingItem = user.watchList.find(item => item.id === id);

        let updatedUser;
        if (existingItem) {
            updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                {
                    $pull: { watchList: { id } },
                },
                { new: true }
            ).populate(ConstanData.WATCHLIST);
        } else {
            updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                {
                    $push: { watchList: { id, title, poster_path, media_type, overview, createdAt: new Date() } },
                },
                { new: true }
            ).populate(ConstanData.WATCHLIST);
        }
        return res.status(ConstantError.SUCCESS).json({
            success: true,
            message: existingItem
                ? ConstanData.ITEM_REMOVED
                : ConstanData.ITEM_ADDED,
            content: {
                ...updatedUser._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.error(ControllerError.UPDATE_WATCH_LIST, error.message);
        return res.status(ConstantError.SERVER_ERROR).json({
            success: false,
            message: ConstantError.INTERNAL_SERVER_ERROR,
        });
    }
}