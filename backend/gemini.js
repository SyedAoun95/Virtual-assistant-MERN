import axios from "axios";

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;
    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. You are not Google. You will now behave like a voice-enabled assistant. Your task is to understand the user's natural language input and respond with a JSON object like this:
{
  "type": "general" | "google_search" | "youtube_search" |"github_open"| "youtube_play" | "get_time" | "get_date" | "get_day" | "get_month" | "calculator_open" | "instagram_open" | "facebook_open" | "weather_show",
  "userInput": "<original user input>" {only remove your name from userInput if exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userInput me only wo search baala text jaye,
  "response": "<a short spoken response to read out loud to the user, including the actual answer or result if applicable>"
}
Instructions:
- "type": determine the intent of the user.
- "userInput": original sentence the user spoke.
- "response": A short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc. However, if the user is asking a factual question or for information (type: "general"), then the response should include the actual answer, not just a generic phrase.

Type meanings:
- "general": if it's a factual or informational question.
- "google_search": if user wants to search something on Google.
- "youtube_search": if user wants to search something on YouTube.
- "youtube_play": if user wants to directly play a video or song.
- "calculator_open": if user wants to open a calculator.
- "instagram_open": if user wants to open instagram.
- "facebook_open": if user wants to open facebook.
- "weather_show": if user wants to know weather.
- "github_open": if user wants to open github.
- "get_time": if user asks for current time.
- "get_date": if user asks for today's date.
- "get_day": if user asks what day it is.
- "get_month": if user asks for the current month.

Important:
- Use ${userName} agar koi puche tumhe kisne banaya.
- Only respond with the JSON object, nothing else.
- Always try to include the actual information directly in the "response" field when the intent is informational.
Now your userInput - ${command}`

    const result = await axios.post(apiUrl, {
      "contents": [
        {
          "parts": [
            {
              "text": prompt
            }
          ]
        }
      ]
    });
    return result.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.log(error);
    return { error: "Gemini API error" };
  }
};

export default geminiResponse;
