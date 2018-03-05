// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    onAddTrack,
    onDeleteTrack,
    onUpdateTrack
} from '../actions/tracks';

type Props = {
    tracks:
        Array<{
            name: string,
            id: number,
            playlist: number
        }>,

    playlists:
        Array<{
            name: string,
            id: number
        }>,

    onDeleteTrack:
        (?{
            name: string,
            id: number,
            playlist: number,
        }) => void,

    onUpdateTrack:
        (?{
            name: ?string,
            id: number,
            playlist: number,
        }) => void,

    onAddTrack:
        (?{
            name: string,
            id: number,
            playlist: number,
        }) => void,

    match:
        {
        params:
            {
                playlist:number
            }
        }
};

type State = {
    AddInpName: ?string,
    playlist: ?number,
    playlistEdit: ?number,
    editId: ?number,
    EditInpname: ?string,
    FindName: ?string,
};

class Playlist extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            AddInpName: '',
            playlist: 1,
            playlistEdit: 1,
            editId: null,
            EditInpname: "",
            FindName: "",
        };

        }

        handleFind = (event) => {
            this.setState({
                FindName: event.target.value
            })
        };

        editSelectChange = (event) => {
            this.setState({
                playlistEdit: event.target.value
            })
        };

        deleteTrack = (track) => {
            this.props.onDeleteTrack(track);
        };

        editTrack = (track) => {
            this.setState({
                EditInpname: track.name,
                editId: track.id
            })
        };

        handleChange = (event) => {
            this.setState({
                EditInpname: event.target.value
            })
        };

        saveTrack = (track) => {
            this.props.onUpdateTrack({
                ...track,
                name: this.state.EditInpname,
                playlist: Number(this.state.playlistEdit),
            });
            this.setState({
                editId: null
            })
        };

    render() {
        const findName = this.state.FindName != null ? this.state.FindName : "";
        return (
            <div>
                <ul>
                    <input type="text"
                        value={this.state.FindName}
                        onChange={this.handleFind}
                    />
                    <span>FIND TRACK</span>
                    {this.props.playlists.map(playlist => {
                        if (playlist.id === Number(this.props.match.params.playlist)) {
                            return (
                                <div className="Playlist_name" key={playlist.id}>{playlist.name}</div>
                            )
                        }
                        else {
                            return null;
                        }
                    })}
                    {this.props.tracks.filter(item => item.name.indexOf(findName ? findName : "") !== -1)
                        .map((track, index) =>  {
                            const currentPlayList = this.props.playlists.find(playlist => playlist.id === track.playlist);
                            return (track.playlist === Number(this.props.match.params.playlist)) ?
                                (track.id === this.state.editId) ?
                                    (<div key={track.id} id={index}>
                                        <input type="text"
                                               value={this.state.EditInpname}
                                               onChange={this.handleChange}/>
                                        <select
                                            onChange={this.editSelectChange}
                                            value={this.state.playlistEdit}
                                        >
                                            {this.props.playlists.map(
                                                (playlist) =>
                                                    <option
                                                        value={playlist.id}
                                                        key={playlist.id}
                                                    >
                                                        {playlist.name}
                                                    </option>
                                            )}

                                        </select>
                                        <button onClick={() => this.deleteTrack(track)}>Delete track</button>
                                        <button onClick={() => this.saveTrack(track)}>Save track</button>
                                    </div>)
                                    :(
                                    <div key={track.id} id={index}>
                                        <li className="track_back">
                                            {track.name}
                                            <Link to={`/Playlists/${track.playlist}/${track.id}`} className="show_more">Show
                                                More</Link>
                                        </li>
                                        <div className="plName">
                                            { currentPlayList && currentPlayList.name}
                                        </div>
                                        <button onClick={() => this.deleteTrack(track)}>Delete track</button>
                                        <button onClick={() => this.editTrack(track)}>Edit track</button>
                                    </div>)
                                : false
                        })
                    }
                </ul>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    tracks: state.tracks,
    playlists: state.playlists,
});

const mapDispatchToProps = (dispatch) => ({
    onAddTrack: (track) => onAddTrack(dispatch, track),
    onUpdateTrack: (track) => onUpdateTrack(dispatch, track),
    onDeleteTrack: (track) => onDeleteTrack(dispatch, track),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)

