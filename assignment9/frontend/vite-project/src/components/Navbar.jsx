import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar({ username, onLogout }) {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo/Brand */}
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 0,
            textDecoration: 'none', 
            color: 'inherit',
            mr: 4
          }}
        >
          Job Portal
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            HOME
          </Button>
          <Button color="inherit" component={Link} to="/about">
            ABOUT
          </Button>
          <Button color="inherit" component={Link} to="/jobs">
            JOBS
          </Button>
          <Button color="inherit" component={Link} to="/companies">
            COMPANIES
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            CONTACT
          </Button>
        </Box>

        {/* User info and Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1">
            {username}
          </Typography>
          <Button 
            color="inherit" 
            variant="outlined" 
            onClick={onLogout}
            sx={{ borderColor: 'white' }}
          >
            LOGOUT
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;