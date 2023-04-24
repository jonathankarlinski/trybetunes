import { React, Component } from 'react';
import { shape, string } from 'prop-types';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    album: [{}],
    favoriteSongs: '',
    loading: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const album = await getMusics(id);
    const favoriteSongsObj = await getFavoriteSongs();
    const favoriteSongs = JSON.stringify(favoriteSongsObj);
    this.setState({
      album,
      favoriteSongs,
      loading: true,
    });
  }

  formatDate = (dataString) => {
    const date = new Date(dataString);
    const ano = date.getFullYear().toString();
    return `${ano}`;
  };

  linkRefactored = (url) => {
    if (url) {
      return url.replace('/60x60bb.jpg', '/512x512bb.jpg');
    }
  };

  render() {
    const { album, favoriteSongs, loading } = this.state;
    const { collectionId,
      artworkUrl60,
      collectionName,
      artistName,
      releaseDate,
      trackCount,
    } = album[0];

    return (
      <>
        <Header />
        {!loading

          ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            <div
              className="album-container"
            >
              <img
                src={ `${this.linkRefactored(artworkUrl60)}` }
                alt={ collectionId }
              />
              <div
                className="album-container-details"
              >
                <h1>
                  {collectionName}
                </h1>
                <p>
                  {`${artistName} - 
              ${this.formatDate(releaseDate)} - ${trackCount} 
              ${trackCount === 1 ? 'música' : 'músicas'}`}
                </p>
              </div>
            </div>
          )}
        {
          album.map((track, i) => (
            i > 0
              ? (
                <MusicCard
                  key={ track.trackId }
                  trackObj={ track }
                  favoriteSongs={ favoriteSongs }
                />
              )
              : ''
          ))
        }

      </>
    );
  }
}

Album.propTypes = {
  match: shape,
  params: shape,
  id: string,
}.isRequired;

export default Album;
