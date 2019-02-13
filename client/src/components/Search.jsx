import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { MovieList, SearchBox } from '.';
import { getMovies } from '../actions/movieActions';
import api from '../config/api';
import '../styles/searchStyles.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.props.getMovies();
        this.state = {
            movies: null
        };

        if (this.props.location.search !== '') {
            fetch(api.omdbAPI + '&s=' + this.props.location.search.substring(13))
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json.Response === "False") {
                    this.setState({
                        movies: 'not found'
                    });
                }
                else {
                    this.setState({
                        movies: json
                    });
                }
            });
        }
    }

    render() {
        return(
            <Container className="container">
                <SearchBox/>
                <div className="moviesList">
                    {
                        this.state.movies === 'not found' ?
                        <h5>Movie not found!</h5> :
                        this.state.movies === null ?
                        <div></div> :
                        <MovieList className="moviesList" data={this.state.movies.Search} history={this.props.history}/>
                    }
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    favoriteMovies: state.movies
});
  
export default connect(mapStateToProps, { getMovies })(Search);
