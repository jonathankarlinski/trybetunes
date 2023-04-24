import { React, Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    favoriteSongs: '',
    favoriteSongsObj: [],
    loading: false,
  };

  async componentDidMount() {
    this.retrieveFavorites();
  }

  retrieveFavorites = async () => {
    const favoriteSongsObj = await getFavoriteSongs();
    const favoriteSongs = JSON.stringify(favoriteSongsObj);
    this.setState({
      favoriteSongs,
      favoriteSongsObj,
    });
  };

  setLoading = (isLoading) => {
    this.setState({
      loading: isLoading,
    });
  };

  render() {
    const { favoriteSongs, favoriteSongsObj, loading } = this.state;

    return (
      <div
        className="favorites-container"
      >
        <Header />
        {favoriteSongsObj.length !== 0
          ? (
            <h1
              className="favorites-container-title"
            >
              {`Você possui
              ${favoriteSongsObj.length} ${favoriteSongsObj
              .length - 1 === 1 ? 'música' : 'músicas'}
              favoritadas`}

            </h1>
          )
          : (
            <h1
              className="favorites-container-menssage"
            >
              Você ainda não favoritou nenhuma música!
            </h1>
          )}
        {
          !loading
            ? (
              favoriteSongsObj.map((ft) => (
                <MusicCard
                  key={ ft.trackId }
                  trackObj={ ft }
                  favoriteSongs={ favoriteSongs }
                  afterRemove={ this.retrieveFavorites }
                  setParentLoading={ this.setLoading }
                />
              ))
            )
            : ''
        }
      </div>
    );
  }
}

export default Favorites;
