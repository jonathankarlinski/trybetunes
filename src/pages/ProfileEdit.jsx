import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import iconUser from '../images/iconUser.png';

import Header from '../components/Header';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    disabledButton: true,
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const result = await getUser();
    this.setState({
      name: result.name,
      email: result.email,
      description: result.description,
      image: result.image,
      disabledButton: false,
      loading: false,
    });
  }

  validateValues = async ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.handleButton);
  };

  handleButton = () => {
    const { name, email, description } = this.state;
    const secretEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = secretEmail.test(email);
    if (name !== '' && description !== '' && validEmail) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  };

  userClick = async () => {
    const { name, email, description, image } = this.state;
    await updateUser({ name, email, description, image });
  };

  render() {
    const { name, email, description, image, disabledButton, loading } = this.state;
    console.log(image);
    console.log(image.valueOf);
    return (
      <>
        <Header />
        <div
          className="profileEdit-container"
        >
          {loading ? <Loading /> : (

            <form
              className="profileEdit-container-form"
            >
              <h2>Atualizar Perfil</h2>
              <img
                src={ image === '' ? iconUser : image }
                alt={ `Foto do usúario: ${name}` }
                className="ImgUser"
              />
              <label htmlFor="idName">
                Nome *
                <input
                  type="idName"
                  id="fielName"
                  spellCheck="false"
                  value={ name }
                  onChange={ this.validateValues }
                  name="name"
                />
              </label>
              <label htmlFor="idEmail">
                E-mail *
                <input
                  type="text"
                  id="idEmail"
                  value={ email }
                  onChange={ this.validateValues }
                  name="email"
                />
              </label>
              <label htmlFor="idDescription">
                Descrição *
                <textarea
                  type="textarea"
                  id="idDescription"
                  value={ description }
                  onChange={ this.validateValues }
                  name="description"
                />

              </label>
              <label htmlFor="idImage">
                Mudar Foto:
                <input
                  type="text"
                  id="idImage"
                  value={ image }
                  onChange={ this.validateValues }
                  name="image"
                />
              </label>
              {
                disabledButton
                && (

                  <p>Todas informações devem ser preenchidas </p>
                )
              }
              <Link to="/profile">
                <button
                  type="button"
                  disabled={ disabledButton }
                  onClick={ this.userClick }
                >
                  Editar perfil
                </button>
              </Link>
            </form>
          )}

        </div>
      </>
    );
  }
}

export default ProfileEdit;
