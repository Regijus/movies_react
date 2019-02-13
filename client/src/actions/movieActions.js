import axios from 'axios';
import { GET_MOVIES, ADD_MOVIE, DELETE_MOVIE, MOVIES_LOADING } from './types';

export const getMovies = () => dispatch => {
    dispatch(setMoviesLoading());
    axios.get('/api/movies').then(res =>
      dispatch({
        type: GET_MOVIES,
        payload: res.data
      })
    );
};

export const addMovie = movie => dispatch => {
    dispatch(setMoviesLoading());
    axios.get('/api/movies').then(res => {
        let dbMovie = res.data.find(item => item.imdbID === movie.imdbID);
        if(dbMovie === undefined) {
            axios.post('/api/movies', movie).then(res => dispatch({
                type: ADD_MOVIE,
                payload: res.data
            }));
        }
    });
};

export const deleteMovie = id => dispatch => {
    dispatch(setMoviesLoading());
    axios.get('/api/movies').then(res => {
        let idToDelete = res.data.filter(item => item.imdbID === id);
        axios.delete('/api/movies/' + idToDelete[0]._id).then(res => dispatch({
            type: DELETE_MOVIE,
            payload: idToDelete[0]._id
        }));
    });
};

export const setMoviesLoading = () => {
    return {
        type: MOVIES_LOADING
    };
};
