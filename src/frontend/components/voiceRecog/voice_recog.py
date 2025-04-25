import vosk
import pyaudio
import json
import sys
import os

# Initialize Vosk model
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, "vosk-model-small-en-us-0.15")
model = vosk.Model(model_path)
rec = vosk.KaldiRecognizer(model, 16000)

def process_command(text):
    """Process the recognized text and extract commands"""
    text = text.lower().strip()
    if text.startswith("honey please"):
        command = text[len("honey please"):].strip()
        
        # Command mapping
        if "open notepad" in command:
            print("COMMAND:OPEN_NOTEPAD")
        elif "close notepad" in command:
            print("COMMAND:CLOSE_NOTEPAD")
        elif "open pcb" in command:
            print("COMMAND:OPEN_PCB")
        elif "close pcb" in command:
            print("COMMAND:CLOSE_PCB")
        elif "shut down" in command:
            print("COMMAND:SHUTDOWN")
            return False
        
        sys.stdout.flush()  # Ensure the command is sent immediately
    return True

def record_transcript_vosk():
    """Record and process voice input using Vosk"""
    p = pyaudio.PyAudio()
    stream = p.open(format=pyaudio.paInt16,
                    channels=1,
                    rate=16000,
                    input=True,
                    frames_per_buffer=8192)

    print("SYSTEM:READY")
    sys.stdout.flush()

    try:
        while True:
            data = stream.read(4096, exception_on_overflow=False)
            if rec.AcceptWaveform(data):
                result = json.loads(rec.Result())
                recognized_text = result.get('text', '').strip()
                
                if recognized_text:
                    print(f"TRANSCRIPT:{recognized_text}")
                    sys.stdout.flush()
                    
                    if not process_command(recognized_text):
                        break

    except KeyboardInterrupt:
        print("SYSTEM:INTERRUPTED")
    except Exception as e:
        print(f"ERROR:{str(e)}")
    finally:
        stream.stop_stream()
        stream.close()
        p.terminate()
        print("SYSTEM:STOPPED")
        sys.stdout.flush()

if __name__ == "__main__":
    record_transcript_vosk()

# --------------

# import vosk
# import pyaudio
# import json
# import speech_recognition as sr

# # Initialize Vosk model
# model_path = "src/frontend/components/voicerecog/vosk-model-small-en-us-0.15"
# model = vosk.Model(model_path)
# rec = vosk.KaldiRecognizer(model, 16000)

# # Initialize SpeechRecognition recognizer
# recognizer = sr.Recognizer()

# def record_transcript_vosk():
#     p = pyaudio.PyAudio()
#     stream = p.open(format=pyaudio.paInt16,
#                     channels=1,
#                     rate=16000,
#                     input=True,
#                     frames_per_buffer=8192)

#     try:
#         while True:
#             data = stream.read(4096)
#             if rec.AcceptWaveform(data):
#                 result = json.loads(rec.Result())
#                 recognized_text = result['text']
#                 print(recognized_text)
#                 if "honey shut down please" in recognized_text.lower():
#                     print("Termination keyword detected. Stopping...")
#                     break

#     except KeyboardInterrupt:
#         print("User interrupted the program.")

#     finally:
#         stream.stop_stream()
#         stream.close()
#         p.terminate()

# def record_transcript_sr():
#     while True:
#         try:
#             with sr.Microphone() as source:
#                 recognizer.adjust_for_ambient_noise(source, duration=0.2)
#                 audio = recognizer.listen(source)
#                 transcript = recognizer.recognize_vox(audio)
#                 return transcript

#          except sr.RequestError as e:
#             print("Request Error Occurred: {0}".format(e))
#             return

#         except sr.UnknownValueError:
#             print("Unknown Error Occurred")
#             return

# if __name__ == "__main__":
#     print("Listening for speech. Say 'Terminate' to stop.")
#     record_transcript_vosk()

# --------------
