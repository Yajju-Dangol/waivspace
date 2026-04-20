import { GoogleGenerativeAI } from '@google/generative-ai';

const FIRECRAWL_API_KEY = import.meta.env.VITE_FIRECRAWL_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function analyzeUrl(url: string) {
  if (!url) {
    throw new Error('URL is required');
  }

  try {
    console.log(`Scraping URL: ${url}`);
    
    // 1. Scrape with Firecrawl via REST API to avoid Node.js SDK browser issues
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
      },
      body: JSON.stringify({
        url: url,
        formats: ['markdown']
      })
    });

    if (!firecrawlResponse.ok) {
      const errorText = await firecrawlResponse.text();
      throw new Error(`Failed to scrape URL: ${errorText}`);
    }

    const scrapeResult = await firecrawlResponse.json();

    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape URL: ${scrapeResult.error || 'Unknown error'}`);
    }

    const markdown = scrapeResult.data.markdown;
    console.log('Scraping successful. Analyzing with Gemini...');

    // 2. Analyze with Gemini
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const systemPrompt = `You are an expert AI Automation Architect and fractional CFO.
Your goal is to analyze the provided scraped markdown text of a target business website and identify exactly 3 manual operational bottlenecks.
For each bottleneck, you must design an 'AI Workflow Blueprint' to solve it, and estimate the 'Annual Savings' (in USD) using automation.

Return the result as a structured JSON object with an array of exactly 3 objects under the key "solutions".
Each object MUST have the following keys:
- "title": a short name for the proposed automation.
- "problem": a brief description of the current manual bottleneck.
- "blueprint": a clear, step-by-step AI workflow to solve it.
- "savings": string representing estimated annual savings (e.g., "$15,000").
Always return raw JSON. Do not wrap it in markdown code blocks like \`\`\`json.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: systemPrompt
    });

    const prompt = `Here is the scraped website data:\n\n${markdown}\n\nProduce the JSON response in the format: { "solutions": [...] }`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const aiResponse = JSON.parse(result.response.text());

    console.log('Analysis complete.');
    return aiResponse;

  } catch (error: any) {
    console.error('Error during analysis sequence:', error);
    throw new Error(error.message || 'An error occurred during the analysis process.');
  }
}
