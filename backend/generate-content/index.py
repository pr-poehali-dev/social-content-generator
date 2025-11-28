import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Генерирует идеи для видео с помощью OpenAI GPT
    Args: event с httpMethod, body (niche, tone, topic)
    Returns: JSON с заголовком, описанием, хештегами и сценарием
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        from openai import OpenAI
        
        body_data = json.loads(event.get('body', '{}'))
        niche = body_data.get('niche', '')
        tone = body_data.get('tone', 'friendly')
        topic = body_data.get('topic', '')
        
        if not niche or not topic:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Нужно указать нишу и тему'})
            }
        
        api_key = os.environ.get('OPENAI_API_KEY')
        if not api_key:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'API ключ OpenAI не настроен'})
            }
        
        client = OpenAI(api_key=api_key)
        
        tone_descriptions = {
            'professional': 'профессиональный и деловой',
            'friendly': 'дружелюбный и теплый',
            'energetic': 'энергичный и мотивирующий'
        }
        
        tone_desc = tone_descriptions.get(tone, 'дружелюбный')
        
        prompt = f"""Ты — эксперт по созданию контента для социальных сетей и видеоплатформ.

НИША: {niche}
ТЕМА: {topic}
ТОН: {tone_desc}

Создай полноценную идею для видеоролика в формате JSON со следующими полями:

1. title - Цепляющий заголовок (до 60 символов)
2. description - Развернутое описание для видео (150-200 символов)
3. hashtags - Массив из 8-10 популярных хештегов (без #)
4. script - Детальный сценарий, что человек должен делать в кадре (5-7 пунктов)

Требования:
- Заголовок должен быть цепляющим и кликабельным
- Описание должно раскрывать суть и пользу
- Хештеги — актуальные для данной ниши
- Сценарий — конкретные действия человека в кадре с таймингом

Верни ТОЛЬКО валидный JSON без дополнительного текста."""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Ты эксперт по созданию контента для соцсетей. Всегда отвечай только валидным JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.8,
            max_tokens=1000
        )
        
        result_text = response.choices[0].message.content.strip()
        
        if result_text.startswith('```json'):
            result_text = result_text[7:]
        if result_text.startswith('```'):
            result_text = result_text[3:]
        if result_text.endswith('```'):
            result_text = result_text[:-3]
        result_text = result_text.strip()
        
        result = json.loads(result_text)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result, ensure_ascii=False)
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Ошибка парсинга ответа ИИ'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка генерации: {str(e)}'})
        }
