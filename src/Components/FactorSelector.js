import * as React from 'react';
import { styled } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const AccordionsContainer = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const AccordionItem = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  backgroundColor: '#1C1C1C',
}));

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');
  const [accordions, setAccordions] = React.useState([
    { id: 'panel1', title: 'Email Sentiment', content: '', percentage: '35%' },
    { id: 'panel2', title: 'Close Date Push', content: '', percentage: '26%' },
    { id: 'panel3', title: 'Properties Fill', content: '', percentage: '15%' },
    { id: 'panel4', title: 'Response Time', content: '', percentage: '5%' },
  ]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    setAccordions((prevAccordions) => {
      const newAccordions = Array.from(prevAccordions);
      const [removed] = newAccordions.splice(startIndex, 1);
      newAccordions.splice(endIndex, 0, removed);
      return newAccordions;
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="accordion-list">
        {(provided) => (
          <AccordionsContainer ref={provided.innerRef} {...provided.droppableProps}>
            {accordions.map((accordion, index) => (
              <Draggable key={accordion.id} draggableId={accordion.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <AccordionItem expanded={expanded === accordion.id} onChange={handleChange(accordion.id)}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${accordion.id}-content`}
                        id={`${accordion.id}-header`}
                        {...provided.dragHandleProps}
                      >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                          {accordion.title}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{accordion.percentage}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{accordion.content}</Typography>
                      </AccordionDetails>
                    </AccordionItem>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </AccordionsContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}
