/*import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, Box, FormControl,
  InputLabel, Select, MenuItem, Paper
} from '@mui/material';
import { toast } from 'react-toastify';

const STATIC_GENRES = [
  "Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Biography",
  "Mystery", "Thriller", "Romance", "Historical", "Self-Help",
  "Adventure", "Horror", "Poetry", "Drama", "Philosophy",
  "Children", "Young Adult", "Graphic Novel", "Cooking", "Travel"
];

const EditBook = ({ books, setBooks, userRole }) => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();
  
  // State for form fields
  const [bookData, setBookData] = useState({
    id: '',
    title: '',
    author: '',
    genre: '',
    published: '',
    reserved: false,
    reservedBy: null,
    borrowed: false,
    borrowedBy: null,
    borrowDate: null
  });

  // Find the book by ID when component mounts
  useEffect(() => {
    if (userRole !== 'admin') {
      toast.error("Access denied. Admins only.");
      navigate('/books');
      return;
    }

    const book = books.find((b) => b.id === id);
    if (book) {
      setBookData(book);
    } else {
      toast.error("Book not found!");
      navigate('/view');
    }
  }, [id, books, navigate, userRole]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookData.title || !bookData.author || !bookData.genre || !bookData.published) {
      toast.error("All fields are required!");
      return;
    }

    // Update the books array
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...bookData } : book
      )
    );
    toast.success("Book updated successfully!");
    navigate('/view');
  };

  // Handle cancel button
  const handleCancel = () => {
    navigate('/view');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Edit Book</Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
            fullWidth
          />
          <FormControl fullWidth required>
            <InputLabel>Genre</InputLabel>
            <Select
              name="genre"
              value={bookData.genre}
              onChange={handleChange}
              label="Genre"
            >
              {STATIC_GENRES.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Published Year"
            name="published"
            type="number"
            value={bookData.published}
            onChange={handleChange}
            required
            fullWidth
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditBook;*/

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, Box, FormControl,
  InputLabel, Select, MenuItem, Paper
} from '@mui/material';
import { toast } from 'react-toastify';

const STATIC_GENRES = [
  "Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Biography",
  "Mystery", "Thriller", "Romance", "Historical", "Self-Help",
  "Adventure", "Horror", "Poetry", "Drama", "Philosophy",
  "Children", "Young Adult", "Graphic Novel", "Cooking", "Travel"
];

const EditBook = ({ books, setBooks, userRole }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [bookData, setBookData] = useState({
    id: '',
    title: '',
    author: '',
    genre: '',
    published: '',
    reserved: false,
    reservedBy: null,
    borrowed: false,
    borrowedBy: null,
    borrowDate: null
  });

  useEffect(() => {
    if (userRole !== 'admin') {
      toast.error("Access denied. Admins only.");
      navigate('/books');
      return;
    }

    const book = books.find((b) => b.id === id);
    if (book) {
      setBookData(book);
    } else {
      toast.error("Book not found!");
      navigate('/view');
    }
  }, [id, books, navigate, userRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookData.title || !bookData.author || !bookData.genre || !bookData.published) {
      toast.error("All fields are required!");
      return;
    }

    // Update the books array
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, ...bookData } : book
    );
    setBooks(updatedBooks);
    // Save to localStorage
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    toast.success("Book updated successfully!");
    navigate('/view');
  };

  const handleCancel = () => {
    navigate('/view');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Edit Book</Typography>
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={bookData.title || ''}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Author"
            name="author"
            value={bookData.author || ''}
            onChange={handleChange}
            required
            fullWidth
          />
          <FormControl fullWidth required>
            <InputLabel>Genre</InputLabel>
            <Select
              name="genre"
              value={bookData.genre || ''}
              onChange={handleChange}
              label="Genre"
            >
              {STATIC_GENRES.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Published Year"
            name="published"
            type="number"
            value={bookData.published || ''}
            onChange={handleChange}
            required
            fullWidth
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditBook;

