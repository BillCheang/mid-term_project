import xss from 'xss'

import  { GoogleGenerativeAI,HarmBlockThreshold, HarmCategory } from "@google/generative-ai";


const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function AiChat(req,res) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro",safetySettings});
 
  const prompt = (xss(req.body.prompt)).trim()+",the answer must be no longer than 250 words and should not include any unusual symbols.";
  if( prompt.length>500)return res.status(403).json("prompt too long"); 
  try{
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = xss(response.text());
  return res.status(201).json(text);
  } catch (error) {
    return res.status(201).json("response error");
  }
}

