// @flow

import React, { Component } from 'react';
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
            playlist: number,
        }) => void,
};

type State = {
    AddInpName: ?string,
    playlist: ?number,
    playlistEdit: ?number,
    editId: ?number,
    EditInpname: ?string,
    FindName: ?string,
};

class Tracks extends Component<Props,State> {

    constructor(props) {
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

        handleFind = (event: SyntheticEvent<HTMLInputElement>) : void => {
            this.setState({
                FindName: event.currentTarget.value
            })
        };

        AddTrack = (): void => {
            const newTrack :{
                id?: number,
                name: string,
                playlist:number,
            } = {
                name: this.state.AddInpName? this.state.AddInpName : "",
                playlist: Number(this.state.playlist)
            };

            if (this.state.AddInpName) {
                if(newTrack != null){
                this.props.onAddTrack(newTrack);
                }
            }

            this.setState({
                AddInpName: ""
            })
        };

        handleAdd = (event: SyntheticEvent<HTMLInputElement>): void => {
            this.setState({
                AddInpName: event.currentTarget.value
            })
        };

        selectChange = (event: SyntheticEvent<HTMLSelectElement>) : void => {
            this.setState({
                playlist: Number(event.currentTarget.value)
            })
        };

        editSelectChange = (event: SyntheticEvent<HTMLSelectElement>) : void => {
            this.setState({
                playlistEdit: Number(event.currentTarget.value)
            })
        };

        deleteTrack = (track) : void => {
            this.props.onDeleteTrack(track);
        };

        editTrack = (track) : void => {
            this.setState({
                EditInpname: track.name,
                editId: track.id
            })
        };

        handleChange = (event: SyntheticEvent<HTMLInputElement>) : void => {
            this.setState({
                EditInpname: event.currentTarget.value
            })
        };

        saveTrack = (track) : void => {
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
                        (playlist) =>
                            <option
                                value={playlist.id}
                                key={playlist.id}
                            >
                                {playlist.name}
                            </option>
                    )}
                </select>
                {this.props.playlists.map((item) =>
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

                        item => item.name.indexOf(findName ? findName : "") !== -1).map(
                        (track, index) => {
                            const currentPlayList = this.props.playlists.find(playlist => playlist.id === track.playlist);

                            return (track.id === this.state.editId)
                                ? (
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
                                </div>
                                )
                                : (
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
                                                {currentPlayList && currentPlayList.name}
                                            </Link>
                                        </div>
                                        <button onClick={() => this.deleteTrack(track)}>Delete track</button>
                                        <button onClick={() => this.editTrack(track)}>Edit track</button>
                                    </div>
                                )
                            }
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
});

const mapDispatchToProps = (dispatch) => ({
    onAddTrack: (track) => onAddTrack(dispatch, track),
    onUpdateTrack: (track) => onUpdateTrack(dispatch, track),
    onDeleteTrack: (track) => onDeleteTrack(dispatch, track),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks)

