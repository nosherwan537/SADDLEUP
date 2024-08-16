import React, { useState, useEffect } from 'react';
import { getEvents } from '../services/eventService';
import { Link } from 'react-router-dom';
import { Container, Paper, Typography, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getEvents()
            .then(response => {
                setEvents(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching events:", err);
                setError("Failed to fetch events");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className='flex items-center justify-center h-screen'><CircularProgress /></div>;
    if (error) return <div className='text-red-500'>{error}</div>;

    return (
        <Container component="main" maxWidth="md" className='my-4'>
            <Paper elevation={3} className='p-4'>
                <Typography variant="h4" component="h2" gutterBottom align="center" className='mb-4'>
                    Upcoming Events
                </Typography>
                <div className='flex justify-center mb-4'>
                    <Button variant="contained" color="primary" component={Link} to="/events/add">
                        Add New Event
                    </Button>
                </div>
                <List>
                    {events.map(event => (
                        <ListItem key={event.id} divider>
                            <ListItemText
                                primary={<Typography variant="h6">{event.title}</Typography>}
                                secondary={
                                    <>
                                        <Typography variant="body1">{event.description}</Typography>
                                        <Typography variant="body2" color="textSecondary">{event.date}</Typography>
                                        <Typography variant="body2" color="textSecondary">{event.location}</Typography>
                                    </>
                                }
                            />
                            <Button variant="outlined" component={Link} to={`/events/edit/${event.id}`}>
                                Edit
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default EventList;
