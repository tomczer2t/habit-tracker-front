import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';

import './SingleNameItem.css';

interface Props {
  habit: { name: string, id: string, orderNo: number };
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
  saveNewOrder: () => void;
}

export const SinglNameItem = ({ habit, moveCard, findCard, saveNewOrder }: Props) => {

  const [disableHoverStyles, setDisableHoverStyles] = useState(false);

  const originalIndex = findCard(habit.id).index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'item',
      item: { id: habit.id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        setDisableHoverStyles(false);
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [habit.id, originalIndex, moveCard],
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'item',
      hover({ id: draggedId }: { id: string; originalId: string }) {
        if (draggedId !== habit.id) {
          const { index: overIndex } = findCard(habit.id);
          moveCard(draggedId, overIndex);
        }
      },
      drop: () => {
        saveNewOrder();
      },
    }),
    [findCard, moveCard],
  );

  useEffect(() => {
    console.log(isDragging)
    if (isDragging) {
      setDisableHoverStyles(true);
    }
  }, [isDragging])

  const opacity = isDragging ? 0 : 1;

  return (
    <li className="SingleNameItem"
        ref={ (node) => drag(drop(node)) }
        style={ { opacity } }>
      <Link to={ `/habit/${ habit.id }` }>
        <div className={ `SingleName__cell cell ${ disableHoverStyles ? 'disable-hover-styles' : '' }` }
             style={ { fontSize: habit.name.length < 20 ? '1em' : '.8em' } }>
          { habit.name }
        </div>
      </Link>
    </li>
  );
};