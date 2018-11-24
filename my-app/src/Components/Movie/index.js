import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

class Movie extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
  };

  componentWillMount() {
    console.log('will mount');
  }

  render() {
    console.log('render');
    return (
      <div className="movie_blocks">
        <MoviePoster title={this.props.title} poster={this.props.poster} />
        <h1>{this.props.title}</h1>
      </div>
    );
  }

  componentDidMount() {
    console.log('did mount');
  }
}

function MoviePoster({ title, poster }) {
  return <img src={poster} alt={title} />;
}

MoviePoster.propTypes = {
  poster: PropTypes.string.isRequired
};

export default Movie;
