import 'dotenv/config'
import OpenAI from 'openai'

async function fetchDescription(url: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  })

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Make a very short sentence to describe this website and what makes it unique: ${url}. Do not mention its name.`,
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content?.trim() || ''
  }
  catch (error) {
    console.error('❌ Error fetching description for', url, error)

    return ''
  }
}

export default fetchDescription
