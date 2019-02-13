import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { MovieList } from '.';
import { getMovies } from '../actions/movieActions';
import '../styles/favoritesStyles.css';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.props.getMovies();
  }

  render() {
    return (
      <Container className="container">
        <h1 className="favoriteTitle">FAVORITE MOVIES</h1>
        <MovieList data={this.props.favoriteMovies.movies} history={this.props.history}/>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  favoriteMovies: state.movies
});

export default connect(mapStateToProps, { getMovies })(Favorites);
