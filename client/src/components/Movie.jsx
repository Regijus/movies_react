import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { getMovies, deleteMovie, addMovie } from '../actions/movieActions';
import api from '../config/api';
import '../styles/movieStyles.css';

class Movie extends Component {
    constructor(props) {
        super(props);

        this.props.getMovies();
        let favorite = this.props.favoriteMovies.movies;
        favorite = favorite.find(movie => movie.imdbID === props.match.params.id);
        if (favorite !== undefined) {
            this.state = {
                movie: null,
                isFavorite: true
            };
        }
        else {
            this.state = {
                movie: null,
                isFavorite: false
            };
        }

        fetch(api.omdbAPI + '&i=' + props.match.params.id + '&plot=full')
        .then(response => {
            return response.json();
        })
        .then(json => {
            this.setState({
                movie: json
            });
        });
    }

    onClick = movie => {
        if (!this.state.isFavorite) {
            this.props.addMovie(movie);
        }
        else {
            this.props.deleteMovie(movie.imdbID);
        }
        this.setState({
            isFavorite: !this.state.isFavorite
        });
    }

    render() {
        let { movie } = this.state;

        if (movie === null) {
            return (<div></div>);
        }

        return (
            <Container className="container">
                <Row className="main">
                    <Col xs="6" className="image">
                        <img className="moviePoster" src={movie.Poster} alt={movie.Title}/>
                        <div>
                            <Button 
                                className={this.state.isFavorite ? "removeButton" : "addButton"}
                                color={this.state.isFavorite ? "danger" : "success"}
                                onClick={this.onClick.bind(this, movie)}
                            >
                                { this.state.isFavorite ? 'Remove Favorite' : 'Add Favorite' }
                            </Button>
                        </div>
                    </Col>
                    <Col xs="6">
                        <h1>{movie.Title} ({movie.Year})</h1>
                        <span className="bold">Country: </span><span>{movie.Country}</span><br/>
                        <span className="bold">Genre: </span><span>{movie.Genre}</span><br/>
                        <span className="bold">Director: </span><span>{movie.Director}</span><br/>
                        <span className="bold">Production: </span><span>{movie.Production}</span><br/>
                        <span className="bold">Writer: </span><span>{movie.Writer}</span><br/>
                        <span className="bold">Actors: </span><span>{movie.Actors}</span><br/>
                        <span className="bold">Awards: </span><span>{movie.Awards}</span><br/>
                        <span className="bold">Released: </span><span>{movie.Released}</span><br/>
                        <span className="bold">Runtime: </span><span>{movie.Runtime}</span><br/>
                        <span className="bold">Rated: </span><span>{movie.Rated}</span><br/>
                        <span className="bold">Metascore: </span><span>{movie.Metascore}</span><br/>
                        <span className="bold">IMDb rating: </span><span>{movie.imdbRating} ({movie.imdbVotes} votes)</span><br/>
                        {
                            movie.Ratings.map(item => (
                                <span key={item.Source}>
                                    <span className="bold">{item.Source} rating: </span><span>{item.Value}</span><br/>
                                </span>
                            ))
                        }
                        <span className="bold">Plot: </span><span>{movie.Plot}</span><br/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
  favoriteMovies: state.movies
});

export default connect(mapStateToProps, { getMovies, addMovie, deleteMovie })(Movie);
