import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { css } from '@emotion/react';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const menuItems = [
    { label: 'Gallery', link: '/' },
    { label: 'Details', link: '/details/water' },
  ];

  const getPageName = (pathname) => {
    const parts = pathname.split('/');
    const pageName = parts[1];
    switch (pageName) {
      case '':
        return 'Gallery';
      case 'details':
        return 'Detail page';
      default:
        return '';
    }
  };

  const headerStyle = css`
    background: linear-gradient(to right, #8560C4, #5849A9);
  `;

  const titleStyle = css`
    flex-grow: 1;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    color: white;
  `;

  return (
    <AppBar position="static" sx={headerStyle}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component={RouterLink} to="/" sx={titleStyle}>
          {getPageName(location.pathname)}
        </Typography>
        <IconButton edge="end" color="inherit" aria-label="more options">
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          {menuItems.map((menuItem) => (
            <ListItem button key={menuItem.label} component={RouterLink} to={menuItem.link} onClick={toggleDrawer}>
              <ListItemText primary={menuItem.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;