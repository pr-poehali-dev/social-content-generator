import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [niche, setNiche] = useState('');
  const [tone, setTone] = useState('');
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const mockContent = `🎯 ${topic || 'Ваша тема'}\n\n${
        tone === 'professional'
          ? 'Профессиональный подход к вашему бизнесу. Мы знаем, как важно качество и надежность в современном мире.'
          : tone === 'friendly'
          ? 'Привет! 👋 Сегодня хотим поделиться с вами чем-то классным! Знаете, что самое важное в нашем деле?'
          : 'Это просто WOW! 🔥 Вы не поверите, что мы для вас приготовили! Готовы к сюрпризу?'
      }\n\n✨ Ключевые моменты:\n• Уникальное предложение\n• Высокое качество\n• Результаты с первого дня\n\n#${niche || 'бизнес'} #контент #соцсети #маркетинг`;
      setGeneratedContent(mockContent);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full">
            <Icon name="Sparkles" className="text-purple-600" size={20} />
            <span className="text-sm font-medium text-purple-600">AI-генератор контента</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-heading font-bold mb-6 gradient-text animate-gradient">
            Создавайте контент<br />за секунды
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Генератор на основе ИИ для создания постов, сторис и хештегов под вашу нишу
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="gradient-purple text-white hover:opacity-90 transition-opacity text-lg px-8 py-6">
              <Icon name="Zap" className="mr-2" size={20} />
              Начать бесплатно
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/60 backdrop-blur-sm">
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
            <Card key={idx} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl gradient-purple flex items-center justify-center mb-4">
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
              Генератор контента
            </h2>
            <p className="text-lg text-gray-600">Заполните поля и получите готовый пост</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-xl bg-white">
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
                  <Label htmlFor="topic" className="text-base font-medium mb-2 block">Тема поста</Label>
                  <Textarea
                    id="topic"
                    placeholder="О чем хотите написать пост?"
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
                      Генерирую...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" className="mr-2" size={20} />
                      Сгенерировать контент
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-white">Результат</CardTitle>
                <CardDescription className="text-purple-100">Ваш сгенерированный пост</CardDescription>
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-h-64">
                      <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">
                        {generatedContent}
                      </pre>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="secondary"
                        className="flex-1 bg-white text-purple-600 hover:bg-gray-100"
                        onClick={() => navigator.clipboard.writeText(generatedContent)}
                      >
                        <Icon name="Copy" className="mr-2" size={18} />
                        Копировать
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex-1 bg-white text-purple-600 hover:bg-gray-100"
                      >
                        <Icon name="Download" className="mr-2" size={18} />
                        Скачать
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 min-h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="FileText" className="mx-auto mb-4 text-white/60" size={48} />
                      <p className="text-white/80">Ваш сгенерированный пост появится здесь</p>
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
