import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Components/Movie';

class App extends Component {
  state = {
    movieData: []
  };

  _renderMovies = () => {
    const movies = this.state.movieData.map((movie, idx) => {
      return <Movie key={idx} title={movie.title} poster={movie.img} />;
    });
    return movies;
  };
  render() {
    return (
      <div className="App">
        {this.state.movieData ? this._renderMovies() : 'Loading...'}
      </div>
    );
  }

  componentDidMount() {
    // fetch('https://yts.ag/api/v2/list_movies.json?sort_by=rating');
    this.setState({
      movieData: [
        {
          title: '출국',
          img:
            'http://img.cgv.co.kr/Movie/Thumbnail/Poster/000081/81257/81257_185.jpg'
        },
        {
          title: '베테랑',
          img:
            'https://cdn.ppomppu.co.kr/zboard/data3/2018/0713/m_20180713101353_gvhyunuv.jpg'
        }
      ]
    });
  }
}

export default App;
