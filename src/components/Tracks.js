// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    onAddTrack,
    onDeleteTrack,
    onUpdateTrack
} from '../actions/tracks';

type State = {
    AddInpName: ?string,
    playlist: number,
    playlistEdit: number,
    editId: ?number,
    EditInpname: ?string,
    FindName: ?string
};
type Props = {
    tracks:
        Array<
            {
                name: string,
                id: number,
                playlist: number
            }>,
    playlists:
        Array<
            {
                name: string,
                id: number
            }>,
    onAddTrack:
        (name: string)
            => void,
    onDeleteTrack:
        (
            ?{
            name: string,
            id: number,
            playlist: number,
    }) => void,
    onUpdateTrack:(
        {
            name: string,
            id: number,
            playlist: number,
        }
    ) => void,
}
class Tracks extends Component<Props, State> {
    handleFind: (
        event: Event
        ) => void;
    constructor(props) {
        super(props);

        this.state = {
            AddInpName: '',
            playlist: 1,
            playlistEdit: 1,
            editId: null,
            EditInpname: "",
            FindName: "",
        }

        this.handleFind = (event: SyntheticEvent) => {
            this.setState({
                FindName: event.target.value
            })
        }
        this.AddTrack = () => {
            const newTrack = {
                name: this.state.AddInpName,
                playlist: Number(this.state.playlist)
            }
            if (this.state.AddInpName) {
                this.props.onAddTrack(newTrack);
            }
            this.setState({
                AddInpName: ""
            })
        }
        this.handleAdd = (event) => {
            this.setState({
                AddInpName: event.target.value
            })
        }
        this.selectChange = (event) => {
            this.setState({
                playlist: event.target.value
            })
        }
        this.editSelectChange = (event) => {
            this.setState({
                playlistEdit: event.target.value
            })
        }
        this.deleteTrack = (track) => {
            this.props.onDeleteTrack(track);
        }
        this.editTrack = (track) => {
            this.setState({
                EditInpname: track.name,
                editId: track.id
            })
        }
        this.handleChange = (event) => {
            this.setState({
                EditInpname: event.target.value
            })
        }
        this.saveTrack = (track) => {
            this.props.onUpdateTrack({
                ...track,
                name: this.state.EditInpname,
                playlist: Number(this.state.playlistEdit),
            });
            this.setState({
                editId: null
            })
        }
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.FindName}
                    onChange={this.handleFind} />
                <span>FIND TRACK</span>
                <input
                    type="text"
                    value={this.state.AddInpName}
                    onChange={this.handleAdd} />
                <button onClick={this.AddTrack}>Add track</button>
                <select
                    onChange={this.selectChange}
                    value={this.state.playlist}
                >
                    {this.props.playlists.map(
                        (playlist, index) =>
                            <option
                                value={playlist.id}
                                key={playlist.id}
                            >
                                {playlist.name}
                            </option>
                    )}
                </select>
                {this.props.playlists.map((item, index) =>
                    <Link to={`/Playlists/${item.id}/`} key={item.id} className="mdc-button mdc-card__action">
                        <button
                            type="text"
                            className="btn_pl"
                            key={item.id}>
                            {item.name}
                        </button>
                    </Link>
                )
                }
                <ul>
                    {this.props.tracks.filter(
                        item => item.name.indexOf(this.state.FindName) !== -1).map(
                        (track, index) =>
                            (track.id === this.state.editId) ?
                                <div key={track.id} id={index}>
                                    <input
                                        type="text"
                                        value={this.state.EditInpname}
                                        onChange={this.handleChange} />
                                    <select
                                        onChange={this.editSelectChange}
                                        value={this.state.playlistEdit}
                                    >
                                        {this.props.playlists.map(
                                            (playlist, index) =>
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
                                </div>
                                :
                                <div key={track.id} id={index}>
                                    <li
                                        className="track_back">
                                        {track.name}
                                        <Link to={`/Playlists/${track.playlist}/${track.playlist}`}
                                            className="show_more">
                                            Show More
                                    </Link>
                                    </li>
                                    <div className="plName">
                                        <Link to={`/Playlists/${track.playlist}/`} className="mdc-button mdc-card__action">
                                            {this.props.playlists.find(
                                                (playlist) => {
                                                    return playlist.id === track.playlist
                                                }
                                            ).name}
                                        </Link>
                                    </div>
                                    <button onClick={() => this.deleteTrack(track)}>Delete track</button>
                                    <button onClick={() => this.editTrack(track)}>Edit track</button>
                                </div>
                        )
                    }
                </ul>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    tracks: state.tracks,
    playlists: state.playlists,
})

const mapDispatchToProps = (dispatch) => ({
    onAddTrack: (track) => onAddTrack(dispatch, track),
    onUpdateTrack: (track) => onUpdateTrack(dispatch, track),
    onDeleteTrack: (track) => onDeleteTrack(dispatch, track),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tracks)

