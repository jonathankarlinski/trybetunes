import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import iconUser from '../images/iconUser.png';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      users: {},
    };
  }

  componentDidMount() {
    getUser()
      .then((users) => {
        this.setState({
          users,
        });
      });
  }

  render() {
    const { users } = this.state;

    const classActive = 'header-container-links-active';
    const classDisabled = 'header-container-links-disabled';
    return (
      <header
        className="header-container"
      >
        <div
          className="header-container-user"
        >
          {users.name === undefined
            ? <Loading /> : (
              <>
                <img
                  src={ users.image
                    ? users.image
                    : iconUser }
                  alt={ users.image }
                />
                <p>
                  {users.name}
                </p>
              </>
            )}
        </div>
        <div>

          <h1>
            Trybe
            <h1>Tunes</h1>
          </h1>
        </div>
        <div
          className="header-container-links"
        >
          <Link
            className={ window.location.href.includes('search')
              ? classActive
              : classDisabled }
            to="/search"
          >
            <h2>Search</h2>

          </Link>
          <Link
            className={ window.location.href.includes('favorites')
              ? classActive
              : classDisabled }
            to="/favorites"
          >
            <h2>Favorites</h2>

          </Link>
          <Link
            className={ window.location.href.includes('profile')
              ? classActive
              : classDisabled }
            to="/profile"
          >
            <h2>Profile</h2>

          </Link>
        </div>
      </header>
    );
  }
}
export default Header;
