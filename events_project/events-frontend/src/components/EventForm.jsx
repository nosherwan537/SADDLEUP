import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, updateEvent } from '../services/eventService';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';

const EventForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { eventId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (eventId) {
            setLoading(true);
            getEvents()
                .then(response => {
                    const event = response.data.find(e => e.id === parseInt(eventId));
                    if (event) {
                        setTitle(event.title);
                        setDescription(event.description);
                        setDate(event.date);
                        setLocation(event.location);
                        setIsUpdating(true);
                    }
                })
                .catch(err => setError("Failed to fetch event"))
                .finally(() => setLoading(false));
        }
    }, [eventId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const eventData = { title, description, date, location };

        if (isUpdating) {
            updateEvent(eventId, eventData)
                .then(() => navigate('/'))
                .catch(err => setError("Failed to update event"))
                .finally(() => setLoading(false));
        } else {
            createEvent(eventData)
                .then(() => navigate('/'))
                .catch(err => setError("Failed to create event"))
                .finally(() => setLoading(false));
        }
    };

    return (
        <Container component="main" maxWidth="sm" className='my-4'>
            <Paper elevation={3} className='p-4'>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    {isUpdating ? "Update Event" : "Add Event"}
                </Typography>
                {loading && <div className='flex items-center justify-center'><CircularProgress /></div>}
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <TextField
                        label="Date"
                        type="datetime-local"
                        variant="outlined"
                        fullWidth
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <TextField
                        label="Location"
                        variant="outlined"
                        fullWidth
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                    <div className='flex justify-center'>
                        <Button variant="contained" color="primary" type="submit">
                            {isUpdating ? "Update Event" : "Add Event"}
                        </Button>
                    </div>
                    {error && <Typography color="error" align="center">{error}</Typography>}
                </form>
            </Paper>
        </Container>
    );
};

export default EventForm;
