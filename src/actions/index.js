export const moviesFetching = () => {
    return {
        type: "MOVIES_FETCHING",
    };
};
export const moviesFetched = (movies) => {
    return {
        type: "MOVIES_FETCHED",
        payload: movies,
    };
};
export const moviesFetchingError = () => {
    return {
        type: "MOVIES_FETCHING_ERROR",
    };
};
