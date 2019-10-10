import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';

class App extends Component {
  // static defaultProps = {
  //   store: {
  //     lists: [],
  //     allCards: {},
  //   }
  // };

  state = {
    store: STORE
  }

  handleAddCard = index => {
    const newRandomCard = () => {
      const id = Math.random().toString(36).substring(2, 4)
        + Math.random().toString(36).substring(2, 4);
      return {
        id,
        title: `Random Card ${id}`,
        content: 'lorem ipsum',
      };
    }
    const newCard = newRandomCard();
    const newId = newCard.id;
    // const newIdObj = this.state.store.lists.find(item => {
    //   item.id === id;
    // });
    console.log(index);

    // const newSTORE = this.state.store;
    // console.log(newSTORE);
    // newSTORE.lists[0].cardIds.push(newId);
    // newSTORE.allCards = {
    //   newId: newCard
    // };

    const newStore = {...this.state.store};
    newStore.lists[index - 1].cardIds.push(newId);
    // newStore.allCards = {
    //     newId: newCard
    //   };

    console.log(newStore);
    this.setState({
      store: newStore
    });
  }

  render() {
    const store = this.state.store;


    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              handleAddCard={this.handleAddCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
