import speech_recognition as sr

recognizer = sr.Recognizer()

def record_transcript():
    while True:
        try:
            with sr.Microphone() as source:
                recognizer.adjust_for_ambient_noise(source, duration=0.2)
                audio = recognizer.listen(source)
                transcript = recognizer.recognize_google(audio)
                return transcript

        except sr.RequestError as e:
            print("Request Error Occurred: {0}".format(e))
            return

        except sr.UnknownValueError:
            print("Unknown Error Occurred")
            return

if __name__ == "__main__":
    transcript = record_transcript()
    if transcript:
        print(transcript)
