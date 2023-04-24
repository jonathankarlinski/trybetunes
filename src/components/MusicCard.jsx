import { React, Component } from 'react';
import { arrayOf } from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    favorite: false,
  };

  async componentDidMount() {
    const { trackObj, favoriteSongs } = this.props;
    const { trackId } = trackObj;
    const favoriteSongsObj = JSON.parse(favoriteSongs);
    const favorite = favoriteSongsObj.some((ft) => (ft.trackId === trackId));
    this.setState({
      favorite,
    });
  }

  favoriteChange = async (e) => {
    const { checked } = e.target;
    const { trackObj, afterRemove, setParentLoading } = this.props;
    if (checked) {
      await addSong(trackObj);
      this.setState({ favorite: true });
    } else {
      setParentLoading(true);
      await removeSong(trackObj);
      this.setState({ favorite: false });
      await afterRemove();
      setParentLoading(false);
    }
  };

  render() {
    const { trackObj } = this.props;
    const { trackName, previewUrl, trackId, artistName } = trackObj;
    const { favorite } = this.state;
    return (
      <div
        className="musicCard-container"
      >
        {window.location.href.includes('favorites')
          ? <p>{`${artistName} - ${trackName}`}</p>
          : <p>{trackName}</p>}
        <div
          className="musicCard-container-audioPlayer"
        >

          <audio
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ `check_${trackId}` }>
            <input
              className="heart-checkbox"
              type="checkbox"
              id={ `check_${trackId}` }
              onChange={ this.favoriteChange }
              checked={ favorite }
            />
            <span className="heart-icon" />
          </label>
        </div>
      </div>

    );
  }
}

MusicCard.propTypes = {
  songs: arrayOf,
}.isRequired;

export default MusicCard;
