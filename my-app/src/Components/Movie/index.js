import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

class Movie extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    genres: PropTypes.array.isRequired,
    synopsis: PropTypes.string.isRequired
  };

  constructor() {
    super();

    this.state = {
      synopsisOpen: false
    };
  }

  componentWillMount() {
    // console.log('will mount');
  }
  componentDidMount() {
    // console.log('did mount');
    // console.log(this.props);
  }
  _toggleSynopsis = () => {
    console.log('_toggleSynopsis');
    this.setState({ synopsisOpen: this.state.synopsisOpen ? false : true });
  };
  render() {
    // console.log('render');
    return (
      <div className="movie__block col-12 col-sm-6">
        <div className="block__inner">
          <div className="col-12 col-lg-4">
            <MoviePoster title={this.props.title} poster={this.props.poster} />
            <MovieRating rating={this.props.rating} />
          </div>
          <div className="col-12 col-lg p-3">
            <MovieTitle title={this.props.title} />
            <MovieGenre genres={this.props.genres} />
            <MovieSynopsis
              synopsis={this.props.synopsis}
              isOpen={this.state.synopsisOpen}
              btnEvent={this._toggleSynopsis}
            />
          </div>
        </div>
      </div>
    );
  }
}

function MoviePoster({ title, poster }) {
  return (
    <div className="poster__wrap">
      <img className="img-fluid" src={poster} alt={title} title={title} />
    </div>
  );
}
function MovieTitle({ title }) {
  return (
    <div className="title__wrap">
      <h5>{title}</h5>
    </div>
  );
}
function MovieRating({ rating }) {
  var ratingStyle = {
    width: rating * 10 + '%',
    top: '-1px',
    left: '-1px'
  };
  return (
    <div className="rating__wrap">
      <div className="rating_stars__wrap">
        <div className="rating_stars g-color-lightgrey">
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
        </div>
        <div className="rating_stars g-color-yellow" style={ratingStyle}>
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
        </div>
      </div>
      {/* <div className="rating_ratio">
        <span className="rating_ratio--title">Rating: </span>
        <span className="rating_ratio--value">{rating}</span>
      </div> */}
    </div>
  );
}
function MovieGenre({ genres }) {
  return (
    <div className="genres__wrap">
      <div className="genres__content">
        {genres
          .map((genre, idx) => genre)
          .reduce((prev, curr) => [prev, ', ', curr])}
      </div>
    </div>
  );
}
function MovieSynopsis({ synopsis, isOpen = false, btnEvent }) {
  return (
    <div className="synopsis__wrap">
      <div className={isOpen ? 'synopsis__content--full' : 'synopsis__content'}>
        {synopsis}
      </div>
      <div className="py-2">
        <button
          className="synopsis_more btn-block btn-outline-secondary"
          onClick={btnEvent}
        >
          more
        </button>
      </div>
    </div>
  );
}
MoviePoster.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired
};
MovieTitle.propTypes = {
  title: PropTypes.string.isRequired
};
MovieRating.propTypes = {
  rating: PropTypes.number.isRequired
};
MovieGenre.propTypes = {
  genres: PropTypes.array.isRequired
};
MovieSynopsis.propTypes = {
  synopsis: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  btnEvent: PropTypes.func.isRequired
};

export default Movie;
