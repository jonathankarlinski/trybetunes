import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    name: '',
    buttonDisabled: true,
    loading: false,
    loaded: false,
    characters: false,
  };

  handleValue = ({ target }) => {
    const { name } = target;
    this.setState(() => ({
      [name]: target.value }), this.valueChecking);
  };

  valueChecking = () => {
    const minimumNumber = 3;
    const { name } = this.state;
    if (name.length >= minimumNumber) {
      this.setState(() => ({ buttonDisabled: false, characters: true }));
    } else {
      this.setState(() => ({ buttonDisabled: true, characters: false }));
    }
  };

  userClick = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false, loaded: true });
  };

  render() {
    const { buttonDisabled, loaded, loading, characters } = this.state;
    return (
      <div
        className="login-container"
      >
        { loading
          ? <Loading /> : (
            <>
              <h1
                className="login-container-title"
              >
                Trybe
                <h1>Tunes</h1>
              </h1>
              <label htmlFor="name">
                <input
                  type="text"
                  name="name"
                  placeholder="Escreva seu nome aqui"
                  spellCheck="false"
                  onChange={ this.handleValue }
                />
              </label>
              <p
                className={ characters
                  ? 'login-container-validate-true' : 'login-container-validate-false' }
              >
                * Minimo de 3 caracteres

              </p>
              <button
                type="button"
                disabled={ buttonDisabled }
                onClick={ this.userClick }
              >
                Entrar
              </button>
            </>
          )}
        { loaded && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
