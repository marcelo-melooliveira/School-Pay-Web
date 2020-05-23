import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// import Notifications from '../Notifications';

import logo from '../../assets/book-purple.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">INICIO</Link>
          <Link to="/pagamentos">PAGAMENTOS</Link>
          <Link to="/alunos">ALUNOS</Link>
        </nav>

        <aside>
         

          <Profile>
            <div>
              <strong>{profile.username}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                (profile.avatar && profile.avatar.url) ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="Marcelo Melo"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
