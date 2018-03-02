// @flow

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Tracks from './components/Tracks';
import Playlists from './components/Playlists';
import Header from './components/Header';
import Track from './components/Track';
import Playlist from './components/Playlist';

type Props = {
  title:string
}
export default class App extends Component<Props>{
  render() {
    return (
      <div>
        <main>
          <Header title={this.props.title} />
          <Switch>
            <Route
              exact
              path="/"
              component={Tracks}
            />
            <Route
              exact path="/Playlists"
              component={Playlists}
            />
            <Route 
              exact path="/Playlists/:playlist/:track" 
              component={Track}
            />
            <Route 
              exact path="/Playlists/:playlist" 
              component={Playlist}
            />
          </Switch>
        </main>
      </div>
    );
  }
}