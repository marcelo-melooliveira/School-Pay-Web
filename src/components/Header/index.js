import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '~/store/modules/auth/actions';
// import Notifications from '../Notifications';

import logo from '../../assets/icon.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">INICIO</Link>
          <Link to="/pagamentos">PAGAMENTOS</Link>
          <Link to="/alunos">ALUNOS</Link>
          <Link to="/gerar-boleto">GERAR BOLETO</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.sobrenome}</strong>
              <button type="button" onClick={() => handleSignOut()}>
                <strong>Sair</strong>
              </button>
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
