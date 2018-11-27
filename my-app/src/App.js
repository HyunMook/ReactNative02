import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Movie from './Components/Movie';

const MOVIE_API_URL =
  'https://yts.ag/api/v2/list_movies.json?sort_by=download_count';

class App extends Component {
  constructor() {
    super();

    this.state = {
      movieData: []
    };
  }

  componentDidMount() {
    this._getMovies();
  }

  _callAPI = () => {
    return fetch(MOVIE_API_URL)
      .then(res => res.json())
      .then(json => json.data.movies)
      .catch(err => console.log(err));
  };

  _getMovies = async () => {
    const movieData = await this._callAPI();
    this.setState({
      movieData
    });
  };

  _renderMovies = () => {
    const movies = this.state.movieData.map(movie => {
      console.log(movie);
      return (
        <Movie
          key={movie.id}
          title={movie.title}
          poster={movie.medium_cover_image}
          rating={movie.rating}
          genres={typeof movie.genres != 'undefined' ? movie.genres : []}
          synopsis={movie.synopsis}
        />
      );
    });
    return movies;
  };

  render() {
    const { movieData } = this.state;
    return (
      <div className={movieData.length > 0 ? 'App' : 'App--loading'}>
        <div className="container">
        <div className="row">
        {movieData.length > 0 ? this._renderMovies() : <h1>Loading...</h1>}
        </div>
        </div>
      </div>
    );
    // return <div className="App--loading">Loading...</div>;
  }
}

export default App;
