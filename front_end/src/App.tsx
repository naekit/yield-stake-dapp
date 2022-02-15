import React from 'react';
import { ChainId, DAppProvider } from '@usedapp/core'
import { Header } from './components/header';
import { Container } from "@material-ui/core"

function App() {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Kovan, ChainId.Rinkeby]
    }}>
      <Header />
      <Container maxWidth="md">
        <div> HI!! </div>
      </Container>
    </DAppProvider>
  );
}

export default App; 
