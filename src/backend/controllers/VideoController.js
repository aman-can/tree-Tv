import { Response } from "miragejs";

/**
 * All the routes related to Videos are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all videos in the db.
 * send GET Request at /api/videos
 * */

export const getAllVideosHandler = function () {
    try {
        return new Response(200, {}, { videos: this.db.videos });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

/**
 * This handler handles uploads a new video to the db.
 * send POST Request at /api/user/videos/
 * */

// TODO: postVideoHandler

/**
 * This handler handles gets all videos in the db.
 * send GET Request at /api/user/videos/:videoId
 * */

export const getVideoHandler = function (schema, request) {
    const { videoId, suggestionLimit } = request.params;
    try {
        const video = schema.videos.findBy({ _id: videoId }).attrs;
        const allVideos = this.db.videos;
        const suggestedVideos = [];
        const suggestion = allVideos.filter((ele) =>
            ele.categories.some((category) =>
                video.categories.includes(category)
            )
        );
        for (let i = 0; i < suggestionLimit; i++) {
            if (video._id !== suggestion[i]._id) {
                suggestedVideos.push({
                    title: suggestion[i].title,
                    release_date: suggestion[i].release_date,
                    _id: suggestion[i]._id,
                    creator: suggestion[i].creator,
                });
            }
        }

        return new Response(200, {}, { video: { ...video, suggestedVideos } });
    } catch (error) {
        return new Response(
            500,
            {},
            {
                error,
            }
        );
    }
};

export const updateVideoHandler = function (schema, request) {
    const { videoId, suggestionLimit } = request.params;
    try {
        const { comments } = JSON.parse(request.requestBody);
        const video = schema.videos.findBy({ _id: videoId }).attrs;
        video.comments = comments;

        const allVideos = this.db.videos;
        const suggestedVideos = [];
        const suggestion = allVideos.filter((ele) =>
            ele.categories.some((category) =>
                video.categories.includes(category)
            )
        );
        for (let i = 0; i < suggestionLimit; i++) {
            if (video._id !== suggestion[i]._id) {
                suggestedVideos.push({
                    title: suggestion[i].title,
                    release_date: suggestion[i].release_date,
                    _id: suggestion[i]._id,
                    creator: suggestion[i].creator,
                });
            }
        }
        this.db.videos.update({ _id: videoId }, { comments: comments });
        return new Response(200, {}, { video: { ...video, suggestedVideos } });
    } catch (error) {
        return new Response(500, {}, { error });
    }
};
