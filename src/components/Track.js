// @flow

import React from 'react';
import { connect } from 'react-redux';

type Props = {
    tracks:
        Array<
            {
                name: string,
                id: number,
                playlist: number
            }>,
    playLists:
        Array<
            {
                name: string,
                id: number
            }>,
    match: {
        params:
            {
                track:number
            }
    }
};

class Track extends React.Component<Props> {
    track: ?{
        name: string,
        id: number,
        playlist: number,
    };
    playlist: ?{
        name: string,
        id: number,
    };
    constructor(props: Props) {
        super(props);
        this.track = this.props.tracks.find(
            track => track.id === Number(this.props.match.params.track)
        ) || null;
        this.playlist = this.props.playLists.find(playlist => playlist.id === (this.track && this.track.playlist)) || null;
    }
    render() {
        return (
            <div>
                <img src='/play.png' className="track_img" alt="play_btn" />
                <p className="track_name">
                    {this.track && this.track.name}
                </p>
                <p className="track_playlist_name">
                    {this.playlist && this.playlist.name}
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tracks: state.tracks,
    playLists: state.playlists,
});


export default connect(mapStateToProps)(Track)
