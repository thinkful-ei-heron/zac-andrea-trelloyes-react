import React from 'react';
import Card from './Card'
import './List.css';

export default function List(props) {
  console.log(props);
  console.log(props.id);
  console.log(props.cards);
  return (
    <section className='List'>
      <header className='List-header'>
        <h2>{props.header}</h2>
      </header>
      <div className='List-cards'>
        {props.cards.map(card =>
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.content}
          />
        )}
        <button
          onClick={() => props.handleAddCard(props.id)}
          type='button'
          className='List-add-button'
        >
          + Add Random Card
        </button>
      </div>
    </section>
  )
}
