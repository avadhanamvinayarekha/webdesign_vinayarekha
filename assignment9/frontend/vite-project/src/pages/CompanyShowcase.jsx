import { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

function CompanyShowcase() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError(false);
        // Use full URL for now to test
        const response = await axios.get('http://localhost:3000/api/companies');
        console.log('Companies data:', response.data); 
        setCompanies(response.data);
      } catch (err) {
        setError(true);
        console.error('Error fetching companies:', err);
        console.error('Error details:', err.response); 
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Failed to load companies. Make sure the backend is running on http://localhost:3000
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Our Partner Companies
      </Typography>
      
      <Grid container spacing={3}>
        {companies.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={company.imageUrl}
                alt={company.name}
              />
              <CardContent>
                <Typography variant="h6">{company.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {company.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CompanyShowcase;