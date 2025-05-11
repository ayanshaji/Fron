import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle, LibraryBooks, ExitToApp } from '@mui/icons-material';

const Navbar = ({ isLoggedIn, userRole, onLogout }) => {
  const buttonStyle = {
    color: 'white',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#6b5b95',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#6b5b95', boxShadow: 3 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Arial, sans-serif', letterSpacing: 2 }}>
          Library System
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button component={Link} to="/" sx={{ ...buttonStyle, fontSize: '1.1rem' }}>
            Home
          </Button>

          {isLoggedIn && userRole === 'admin' && (
            <>
              <Button component={Link} to="/add" sx={buttonStyle} startIcon={<LibraryBooks />}>
                Add Book
              </Button>
              <Button component={Link} to="/view" sx={buttonStyle} startIcon={<LibraryBooks />}>
                View Books
              </Button>
              <Button component={Link} to="/borrow" sx={buttonStyle} startIcon={<AccountCircle />}>
                Borrow Book
              </Button>
              <Button component="span" sx={buttonStyle} onClick={onLogout} startIcon={<ExitToApp />}>
                Logout
              </Button>
            </>
          )}

          {isLoggedIn && userRole === 'user' && (
            <>
              <Button component={Link} to="/view" sx={buttonStyle} startIcon={<LibraryBooks />}>
                View Books
              </Button>
              <Button component="span" sx={buttonStyle} onClick={onLogout} startIcon={<ExitToApp />}>
                Logout
              </Button>
            </>
          )}

          {!isLoggedIn && (
            <Button component={Link} to="/login" sx={buttonStyle}>
              Login
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
