import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface VideoContent {
  title: string;
  description: string;
  hashtags: string[];
  script: string[];
}

const Index = () => {
  const [niche, setNiche] = useState('');
  const [tone, setTone] = useState('');
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState<VideoContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    
    try {
      const response = await fetch('https://functions.poehali.dev/d228547b-829d-44fe-b238-da0c47860641', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ niche, tone, topic }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Ошибка генерации');
        setIsGenerating(false);
        return;
      }
      
      setGeneratedContent(data);
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-card backdrop-blur-sm rounded-full border border-primary/20 animate-pulse-glow">
            <Icon name="Sparkles" className="text-primary" size={20} />
            <span className="text-sm font-medium text-primary">AI-генератор контента</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-heading font-bold mb-6 gradient-text animate-gradient glow-text">
            Идеи для видео<br />за секунды
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            ИИ генератор идей для видео с заголовками, описаниями, хештегами и сценариями
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="gradient-purple text-white hover:opacity-90 transition-all text-lg px-8 py-6 glow animate-float">
              <Icon name="Zap" className="mr-2" size={20} />
              Начать бесплатно
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-card backdrop-blur-sm border-primary/30 hover:border-primary/60">
              <Icon name="PlayCircle" className="mr-2" size={20} />
              Посмотреть примеры
            </Button>
          </div>
        </header>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: 'Brain', title: 'ИИ генерация', desc: 'Умные алгоритмы создают уникальный контент' },
            { icon: 'Palette', title: 'Разные стили', desc: 'От делового до развлекательного тона' },
            { icon: 'Rocket', title: 'За секунды', desc: 'Мгновенная генерация готовых постов' }
          ].map((feature, idx) => (
            <Card key={idx} className="border border-primary/10 shadow-lg bg-card backdrop-blur-sm hover:shadow-xl hover:border-primary/30 transition-all animate-slide-up glow" style={{ animationDelay: `${idx * 0.1}s` }}>
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl gradient-purple flex items-center justify-center mb-4 glow">
                  <Icon name={feature.icon as any} className="text-white" size={28} />
                </div>
                <CardTitle className="font-heading text-2xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="mb-16 animate-fade-in" id="generator">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Генератор идей
            </h2>
            <p className="text-lg text-muted-foreground">Заполните поля и получите готовую идею для видео</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border border-primary/10 shadow-xl bg-card glow">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Параметры генерации</CardTitle>
                <CardDescription>Укажите детали для создания контента</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="niche" className="text-base font-medium mb-2 block">Ниша</Label>
                  <Input
                    id="niche"
                    placeholder="Например: фитнес, кулинария, бизнес"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="text-base h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="tone" className="text-base font-medium mb-2 block">Тон общения</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger id="tone" className="h-12 text-base">
                      <SelectValue placeholder="Выберите тон" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Профессиональный</SelectItem>
                      <SelectItem value="friendly">Дружелюбный</SelectItem>
                      <SelectItem value="energetic">Энергичный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="topic" className="text-base font-medium mb-2 block">Тема видео</Label>
                  <Textarea
                    id="topic"
                    placeholder="О чем хотите снять видео?"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="min-h-32 text-base resize-none"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !niche || !tone || !topic}
                  className="w-full h-12 text-base gradient-purple text-white hover:opacity-90 transition-opacity"
                >
                  {isGenerating ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                      Генерирую идею...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" className="mr-2" size={20} />
                      Сгенерировать идею
                    </>
                  )}
                </Button>
                {error && (
                  <div className="text-red-500 text-sm mt-2 p-3 bg-red-50 rounded-lg">
                    {error}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-white">Результат</CardTitle>
                <CardDescription className="text-purple-100">Ваша идея для видео</CardDescription>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6">
                      <div>
                        <h3 className="text-sm font-semibold text-purple-200 mb-2">ЗАГОЛОВОК</h3>
                        <p className="text-xl font-bold">{generatedContent.title}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-purple-200 mb-2">ОПИСАНИЕ</h3>
                        <p className="text-base leading-relaxed">{generatedContent.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-purple-200 mb-2">ХЕШТЕГИ</h3>
                        <div className="flex flex-wrap gap-2">
                          {generatedContent.hashtags.map((tag, idx) => (
                            <span key={idx} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-purple-200 mb-2">СЦЕНАРИЙ (ЧТО ДЕЛАТЬ В КАДРЕ)</h3>
                        <ol className="space-y-2">
                          {generatedContent.script.map((step, idx) => (
                            <li key={idx} className="flex gap-3">
                              <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                                {idx + 1}
                              </span>
                              <span className="text-sm leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="secondary"
                        className="flex-1 bg-white text-purple-600 hover:bg-gray-100"
                        onClick={() => {
                          const text = `${generatedContent.title}\n\n${generatedContent.description}\n\n${generatedContent.hashtags.map(t => '#' + t).join(' ')}\n\nСценарий:\n${generatedContent.script.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
                          navigator.clipboard.writeText(text);
                        }}
                      >
                        <Icon name="Copy" className="mr-2" size={18} />
                        Копировать
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex-1 bg-white text-purple-600 hover:bg-gray-100"
                        onClick={() => setGeneratedContent(null)}
                      >
                        <Icon name="RotateCcw" className="mr-2" size={18} />
                        Новая идея
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-h-96 flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="Video" className="mx-auto mb-4 text-white/60" size={48} />
                      <p className="text-white/80">Ваша идея для видео появится здесь</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16" id="templates">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Готовые шаблоны
            </h2>
            <p className="text-lg text-gray-600">Выберите шаблон и адаптируйте под себя</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Продающий пост', emoji: '💰', tags: ['Маркетинг', 'Продажи'] },
              { title: 'Вовлекающий опрос', emoji: '❓', tags: ['Вовлечение', 'Интерактив'] },
              { title: 'Обучающий контент', emoji: '📚', tags: ['Образование', 'Экспертность'] },
              { title: 'Личная история', emoji: '✨', tags: ['История', 'Эмоции'] },
              { title: 'Новость компании', emoji: '📢', tags: ['Новости', 'Бизнес'] },
              { title: 'Конкурс/Розыгрыш', emoji: '🎁', tags: ['Конкурс', 'Активность'] }
            ].map((template, idx) => (
              <Card key={idx} className="border-0 shadow-lg bg-white hover:shadow-xl transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{template.emoji}</div>
                  <h3 className="font-heading font-semibold text-xl mb-3 group-hover:text-purple-600 transition-colors">
                    {template.title}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {template.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-purple-100 text-purple-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16" id="pricing">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Тарифы
            </h2>
            <p className="text-lg text-gray-600">Выберите план под ваши задачи</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Старт',
                price: 'Бесплатно',
                features: ['5 генераций в день', 'Базовые шаблоны', 'Стандартные стили'],
                icon: 'Rocket',
                gradient: false
              },
              {
                name: 'Про',
                price: '990₽/мес',
                features: ['Безлимит генераций', 'Все шаблоны', 'Все стили и тоны', 'Приоритетная поддержка'],
                icon: 'Crown',
                gradient: true,
                popular: true
              },
              {
                name: 'Бизнес',
                price: '2990₽/мес',
                features: ['Всё из Про', 'API доступ', 'Кастомные шаблоны', 'Командная работа', 'Персональный менеджер'],
                icon: 'Building',
                gradient: false
              }
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`border-0 shadow-xl relative ${
                  plan.gradient
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white scale-105'
                    : 'bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-orange-500 text-white px-4 py-1 text-sm">
                      Популярный
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${plan.gradient ? 'bg-white/20' : 'gradient-purple'} flex items-center justify-center mb-4`}>
                    <Icon name={plan.icon as any} className={plan.gradient ? 'text-white' : 'text-white'} size={24} />
                  </div>
                  <CardTitle className={`font-heading text-2xl ${plan.gradient ? 'text-white' : ''}`}>
                    {plan.name}
                  </CardTitle>
                  <div className={`text-4xl font-bold font-heading mt-4 ${plan.gradient ? 'text-white' : ''}`}>
                    {plan.price}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="Check" className={plan.gradient ? 'text-white' : 'text-purple-600'} size={20} />
                        <span className={`text-sm ${plan.gradient ? 'text-white' : 'text-gray-600'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full h-11 ${
                      plan.gradient
                        ? 'bg-white text-purple-600 hover:bg-gray-100'
                        : 'gradient-purple text-white hover:opacity-90'
                    }`}
                  >
                    {plan.price === 'Бесплатно' ? 'Начать' : 'Выбрать план'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <footer className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600">© 2024 AI Content Generator. Создано с любовью к контенту 💜</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;