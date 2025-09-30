import React, { Component, use } from 'react';
import InputField from '../../components/InputField/InputField';
import './cadastro.css';
import { auth, firestore } from '../../Firebase';
import { Navigate, Link } from 'react-router-dom';

class Mensagem extends Component {
  render() {
    const { texto } = this.props;
    return <p style={{ marginTop: '15px' }}>{texto}</p>;
  }
}

class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      sobrenome: '',
      data_nascimento: '',
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

  criar_cadastro = async () => {
    const { nome, sobrenome, data_nascimento, email, senha } = this.state;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.setState({ mensagem: 'E-mail inválido. Verifique o formato.' });
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
      const uid = userCredential.user.uid;

      await firestore.collection('usuario').doc(uid).set({
        nome,
        sobrenome,
        data_nascimento,
        email
      });
      this.setState({ redirect: true });
      this.setState({ mensagem: 'Cadastro realizado com sucesso!' });
      
      
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      this.setState({ mensagem: error.message });
    }
  };

  render() {
    const { email, senha, nome, sobrenome, data_nascimento, mensagem } = this.state;
    
    if (this.state.redirect) {
      return <Navigate to="/principal" />;
    }

    return (
      <div className="cadastro">
        <h2>Cadastro</h2>
        <InputField
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => this.setState({ nome: e.target.value })}
        />
        <InputField
          type="text"
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={(e) => this.setState({ sobrenome: e.target.value })}
        />
        <InputField
          type="date"
          placeholder="Data de Nascimento"
          value={data_nascimento}
          onChange={(e) => this.setState({ data_nascimento: e.target.value })}
        />
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
        <p className="sug">
          Já é cadastrado? &nbsp;
          <Link to="/login">Faça o login.</Link>
        </p>
        <button onClick={this.criar_cadastro}>Cadastrar</button>
        <Mensagem texto={mensagem} />
      </div>
    );
  }
}

export default Cadastro;