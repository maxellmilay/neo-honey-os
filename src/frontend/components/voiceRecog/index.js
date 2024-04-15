import React, { useState } from 'react';
import { Button } from '../ui/button';

export const VoiceRecog = () => {
    const [isListening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const startListening = async () => {
        console.log('got in')
        setLoading(true);
        setError(null);

        try {
            console.log('got in 2')
            setListening(true);
            const response = await fetch('http://localhost:3000/desktop', {
                method: 'POST',
            });

            console.log('got in 3')
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.statusText}`);
            }

            const data = await response.text();
            setTranscript(data);
            console.log('Data received:', data);
        } catch (error) {
            console.error('Error:', error.message);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
            setListening(false);
        }
    };
    
    return (
        <div>
            <div>
                <Button onClick={startListening} variant="destructive" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Start'}
                </Button>
            </div>

            {isListening ? (
                <div>
                    App is listening
                    {console.log('Listening')}
                </div>
            ) : (
                <div>{console.log('StopListening')}</div>
            )}

            {error && <div>Error: {error}</div>}

            <h3>{transcript}</h3>
        </div>
    );
};
