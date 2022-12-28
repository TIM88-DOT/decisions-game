import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req: NextApiRequest, res: NextApiResponse) => {
  const basePrompt = `write me an anime highschool drama story where I am the main character, a young ${req.body.gender} called ${req.body.name}, where I have to to make choices like in a game before continuing the story, example : \n
the story : \n
Option 1: \n  
Option 2: \n `;
  console.log(`API: ${basePrompt}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: basePrompt,
    temperature: 0.5,
    max_tokens: 500,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;