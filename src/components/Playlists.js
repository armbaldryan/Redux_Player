// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    onAddPlaylist,
    onDeletePlaylist,
    onUpdatePlaylist
} from '../actions/playlists';

import {
    onDeleteTrack
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

    onAddPlaylist:
        (name: string) => void,

    onDeletePlaylist: ({
        name: string,
        id: number
    }) => void,

    onDeleteTrack: (?{
        name: string,
        id: number,
        playlist: number,
    }) => void,

    onUpdatePlaylist: ({
        name: string,
        id: number
    }) => void,

};

type State = {
    mainName: string,
    editedID: ?number,
    name: string,
}

class Playlists extends Component<Props, State> {
    state = {
        editedID: null,
        name: '',
        mainName: '',
    };

    addPlaylist = () => {
        if (this.state.mainName) {
            this.props.onAddPlaylist(this.state.mainName);
        }
        this.setState({ mainName: "" })
    };

    deletePlaylist(playlist) {
        this.props.onDeletePlaylist(playlist);
        const track = this.props.tracks.find(
            (track) => {
                return track.playlist === playlist.id
                }) || null;
        this.props.onDeleteTrack(track);
    }

    editPlaylist = (playlist) => this.setState({
        editedID: playlist.id,
        name: playlist.name
    });

    handleChange = (event) => this.setState({
        name: event.target.value
    });

    handleMainChange = (event) => this.setState({
        mainName: event.target.value
    });

    savePlaylist = (playlist) => {
        if (this.state.name) {
            this.props.onUpdatePlaylist({
                ...playlist,
                name: this.state.name
            });
        }
        this.setState({
            editedID: null
        })
    };

    render() {
        return (
            <div>
                <input type="text"
                    value={this.state.mainName}
                    onChange={this.handleMainChange} />
                <button onClick={this.addPlaylist} >Add Playlist</button>
                <ul>
                    {
                        this.props.playlists.map((playlist) => this.state.editedID === playlist.id
                            ? (<div key={playlist.id}>
                                <input key={playlist.id}
                                    type="text"
                                    onChange={this.handleChange}
                                    defaultValue={playlist.name}
                                    id="field" />
                                <button onClick={() => this.deletePlaylist(playlist)}>Delete Playlist</button>
                                <button onClick={() => this.savePlaylist(playlist)} >Save Playlist</button>
                            </div>)
                            : (<div key={playlist.id}>
                                <li className="track_back" >
                                    <Link to={`/Playlists/${playlist.id}/`} className="mdc-button mdc-card__action">
                                        {playlist.name}
                                    </Link>
                                </li>
                                <button onClick={() => this.deletePlaylist(playlist)}>Delete Playlist</button>
                                <button onClick={() => this.editPlaylist(playlist)}>Edit Playlist</button>
                            </div>)
                        )
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    playlists: state.playlists,
    tracks: state.tracks,
});

const mapDispatchToProps = (dispatch) => ({
    onAddPlaylist: (name) => onAddPlaylist(dispatch, name),
    onUpdatePlaylist: (track) => onUpdatePlaylist(dispatch, track),
    onDeletePlaylist: (track) => onDeletePlaylist(dispatch, track),
    onDeleteTrack: (track) => onDeleteTrack(dispatch, track),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);