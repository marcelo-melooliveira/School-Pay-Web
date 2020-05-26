import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding-top: 15px;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;
    background-color:#7159c1;
    border-radius: 10px;

    button {
      border: 0;
      background: none;
    }

    strong {
      color: #fff;
      font-size: 20px;
      margin: 0 15px;
      cursor: pointer;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: ${props => (props.pay ? '#2EFE2E' : '#FFF')};

  strong {
    display: block;
    color: #7159c1;
    font-size: 20px;
    font-weight: normal;
  }

  span {
    display: block;
    margin-top: 3px;
    color: #666;
    font-weight: ${props => (props.pay ? 'bold' : 'normal')};
  }
`;

export const LoadContainer = styled.div`
  max-width: 600px;
  height:400px;
  justify-content:center;
  align-items:center;
  display: flex;

  strong {
      color: #fff;
      font-size: 20px;
      margin: 0 15px;
      font-weight:bold;
    }
  ;`