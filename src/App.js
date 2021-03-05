import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

// 필수, 리액트컴포넌트를 사용하는 base, render는 react.component안에 있다.
class App extends React.Component{
    state = {
        isLoading: true,
        moives: []
    };

    getMovies = async () => {
        const {
            data: {
                 data: { movies }
                    }
                } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
                this.setState({ movies, isLoading: false });
            };
        // movies값에 axios로 받아온 데이터를 집어넣음.
    componentDidMount() {
        this.getMovies();
    }
    render() {
        const { isLoading, movies } = this.state;
        return (
        <section className="container">
            {isLoading ? (
                <div className="loader">
                    <span className="loader__text">Loading...</span>
                </div>
            ) : (
            <div className="movies">
                {movies.map(movie => (
                    <Movie
                        key={movie.id}
                        id={movie.id}
                        year={movie.year}
                        title={movie.title}
                        summary={movie.summary}
                        poster={movie.medium_cover_image}
                        genres={movie.genres}
                    />
                ))}
            </div>
        )}
        </section>
        );
    }
}


export default App;