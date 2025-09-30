import React, { Component } from 'react';
import { auth, firestore } from '../../Firebase'; // ✅ importa firestore corretamente

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      sobrenome: '',
      data_nascimento: ''
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;
        try {
          const userDoc = await firestore.collection('usuario').doc(uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            this.setState({
              nome: userData.nome,
              sobrenome: userData.sobrenome,
              data_nascimento: userData.data_nascimento 
            });
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      } else {
        console.log('Nenhum usuário logado');
      }
    });
  }

  render() {
    const { nome, sobrenome, data_nascimento } = this.state;

    return (
      <div>
        <h2>Informações do Usuário</h2>
        <p><strong>Nome:</strong> {nome}</p>
        <p><strong>Sobrenome:</strong> {sobrenome}</p>
        <p><strong>Data de Nascimento:</strong> {data_nascimento}</p>
      </div>
    );
  }
}

export default Principal;
