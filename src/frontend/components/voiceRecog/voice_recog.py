import speech_recognition as sr
import pyttsx3 

recognizer = sr.Recognizer()


def voice_recog():
    def record_transcript():
        while(1):
            try:
                with sr.Microphone() as source:
                    recognizer.adjust_for_ambient_noise(source, duration=0.2)
                    print("Please say something")
                    audio = recognizer.listen(source)
                    transcript = recognizer.recognize_google(audio)
                    return transcript
            
            except sr.RequestError as e:
                print("Request Error Occured; {0}".format(e))
                return

            except sr.UnknownValueError:
                print("Unknown Error Occured")
                return
            
        return

    def output_transcript(transcript):
        f = open("transcript.txt", "a")
        f.write(transcript)
        f.write("\n")
        f.close()
        return

    while(1):
        transcript = record_transcript()
        output_transcript(transcript)

        print(transcript)