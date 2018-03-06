const suffix = "TRACK";
export const onAddTrack = (dispatch, track) => {setTimeout(() => {
    dispatch({ type: `ADD_${suffix}`, payload: track })},2000);
};
export const onDeleteTrack = (dispatch, track) => {
    dispatch({ type: `DELETE_${suffix}`, payload: track });
};
export const onUpdateTrack = (dispatch, track) => {
    dispatch({ type: `EDIT_${suffix}`, payload: track });
};