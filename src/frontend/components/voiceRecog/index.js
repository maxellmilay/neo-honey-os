import { python } from "pythonia";
const speech_recog = await python("./voice_recog.py");
console.log(await speech_recog.get_random_word());
python.exit();