import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// Initial State
const initialState = {
  searchTerm: "",
  movies: [
    {
      title: "The Godfather",
      description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    },
    {
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    },
    {
      title: "Schindler's List",
      description: "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazi Germans.",
    },
    {
      title: "Trapped",
      description: "A man struggles to survive after he unintentionally locks himself up in a high rise devoid of food, water and electricity.",
    },
  ],
};

// Action Types
const SEARCH_MOVIE = "SEARCH_MOVIE";

// Action Creators
const searchMovie = (searchTerm) => ({
  type: SEARCH_MOVIE,
  payload: searchTerm,
});

// Reducer Function
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MOVIE:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

// Store
const store = createStore(movieReducer);

// Movie Component
class Movie extends React.Component {
  handleChange = (e) => {
    const searchTerm = e.target.value;
    this.props.searchMovie(searchTerm);
  };

  render() {
    const { searchTerm, movies } = this.props;
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        Enter the title to search Movie: &nbsp;
        <input
          type="text"
          value={searchTerm}
          onChange={this.handleChange}
        />
        <ul>
          {filteredMovies.map((movie) => (
            <li key={movie.title}>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// Map Redux state to component props
const mapStateToProps = (state) => ({
  searchTerm: state.searchTerm,
  movies: state.movies,
});

// Map dispatch to props
const mapDispatchToProps = {
  searchMovie,
};

// Connect component to Redux store
const ConnectedMovie = connect(mapStateToProps, mapDispatchToProps)(Movie);

// Render the App
ReactDOM.render(
  <Provider store={store}>
    <ConnectedMovie />
  </Provider>,
  document.getElementById('root')
);
