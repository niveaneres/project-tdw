import React, { Component } from 'react';
import InputField from '../../components/InputField/InputField';
import './login.css';
import { auth } from '../../Firebase';
import { Navigate, Link } from 'react-router-dom';



class Mensagem extends Component {
  render() {
    const { texto } = this.props;
    return <p style={{ marginTop: '15px' }}>{texto}</p>;
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      mensagem: '',
      redirect: false
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSenhaChange = (e) => {
    this.setState({ senha: e.target.value });
  };


  realizar_login = () => {
    auth.signInWithEmailAndPassword(this.state.email, this.state.senha)
      .then((userCredential) => {
        const user = userCredential.user;
        this.setState({ mensagem: 'Login realizado com sucesso!' });
        console.log('Usuário logado:', user);
        this.setState({ redirect: true });
      })
      .catch((error) => {
        this.setState({ mensagem: 'Usuário não cadastrado ou credenciais incorretas'});
        console.error('Erro de login:', error);
      });
  };


  render() {
    const { email, senha, mensagem } = this.state;

    if (this.state.redirect) {
          return <Navigate to="/principal" />;
        }

    return (
       <div>
        <div className="login">
          <h2>Login</h2>
          <InputField
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={this.handleEmailChange}
          />
          <InputField
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={this.handleSenhaChange}
          />  
            <button onClick={this.realizar_login} className="botao">Acessar</button>
            <Mensagem texto={mensagem} />
          </div>
        </div>
    );
  }
}

export default Login;
