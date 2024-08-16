import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper, Typography, CircularProgress } from '@mui/material';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/api/events/${id}/`)
            .then(response => {
                setEvent(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching event:', error);
                setError("Failed to load event details.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className='flex items-center justify-center min-h-screen'>
            <CircularProgress />
        </div>
    );

    if (error) return (
        <div className='flex items-center justify-center min-h-screen'>
            <Typography color="error">{error}</Typography>
        </div>
    );

    return (
        <Container component="main" maxWidth="sm" className='my-4'>
            <Paper elevation={3} className='p-4'>
                <Typography variant="h4" component="h1" gutterBottom>
                    {event.title}
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Description:</strong> {event.description}
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Date:</strong> {new Date(event.date).toLocaleString()}
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Location:</strong> {event.location}
                </Typography>
            </Paper>
        </Container>
    );
};

export default EventDetail;
