import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import iconUser from '../images/iconUser.png';

import Loading from '../components/Loading';
import Header from '../components/Header';

class Profile extends Component {
  state = {
    users: {},
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const result = await getUser();
    this.setState({ users: result, loading: false });
  }

  render() {
    const { users, loading } = this.state;
    return (
      <>
        <Header />

        <div
          className="profile-container"
        >
          {loading ? <Loading /> : (
            <div
              className="profile-container-info"
            >
              <img
                src={ users.image ? users.image : iconUser }
                alt={ `Foto do usúario: ${users.name}` }
                className="ImgUser"
              />
              <p
                className="profile-container-info-itens"
              >
                Usúrio(a):
                <p>{users.name}</p>
              </p>
              <p
                className="profile-container-info-itens"

              >
                Email:
                <p>
                  {users.email
                    ? users.email : 'Não cadastrado'}
                </p>
              </p>
              <p
                className="profile-container-info-itens"
              >
                Descrição:
                {' '}
                <p>
                  {users.description
                    ? users.description : 'Não cadastrado'}
                </p>
              </p>
              <Link to="/profile/edit">
                <button type="button">
                  Editar perfil
                </button>
              </Link>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Profile;
