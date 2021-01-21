import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TournamenListItem from './TournamenListItem';
import { startUpdateTournamentsSequenceOrder } from '../../../store/actions/tournaments';

const TournamentList = ({ listData, addButtonHandler, editButtonHandler, deleteHandler }) => {
  const dispatch = useDispatch();
  const { tournamentModes } = useSelector(state => state.tournamentModes);
  const { seasons } = useSelector(state => state.seasons);

  const [items, setItems] = useState(listData);

  useEffect(() => {
    if (listData.length > 0) setItems(listData);
  }, [listData]);

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgrey' : 'white',
  });

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const orderedItems = reorder(items, result.source.index, result.destination.index);

    const sequenceOrder = orderedItems.map((item, index) => ({ id: item.id, sequenceOrder: index }));
    dispatch(startUpdateTournamentsSequenceOrder(sequenceOrder));
    setItems(orderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <table className="DataTable" style={snapshot.isDraggingOver ? { border: 'none' } : null}>
            <thead>
              <tr className="DataTableHeaderRow">
                <th className="DataTableHeaderCell DataTableCell"></th>
                <th className="DataTableHeaderCell DataTableCell">Logo</th>
                <th className="DataTableHeaderCell DataTableCell">Competición</th>
                <th className="DataTableHeaderCell DataTableCell">Estado</th>
                <th className="DataTableHeaderCell DataTableCell">Modalidad</th>
                {/* <th className="DataTableHeaderCell DataTableCell">Temporada</th> */}
                <th className="DataTableHeaderCell DataTableCell">Visible</th>
                <th className="DataTableHeaderCell DataTableCell"></th>
              </tr>
            </thead>

            <tbody
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((tournament, index) => (
                <Draggable key={tournament.id} draggableId={`${tournament.id}`} index={index}>
                  {(provided, snapshot) => (
                    <TournamenListItem
                      provided={provided}
                      snapshot={snapshot}
                      tournament={tournament}
                      tournamentModes={tournamentModes}
                      seasons={seasons}
                      edit={editButtonHandler}
                      remove={deleteHandler}
                    />
                  )}
                </Draggable>
              ))}
            </tbody>
          </table>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TournamentList;
