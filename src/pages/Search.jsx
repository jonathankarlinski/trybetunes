import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    text: '',
    buttonDisabled: true,
    albuns: [],
    loading: false,
    result: '',
    menssage: 'Nenhum artista ou banda pesquisada',
  };

  handleValue = ({ target }) => {
    const { name } = target;
    this.setState(() => ({
      [name]: target.value,
    }), this.valueChecking);
  };

  valueChecking = () => {
    const minimumCharacters = 2;
    const { text } = this.state;
    if (text.length >= minimumCharacters) {
      this.setState(() => ({ buttonDisabled: false }));
    } else {
      this.setState(() => ({ buttonDisabled: true }));
    }
  };

  userApi = async () => {
    const { text } = this.state;
    this.setState({
      loading: true,
      result: text,
    });
    const response = await searchAlbumsAPI(text);
    this.setState({
      text: '',
      albuns: response,
      loading: false,
      menssage: 'Nenhum artista ou banda encontrada',
    });
  };

  formatDate = (dataString) => {
    const date = new Date(dataString);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const ano = date.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  };

  linkRefactored = (url) => url.replace('/100x100bb.jpg', '/512x512bb.jpg');

  render() {
    const { buttonDisabled, loading, result, albuns, menssage, text } = this.state;
    console.log(albuns);
    return (
      <div>
        <Header />
        <form
          className="search-container-form"
        >
          {
            loading ? <Loading />
              : (
                <>
                  <label htmlFor="text">
                    <input
                      type="text"
                      name="text"
                      spellCheck="false"
                      value={ text }
                      onChange={ this.handleValue }
                    />
                  </label>
                  <button
                    type="button"
                    disabled={ buttonDisabled }
                    onClick={ this.userApi }
                  >
                    <FontAwesomeIcon icon={ faMagnifyingGlass } fontSize="1.5rem" />
                  </button>
                </>
              )
          }
        </form>
        <div
          className="search-container"
        >
          {albuns.length > 0 ? (
            <div
              className="search-container-list"
            >
              <h1
                className="search-container-list-title"
              >
                {`Resultado da pesquisa de: ${result}`}

              </h1>
              <div>
                {albuns.map(
                  (album) => (
                    <div
                      key={ album.collectionId }
                      className="search-container-list-albums"
                    >
                      <Link
                        to={ `/album/${album.collectionId}` }
                      >
                        <img
                          src={ `${this.linkRefactored(album.artworkUrl100)}` }
                          alt={ album.collectionName }
                        />
                        <div
                          className="search-container-list-albums-details"
                        >
                          <p
                            className="search-container-list-albums-details-title"
                          >
                            {album.collectionName}
                          </p>
                          <p
                            className="search-container-list-albums-details-name"
                          >
                            {
                              `${this.formatDate(album.releaseDate)} -
                            ${album.artistName}`
                            }
                          </p>
                        </div>
                      </Link>
                    </div>),
                )}
              </div>
            </div>
          )
            : <p className="search-container-list-menssage">{menssage}</p>}
        </div>

      </div>
    );
  }
}

export default Search;
