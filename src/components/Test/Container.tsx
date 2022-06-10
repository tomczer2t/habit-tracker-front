import { FC, memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Card } from './Card';

const style = {
  width: 400,
};

const ITEMS = [
  {
    id: 1,
    text: 'Write a cool JS library',
  },
  {
    id: 2,
    text: 'Make it generic enough',
  },
  {
    id: 3,
    text: 'Write README',
  },
  {
    id: 4,
    text: 'Create some examples',
  },
  {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it',
  },
  {
    id: 6,
    text: '???',
  },
  {
    id: 7,
    text: 'PROFIT',
  },
];

export const Container: FC = memo(function Container() {
  const [cards, setCards] = useState(ITEMS);

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter((c) => `${ c.id }` === id)[0] as { id: number; text: string };
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards],
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { index } = findCard(id);
      setCards(prev => {
        const copy = [...prev];
        const item = copy.splice(index, 1)[0];
        copy.splice(atIndex, 0, item);
        return copy;
      });
    },
    [findCard, cards, setCards],
  );

  const [, drop] = useDrop(() => ({ accept: 'card' }));
  return (
    <div ref={ drop }
         style={ style }>
      { cards.map((card) => (
        <Card
          key={ card.id }
          id={ `${ card.id }` }
          text={ card.text }
          moveCard={ moveCard }
          findCard={ findCard }
        />
      )) }
    </div>
  );
});
