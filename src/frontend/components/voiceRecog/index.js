import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Mic, MicOff } from 'lucide-react';
import { openNotepad, closeNotepad } from '../notepad';
import { openPCB, closePCB } from '../pcb';

export const VoiceRecog = () => {
    const [isListening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [serverPort, setServerPort] = useState(null);

    useEffect(() => {
        window.electron?.onVoiceServerPort((port) => {
            console.log('[DEBUG][VoiceRecog] Received voice server port:', port);
            setServerPort(port);
        });
        window.electron?.requestVoiceServerPort(); // Always request the port on mount
    }, []);

    useEffect(() => {
        if (isListening && serverPort) {
            startListening();
        }
    }, [isListening, serverPort]);

    const startListening = async () => {
        console.log('[DEBUG][VoiceRecog] Listening...');
        setLoading(true);
        setError(null);

        try {
            console.log(`[DEBUG][VoiceRecog] Attempting fetch to http://localhost:${serverPort}/desktop`);
            const response = await fetch(`http://localhost:${serverPort}/desktop`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.statusText}`);
            }

            // Set up a reader for the stream
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                
                const text = decoder.decode(value);
                const lines = text.split('\n');
                
                lines.forEach(line => {
                    if (line.trim()) {
                        console.log('Received:', line);
                        processCommand(line.trim());
                    }
                });
            }

        } catch (error) {
            console.error('Error:', error.message);
            setError('An error occurred while processing voice commands.');
        } finally {
            setLoading(false);
        }
    };

    const processCommand = (line) => {
        // Handle transcripts
        if (line.startsWith('TRANSCRIPT:')) {
            const transcriptText = line.substring('TRANSCRIPT:'.length);
            setTranscript(transcriptText);
            return;
        }

        // Handle commands
        if (line.startsWith('COMMAND:')) {
            const command = line.substring('COMMAND:'.length);
            executeCommand(command);
            return;
        }

        // Handle system messages
        if (line.startsWith('SYSTEM:')) {
            const status = line.substring('SYSTEM:'.length);
            console.log('System status:', status);
            if (status === 'STOPPED') {
                setListening(false);
            }
            return;
        }
    };

    const executeCommand = (command) => {
        switch (command) {
            case 'OPEN_NOTEPAD':
                openNotepad();
                break;
            case 'CLOSE_NOTEPAD':
                closeNotepad();
                break;
            case 'OPEN_PCB':
                openPCB();
                break;
            case 'CLOSE_PCB':
                closePCB();
                break;
            case 'SHUTDOWN':
                setListening(false);
                // Add any additional shutdown logic here
                break;
            default:
                console.log('Unknown command:', command);
        }
    };

    const toggleListening = () => {
        setListening((prevState) => !prevState);
    };

    return (
        <div className="flex flex-col items-center gap-5 w-full">
            <div>
                <Button 
                    onClick={toggleListening} 
                    disabled={isLoading || !serverPort} 
                    className={`drop-shadow-md rounded-full border-2 ${isListening ? 'border-red-400' : 'border-zinc-50'} outline-yellow-50 text-neutral-900`} 
                    variant="outline" 
                    size="icon"
                >
                    {isListening ? <MicOff /> : <Mic />}
                </Button>
            </div>
            
            {transcript && (
                <div className="text-sm text-gray-600">
                    Last heard: {transcript}
                </div>
            )}

            {error && (
                <div className="text-sm text-red-500">
                    {error}
                </div>
            )}

            {!serverPort && (
                <div className="text-sm text-yellow-500">
                    Voice server is starting up...
                </div>
            )}
        </div>
    );
};
