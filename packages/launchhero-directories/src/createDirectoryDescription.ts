import OpenAI from 'openai'
import 'dotenv/config'

import type { DirectoryInput } from './directories-input'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function createDirectoryDescription(directoryInput: DirectoryInput): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-5-nano',
    messages: [
      {
        role: 'user',
        content: `Make a very short sentence to describe this website and what makes it unique: ${directoryInput.url}. Do not mention its name.`,
      },
    ],
  })

  return completion.choices[0].message.content || ''
}

export default createDirectoryDescription
