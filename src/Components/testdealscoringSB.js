import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const SideMenu = () => {
  const handleMenuClick = (menuItem) => {
    // Handle menu item click here
    console.log(`Clicked ${menuItem}`);
  };

  return (
    <Drawer anchor="left" variant="permanent" style={{ marginTop: '64px' }}>
      <List style={{ height: '100%' }}>
        <ListItem button onClick={() => handleMenuClick('Menu Item 1')}>
          <ListItemText primary="Menu Item 1" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick('Menu Item 2')}>
          <ListItemText primary="Menu Item 2" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick('Menu Item 3')}>
          <ListItemText primary="Menu Item 3" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;


