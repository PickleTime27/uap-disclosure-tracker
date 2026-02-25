// src/lib/claude.ts
// Claude API helper for AI-powered document summarization

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Summarize a declassified government document into plain language
 */
export async function summarizeDocument(
  documentText: string,
  documentTitle: string
): Promise<{ summary: string; keyFindings: string[] }> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are an expert analyst specializing in UAP/UFO government disclosure documents. 

Summarize the following declassified government document in plain, accessible language. The audience is informed citizens tracking UAP disclosure developments.

Document Title: ${documentTitle}

Document Text:
${documentText}

Respond in this exact JSON format only:
{
  "summary": "A 2-3 paragraph plain-language summary of what this document says and why it matters",
  "keyFindings": ["Finding 1", "Finding 2", "Finding 3"]
}`,
      },
    ],
  });

  const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
  const cleaned = responseText.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return {
      summary: responseText,
      keyFindings: [],
    };
  }
}

/**
 * Summarize a congressional hearing based on transcript or description
 */
export async function summarizeHearing(
  hearingTitle: string,
  hearingDescription: string,
  witnessNames: string[]
): Promise<{ summary: string; keyTakeaways: string[] }> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are an expert analyst covering congressional hearings on UAP/UFO disclosure.

Summarize this hearing for an informed audience tracking disclosure developments.

Hearing: ${hearingTitle}
Description: ${hearingDescription}
Witnesses: ${witnessNames.join(', ')}

Respond in this exact JSON format only:
{
  "summary": "A 2-3 paragraph summary of the hearing and its significance",
  "keyTakeaways": ["Takeaway 1", "Takeaway 2", "Takeaway 3"]
}`,
      },
    ],
  });

  const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
  const cleaned = responseText.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return {
      summary: responseText,
      keyTakeaways: [],
    };
  }
}

/**
 * Generate a plain-language explanation of legislation
 */
export async function summarizeLegislation(
  billTitle: string,
  billText: string
): Promise<{ summary: string; uapProvisions: string }> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a legislative analyst specializing in UAP-related provisions in US law.

Explain this legislation in plain language, focusing specifically on what it means for UAP disclosure.

Bill: ${billTitle}
Text: ${billText}

Respond in this exact JSON format only:
{
  "summary": "Plain-language explanation of the bill",
  "uapProvisions": "Specific UAP-related provisions and what they require"
}`,
      },
    ],
  });

  const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
  const cleaned = responseText.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return {
      summary: responseText,
      uapProvisions: '',
    };
  }
}
