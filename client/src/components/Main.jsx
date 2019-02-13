import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import siteRoutes from '../config/siteRoutes';
import {
    Menu,
    Favorites,
    Movie,
    Search
} from '.';

class Main extends Component {
    render() {
        return(
            <div>
                <Menu/>
                <Route exact path={siteRoutes.HOME} component={Search}/>
                <Route exact path={siteRoutes.FAVORITES} component={Favorites}/>
                <Route exact path={siteRoutes.MOVIE} component={Movie}/>
                <Route exact path={siteRoutes.SEARCH} component={Search}/>
            </div>
        );
    }
}

export default Main;
