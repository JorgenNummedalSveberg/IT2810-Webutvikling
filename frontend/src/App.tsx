import React from 'react';
import './CSS/App.css';
import Header from "./Components/Header";
import MainContent from './Components/MainContent';
import 'semantic-ui-css/semantic.min.css'
import {Card, Icon, Image} from 'semantic-ui-react';
import _ from 'lodash';

function App() {
  return (
    <div className="App">
      <Header/>
      <MainContent/>
      <header className="App-header">
          <Card.Group className={"CardGroup"} centered>
              {cards}
          </Card.Group>
      </header>
    </div>
  );
}

const cards = _.times(10, (i: number) => (
    <MovieCard key={i}/>
))

function MovieCard() {
  return(
      <Card className={"movieCard"}>
        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
        <Card.Content>
          <Card.Header>Matthew</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            22 Friends
          </a>
        </Card.Content>
      </Card>
  )
}

export default App;
