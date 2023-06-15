import React from 'react';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid'; // to generate unique ids for new factors
import { MdAdd, MdEdit } from "react-icons/md"; // Add and Edit icons

const initialData = [
    { id: '1', factor: 'Deal Size' },
    { id: '2', factor: 'Market Segment' },
    { id: '3', factor: 'Product fit' },
    { id: '4', factor: 'Engagement' },
  ];

  function Card({ children }) {
    return (
      <div style={{
        backgroundColor: 'black',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '300',   
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid grey',
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
        width: '70%',
        margin: 'auto',
        marginTop: '16px',
        marginBottom: '12px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        {children}
      </div>
    );
  }

export default function Table ({ data, handleScoreChange, handleFactorChange, onSave, onClose }) {
  
    const [showAddForm, setShowAddForm] = useState(false);
  const [newFactor, setNewFactor] = useState('');
    const [factors, setFactors] = useState(initialData);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(factors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFactors(items);
  };

  const handleAddFactor = () => {
    setFactors(prev => [...prev, { factor: newFactor, id: uuid() }]);
    setNewFactor('');
    setShowAddForm(false);
  };

  return (
    <div style={{display:'flex', flexDirection: 'column'}}>
        <div style={{flex: '5%',display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px'}}>

      <div style={{fontFamily: 'Inter, sans-serif', fontWeight:'300', textAlign: 'left', fontSize: 'large', marginBottom: '2rem', marginLeft: '5%', marginTop: '20px'}}>
      Sort Factors by Priority
      </div>
      <div onClick={() => setShowAddForm(true)} style={{ fontFamily: 'Inter, sans-serif', fontWeight:'300',cursor: 'pointer', color: 'white',marginBottom: '2rem', marginRight: '5%', marginTop: '20px', fontSize: 'small',borderRadius: '8px', border: '1px solid transparent',
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)', padding: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#266C95'
       }}>
        <MdAdd size={24} />
        <span>Add Custom Factor</span>
      </div>
   
        </div>
        <div style={{flex: '50%'}}>
    
        <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="factorBlocks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {factors.map(({ factor, id }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={{ ...provided.draggableProps.style, cursor: snapshot.isDragging ? 'grabbing' : 'grab' }}
                    >
                      <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4>{factor}</h4>
                        <div onClick={() => { /* add function to handle editing factor */ }} style={{ cursor: 'pointer' }}>
                          <MdEdit size={24} />
                        </div>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
        </div>
      {showAddForm && (
        <div style={{display:'flex', flex:'40%', flexDirection:'column', width:'40%', justifyContent:'center',alignContent:'center', margin:'auto', marginTop: '40px', backgroundColor:'#323232', border:'1px solid grey', borderRadius:'8px' }}>
          <input style={{backgroundColor: 'black',color:'white',fontFamily: 'Inter, sans-serif',padding:'3px',fontWeight: '300',width: '80%',margin: 'auto', marginTop:'20px', border:'1px solid black',borderRadius:'3px'}} placeholder='Enter new factor'
           value={newFactor} onChange={(e) => setNewFactor(e.target.value)} />
           <input style={{backgroundColor: 'black',fontFamily: 'Inter, sans-serif',padding:'3px',fontWeight: '300',width: '80%',margin: 'auto', marginTop:'5px', border:'1px solid black',borderRadius:'3px'}} placeholder='Description'
           />
          <button style={{width:'10%', margin:'auto', marginTop:'20px', marginBottom:'10px'}} onClick={handleAddFactor}>Add</button>
        </div>
      )}
    
    </div>
    
    
  );
}