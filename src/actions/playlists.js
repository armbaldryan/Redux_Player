const suffix = "PLAYLIST"
export const onAddPlaylist = (dispatch, name) => {
    dispatch({ type: `ADD_${suffix}`, payload: name });
}
export const onDeletePlaylist = (dispatch, name) => {
    dispatch({ type: `DELETE_${suffix}`, payload: name });
}
export const onUpdatePlaylist = (dispatch, name) => {
    dispatch({ type: `EDIT_${suffix}`, payload: name });
}
