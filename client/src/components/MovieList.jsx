import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import '../styles/listStyles.css';

class MovieList extends Component {
    render() {
        let { data } = this.props;
        return(
            <ListGroup>
                {data.map(movie => (
                    <ListGroupItem
                        key={movie.imdbID}
                        className="movieCard"
                        onClick={() => this.props.history.push('/movies/' + movie.imdbID)}
                    >
                        <img className="favoritePoster" src={movie.Poster} alt={movie.Title} />
                        <span>{movie.Title} ({movie.Year})</span>
                    </ListGroupItem>
                ))}
            </ListGroup>
        );
    }
}

export default MovieList;
