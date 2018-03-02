// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
    title: string
};
function Header(props: Props){
    return(
        <header>
            <h1>{props.title}</h1>
            <ul>
            <li>
                <NavLink to="/PlayLists">PlayLists</NavLink>
            </li>
            <li>
                <NavLink to="/">Tracks</NavLink>
            </li>
            </ul>
        </header>

    );
}

export default Header;