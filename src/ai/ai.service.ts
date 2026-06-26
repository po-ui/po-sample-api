import * as https from 'https';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';

import { AiFilterColumnDto } from './dto/ai-filter-request.dto';
import { AiFilterResponseDto } from './dto/ai-filter-response.dto';

@Injectable()
export class AiService {
  private readonly groqApiKey = process.env.GROQ_API_KEY;
  private readonly geminiApiKey = process.env.GEMINI_API_KEY;
  private readonly provider = this.groqApiKey ? 'groq' : this.geminiApiKey ? 'gemini' : null;

  async filter(query: string, columns: AiFilterColumnDto[]): Promise<AiFilterResponseDto> {
    if (!this.provider) {
      throw new ServiceUnavailableException(
        'Nenhum provedor de IA configurado. Defina GROQ_API_KEY ou GEMINI_API_KEY.'
      );
    }

    const prompt = this.buildPrompt(query, columns);
    const raw = this.provider === 'groq' ? await this.callGroq(prompt) : await this.callGemini(prompt);
    return this.parseResponse(raw);
  }

  private buildPrompt(query: string, columns: AiFilterColumnDto[]): string {
    const columnsDescription = columns
      .map(col => `- ${col.property} (${col.type || 'string'}): ${col.label}`)
      .join('\n');

    return `Você é um assistente especializado em converter consultas em linguagem natural para filtros OData v4.
Sua tarefa é analisar a consulta do usuário e gerar um filtro OData válido baseado nas colunas disponíveis.

Colunas disponíveis na tabela:
${columnsDescription}

Regras para gerar o filtro OData:
1. Use apenas as colunas listadas acima
2. Para strings, use: eq, ne, contains(), startswith(), endswith()
3. Para números, use: eq, ne, gt, ge, lt, le
4. Para datas, use: eq, ne, gt, ge, lt, le (formato: yyyy-MM-dd)
5. Para combinar filtros, use: and, or
6. Strings devem estar entre aspas simples: 'valor'
7. Funções como contains() são case-insensitive por padrão no OData
8. Se o usuário mencionar "maior que", use gt. "menor que" use lt. "igual a" use eq.
9. Se o usuário mencionar "entre X e Y", use: campo ge X and campo le Y
10. Se o usuário mencionar "contém", use: contains(campo, 'valor')

Consulta do usuário: "${query}"

Responda APENAS com um JSON válido no formato abaixo, sem markdown, sem explicações adicionais:
{
  "filter": "filtro OData aqui",
  "description": "descrição curta do que o filtro faz em português",
  "confidence": 0.0 a 1.0
}

Se não conseguir gerar um filtro válido, retorne confidence 0 e filter vazio.`;
  }

  private callGroq(prompt: string): Promise<string> {
    const body = JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: 500,
    });

    return this.httpsPost('api.groq.com', '/openai/v1/chat/completions', body, {
      Authorization: `Bearer ${this.groqApiKey}`,
    }).then(data => {
      const parsed = JSON.parse(data);
      const text = parsed.choices?.[0]?.message?.content;
      if (!text) throw new Error('Resposta do Groq sem conteúdo');
      return text;
    });
  }

  private callGemini(prompt: string): Promise<string> {
    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    });

    return this.httpsPost(
      'generativelanguage.googleapis.com',
      `/v1beta/models/${model}:generateContent?key=${this.geminiApiKey}`,
      body,
      { 'x-goog-api-key': this.geminiApiKey }
    ).then(data => {
      const parsed = JSON.parse(data);
      const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Resposta do Gemini sem conteúdo');
      return text;
    });
  }

  private httpsPost(
    hostname: string,
    path: string,
    body: string,
    extraHeaders: Record<string, string> = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const req = https.request(
        {
          hostname,
          path,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body),
            ...extraHeaders,
          },
        },
        res => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            if (res.statusCode !== 200) {
              reject(new Error(`HTTP ${res.statusCode}: ${data}`));
              return;
            }
            resolve(data);
          });
        }
      );

      req.on('error', reject);
      req.setTimeout(30000, () => {
        req.destroy();
        reject(new Error('Timeout na chamada à API de IA (30s)'));
      });
      req.write(body);
      req.end();
    });
  }

  private parseResponse(raw: string): AiFilterResponseDto {
    let clean = raw.trim();
    if (clean.startsWith('```json')) clean = clean.slice(7);
    if (clean.startsWith('```')) clean = clean.slice(3);
    if (clean.endsWith('```')) clean = clean.slice(0, -3);
    clean = clean.trim();

    const parsed = JSON.parse(clean);
    return {
      filter: parsed.filter || '',
      description: parsed.description || '',
      confidence: parsed.confidence ?? 0,
    };
  }
}
