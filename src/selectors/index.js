import { createSelector } from 'reselect';
// selector
const getTracks = (state) => state.tracks;
// reselect function
export const getTrackState = createSelector(
    [ getTracks ],
    (tracks) => tracks
);
const getPlaylists = (state) => state.playlists;
export const getPlayListsState = createSelector(
    [ getPlaylists ],
    (playlists) => playlists
);