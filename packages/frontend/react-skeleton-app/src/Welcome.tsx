import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Section, Container } from 'react-bulma-components';
import { HelloWorld } from './components/HelloWorld';
import { Products } from './components/Products';

interface AppState {
  date: Date;
  viewing: string;
}

const Welcome = (props: AppState) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [viewing, setViewing] = useState('');

  const productSelected = (optionValue: string) => {
    setViewing(optionValue);
  };

  return (
    <>
      <Section>
        <Container>
          <div className="App">
            <header className="App-header">
              <HelloWorld />
              <Products onProductSelected={productSelected} />
              <div className="notification">Notification...</div>
              <Link to={`/`}>Home</Link>
            </header>
            <div>
              hello {currentDate.toISOString()}
              <br />
              Currently viewing: {viewing}
            </div>
            <div className="container" />
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Welcome;
