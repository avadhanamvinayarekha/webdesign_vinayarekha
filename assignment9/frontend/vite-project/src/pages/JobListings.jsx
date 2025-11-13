import { Container, Typography, Card, CardContent, CardActions, Button, Chip, Box } from '@mui/material';
import { jobPosts } from '../data/jobPosts';

function JobListings() {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Available Positions
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3,
        justifyContent: 'flex-start'
      }}>
        {jobPosts.map((job) => (
          <Card 
            key={job.id}
            sx={{ 
              width: 'calc(50% - 12px)',
              display: 'flex', 
              flexDirection: 'column',
              '@media (max-width: 900px)': {
                width: '100%'
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {job.title}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                {job.description}
              </Typography>

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                Required Skills:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {job.requiredSkills.map((skill, index) => (
                  <Chip key={index} label={skill} size="small" color="primary" variant="outlined" />
                ))}
              </Box>

              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'success.main', mb: 1 }}>
                Salary: {job.salary}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {job.lastUpdated}
              </Typography>
            </CardContent>
            
            <CardActions>
              <Button size="small" variant="contained" href={job.applyLink} target="_blank">
                Apply Now
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default JobListings;