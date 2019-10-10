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

  handleAddCard = (index) => {
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
    
    const generateNewList= this.state.store.lists.map(item => {
      if (item.id === index) {
        return{
          ...item,
          cardIds: [...item.cardIds, newCard.id]
        };
      }
      return item;
    })


    this.setState({
      store: {
        lists: generateNewList,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    })
  };

handleDeleteCard = (cardId) => {
  function omit(obj, keyToOmit) {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
          key === keyToOmit ? newObj : {...newObj, [key]: value},
      {}
    );
};
const {lists, allCards} = this.state.store;
  const generateNewList = lists.map(item => ({
    ...item,
    cardIds: item.cardIds.filter(id => id !== cardId)
  }));

  
  const afterDelete = omit(allCards, cardId);

  this.setState({
    store: {
      lists: generateNewList,
      allCards: afterDelete
    }
  })
};



  render() {
    const {store} = this.state;
    
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
              handleDeleteCard={this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
