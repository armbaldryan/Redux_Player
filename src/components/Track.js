import React from 'react';
import { connect } from 'react-redux';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.match = this.props.match;
        this.track = this.props.tracks.find(
            track => track.id === Number(this.match.params.track));
        this.playlist = this.props.playlists.find(
            playlist => playlist.id === this.track.playlist);
    }
    render() {
        return (
            <div>
                <img src='/play.png' className="track_img" alt="play_btn" />
                <p className="track_name">
                    {this.track.name}
                </p>
                <p className="track_playlist_name">
                    {this.playlist.name}
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tracks: state.tracks,
    playlists: state.playlists,
})


export default connect(mapStateToProps)(Track)
