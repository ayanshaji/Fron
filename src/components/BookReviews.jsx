import { useEffect, useState } from 'react';
import {
  Container, Typography, Box, TextField, Button, MenuItem,
  Paper, Divider, Rating
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReviewBook = () => {
  const { id: bookId } = useParams();
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!bookId) return;
    axios.get(`http://localhost:3004/reviews/${bookId}`)
      .then(res => setReviews(res.data))
      .catch(() => toast.error("Failed to load reviews"));
  }, [bookId]);

  const handleSubmit = () => {
    if (!username || !rating || !comment.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const newReview = {
      bookId,
      rating: parseInt(rating),
      comment,
      reviewer: username
    };

    axios.post('http://localhost:3004/reviews', newReview)
      .then(() => {
        toast.success("Review submitted!");
        setReviews(prev => [...prev, newReview]);
        setRating('');
        setComment('');
        setUsername('');
      })
      .catch(() => toast.error("Failed to submit review"));
  };

  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length
    : 0;

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        Book Reviews
      </Typography>

      {/* === Form Section (unchanged) === */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, mx: 'auto' }}>
        <TextField
          label="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          select
          label="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <MenuItem key={num} value={num}>
              {num} Star{num > 1 && 's'}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Comment"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit Review
        </Button>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* === Average Rating Display === */}
      {reviews.length > 0 && (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Average Rating
          </Typography>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, backgroundColor: '#fffde7', px: 3, py: 1.5, borderRadius: 2 }}>
            <Rating
              value={averageRating}
              precision={0.1}
              readOnly
              sx={{ color: '#fbc02d' }}
            />
            <Typography variant="body1">
              {averageRating.toFixed(1)} / 5
            </Typography>
          </Box>
        </Box>
      )}

      {/* === Review List === */}
      <Typography variant="h6" gutterBottom>All Reviews</Typography>
      {reviews.length === 0 ? (
        <Typography>No reviews yet.</Typography>
      ) : (
        reviews.map((review, index) => (
          <Paper
            key={review._id || index}
            elevation={2}
            sx={{
              p: 3,
              mb: 2,
              backgroundColor: '#f9f9f9',
              borderLeft: '4px solid #fbc02d'
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {review.reviewer}
            </Typography>
            <Rating
              value={Number(review.rating)}
              readOnly
              sx={{ color: '#fbc02d' }}
            />
            <Typography variant="body2" mt={1}>
              {review.comment}
            </Typography>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default ReviewBook;
 