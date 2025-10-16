import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Character = 'silent' | 'narrator' | 'shadowmilk' | 'whitelily';

interface DialogLine {
  id: number;
  character: Character;
  name: string;
  text: string;
  image?: string;
}

interface Choice {
  text: string;
  nextScene: number;
}

interface Scene {
  id: number;
  background: string;
  backgroundImage?: string;
  dialogs: DialogLine[];
  choices?: Choice[];
  isEnding?: boolean;
}

const SILENT_SALT_SERIOUS_IMG = 'https://cdn.poehali.dev/files/e55512d6-4a21-4202-b5f6-ec147cadfd3f.png';
const SILENT_SALT_SWORD_IMG = 'https://cdn.poehali.dev/files/b85e152c-da9d-4179-b4cf-fd6b9444d504.png';
const SILENT_SALT_ANGRY_IMG = 'https://cdn.poehali.dev/files/cc7ea812-3f26-4c61-b27b-94d8043ab51d.png';
const SILENT_SALT_TIRED_IMG = 'https://cdn.poehali.dev/files/9c588649-4545-41e2-9bc2-a6ecf6026f76.png';
const SALT_OF_SOLIDARITY_IMG = 'https://cdn.poehali.dev/files/12d2747b-67b2-4e2d-8147-88971e1cbeaa.png';
const SHADOW_MILK_IMG = 'https://cdn.poehali.dev/files/1d62844f-3be9-459e-ae54-73b720c5b3cc.png';
const SHADOW_MILK_SHOCKED_IMG = 'https://cdn.poehali.dev/files/a35670fa-9fbe-421f-9707-7f07730769dc.png';
const WHITE_LILY_IMG = 'https://cdn.poehali.dev/files/f1c38424-3b81-4dd8-a740-8e43ce5464d0.png';
const THRONE_HALL_BG = 'https://cdn.poehali.dev/files/b25e6897-fa6c-459a-bd82-d0e84f833b80.jpg';
const FOREST_BG = 'https://cdn.poehali.dev/files/ca44aec4-70bf-48b1-9de1-b417d75b5eba.jpg';

const STORY_SCENES: Scene[] = [
  {
    id: 0,
    background: 'from-slate-900 via-gray-900 to-black',
    dialogs: [
      { id: 1, character: 'narrator', name: '???', text: 'Beast-Yeast. Место, где время остановилось тысячу лет назад...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 2, character: 'narrator', name: '???', text: 'Тишина. Вечная, непробиваемая тишина окутывает древние катакомбы.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 3, character: 'narrator', name: '???', text: 'В глубинах этой тьмы начинает пробуждаться нечто древнее...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 4, character: 'silent', name: 'Silent Salt Cookie', text: '...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 5, character: 'silent', name: 'Silent Salt Cookie', text: '... (где... я?)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 6, character: 'silent', name: 'Silent Salt Cookie', text: '... (сколько времени прошло?)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 7, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОЙ-ОЙ-ОЙ! СМОТРИТЕ КТО ПРОСНУЛСЯ!', image: SHADOW_MILK_IMG },
      { id: 8, character: 'shadowmilk', name: 'Shadow Milk', text: 'МОЛЧУН ВЕРНУЛСЯ! НАКОНЕЦ-ТО! Я ЖДАЛ ЭТОГО ТЫСЯЧУ ЛЕТ!', image: SHADOW_MILK_IMG },
      { id: 9, character: 'silent', name: 'Silent Salt Cookie', text: '... (Shadow Milk... этот голос...)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 10, character: 'shadowmilk', name: 'Shadow Milk', text: 'Знаешь, я тут СТОЛЬКО историй придумал пока ты спал! Хочешь послушать?!', image: SHADOW_MILK_IMG },

      { id: 12, character: 'silent', name: 'Silent Salt Cookie', text: '... (что вообще происходит?)', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (ударить Shadow Milk - он слишком громкий)', nextScene: 1 },
      { text: '... (промолчать и просто слушать)', nextScene: 2 },
      { text: '... (попытаться вспомнить прошлое)', nextScene: 8 },
    ],
  },
  {
    id: 1,
    background: 'from-red-900 via-purple-900 to-black',
    dialogs: [
      { id: 13, character: 'narrator', name: 'Narrator', text: '*УДАР*', image: SILENT_SALT_SWORD_IMG },
      { id: 14, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОЙ! ОН УДАРИЛ МЕНЯ!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 15, character: 'shadowmilk', name: 'Shadow Milk', text: 'ВПЕРВЫЕ ЗА ТЫСЯЧУ ЛЕТ КТО-ТО МЕНЯ УДАРИЛ!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 16, character: 'shadowmilk', name: 'Shadow Milk', text: 'Знаешь что? Это было... неожиданно! Я ЛЮБЛЮ НЕОЖИДАННОСТИ!', image: SHADOW_MILK_IMG },
      { id: 17, character: 'shadowmilk', name: 'Shadow Milk', text: 'Ты действительно вернулся чтобы избить меня? КАКОЙ ПОВОРОТ!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 18, character: 'silent', name: 'Silent Salt Cookie', text: '...', image: SILENT_SALT_ANGRY_IMG },
      { id: 19, character: 'silent', name: 'Silent Salt Cookie', text: '... (он слишком громкий... всегда был громким...)', image: SILENT_SALT_ANGRY_IMG },
      { id: 20, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОЙ! Ты выглядишь таким СЕРЬЁЗНЫМ! Расслабься, старина!', image: SHADOW_MILK_IMG },
      { id: 21, character: 'silent', name: 'Silent Salt Cookie', text: '... (говорить... всегда только говорить...)', image: SILENT_SALT_ANGRY_IMG },
      { id: 22, character: 'shadowmilk', name: 'Shadow Milk', text: 'ХАХАХА! Ну давай, Тихоня! Покажи нам всю свою ярость!', image: SHADOW_MILK_IMG },
    ],
    choices: [
      { text: '... (продолжать атаковать - пусть узнают силу молчания)', nextScene: 3 },
      { text: '... (остановиться и успокоиться)', nextScene: 4 },
      { text: '... (просто уйти - устал от этого цирка)', nextScene: 5 },
    ],
  },
  {
    id: 2,
    background: 'from-gray-800 via-gray-900 to-black',
    dialogs: [
      { id: 25, character: 'silent', name: 'Silent Salt Cookie', text: '... (спокойно... просто слушай...)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 26, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОХО! Он молчит! Как всегда! Знаешь, это меня вдохновляет!', image: SHADOW_MILK_IMG },
      { id: 27, character: 'shadowmilk', name: 'Shadow Milk', text: 'Сейчас расскажу тебе историю о том, как я провёл последнюю тысячу лет!', image: SHADOW_MILK_IMG },
      { id: 28, character: 'shadowmilk', name: 'Shadow Milk', text: 'Так вот, первые 100 лет я считал трещины в стенах! Их было 47,892!', image: SHADOW_MILK_IMG },
      { id: 29, character: 'shadowmilk', name: 'Shadow Milk', text: 'А потом я начал придумывать имена каждой трещине! Хочешь услышать?!', image: SHADOW_MILK_IMG },
      { id: 30, character: 'silent', name: 'Silent Salt Cookie', text: '...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 31, character: 'narrator', name: 'Narrator', text: '*6 часов спустя*', image: SHADOW_MILK_IMG },
      { id: 32, character: 'shadowmilk', name: 'Shadow Milk', text: '...и тогда я понял, что одиночество - это просто иллюзия созданная обществом!', image: SHADOW_MILK_IMG },
      { id: 33, character: 'silent', name: 'Silent Salt Cookie', text: '... (убей... меня... пожалуйста...)', image: SILENT_SALT_TIRED_IMG },
      { id: 34, character: 'shadowmilk', name: 'Shadow Milk', text: 'А ЕЩЁ! У меня есть теория о природе времени! Хочешь послушать?!', image: SHADOW_MILK_IMG },
      { id: 35, character: 'silent', name: 'Silent Salt Cookie', text: '... (это... пытка хуже чем тысяча лет запечатывания...)', image: SILENT_SALT_TIRED_IMG },
      { id: 36, character: 'narrator', name: 'Narrator', text: '*12 часов спустя*', image: SHADOW_MILK_IMG },
      { id: 37, character: 'silent', name: 'Silent Salt Cookie', text: '...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 38, character: 'narrator', name: 'Narrator', text: 'Silent Salt Cookie не выдержал бесконечного потока слов.', image: SILENT_SALT_ANGRY_IMG },
      { id: 39, character: 'narrator', name: 'Narrator', text: 'Его разум растворился в океане болтовни Shadow Milk.', image: SILENT_SALT_ANGRY_IMG },
      { id: 40, character: 'narrator', name: 'Narrator', text: 'Некоторые говорят, что он до сих пор слушает эти истории в вечности...', image: SHADOW_MILK_IMG },
      { id: 41, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА: "Молчание - золото, слова - пытка" *:･ﾟ✧*:･ﾟ✧', image: SHADOW_MILK_IMG },
    ],
    isEnding: true,
  },
  {
    id: 3,
    background: 'from-red-600 via-orange-600 to-black',
    dialogs: [
      { id: 12, character: 'silent', name: 'Silent Salt Cookie', text: '... *достаёт меч*', image: SILENT_SALT_SWORD_IMG },
      { id: 13, character: 'shadowmilk', name: 'Shadow Milk', text: 'СТОП СТОП СТОП! Я ЖЕ ШУЧУ!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 14, character: 'narrator', name: 'Narrator', text: '*эпичная драка длится секунды*', image: SILENT_SALT_SWORD_IMG },
      { id: 15, character: 'shadowmilk', name: 'Shadow Milk', text: '...Ой. Я проиграл. КАК ДРАМАТИЧНО!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 16, character: 'narrator', name: 'Narrator', text: 'Silent Salt одним ударом побеждает Shadow Milk.', image: SILENT_SALT_SWORD_IMG },
      { id: 17, character: 'narrator', name: 'Narrator', text: 'КОНЦОВКА: "Молчаливый Разрушитель"', image: SILENT_SALT_SERIOUS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 4,
    background: 'from-blue-900 via-cyan-900 to-black',
    dialogs: [
      { id: 18, character: 'silent', name: 'Silent Salt Cookie', text: '... (хватит драться)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 19, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОХ! Ты остановился! Может ты не такой злой?', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 20, character: 'shadowmilk', name: 'Shadow Milk', text: 'Знаешь... я рад что ты проснулся. Было одиноко тут.', image: SHADOW_MILK_IMG },
      { id: 21, character: 'narrator', name: 'Narrator', text: 'Silent Salt и Shadow Milk нашли понимание в молчании и словах.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 22, character: 'narrator', name: 'Narrator', text: 'КОНЦОВКА: "Противоположности"', image: SHADOW_MILK_IMG },
    ],
    isEnding: true,
  },
  {
    id: 5,
    background: 'from-slate-700 via-gray-800 to-black',
    dialogs: [
      { id: 23, character: 'silent', name: 'Silent Salt Cookie', text: '... *уходит*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 24, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОН ПРОСТО УШЁЛ! БРОСИЛ МЕНЯ! КАК ОБИДНО!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 25, character: 'shadowmilk', name: 'Shadow Milk', text: 'Хотя... наверное ему нужно побыть одному. Я понимаю...', image: SHADOW_MILK_IMG },
    ],
    choices: [
      { text: '... (идти в лес)', nextScene: 6 },
      { text: '... (вернуться в катакомбы молчания)', nextScene: 7 },
    ],
  },
  {
    id: 6,
    background: 'from-green-800 via-emerald-900 to-black',
    backgroundImage: FOREST_BG,
    dialogs: [
      { id: 60, character: 'narrator', name: 'Narrator', text: 'Silent Salt медленно идёт прочь от шума и хаоса...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 61, character: 'silent', name: 'Silent Salt Cookie', text: '... (наконец-то... тишина)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 62, character: 'narrator', name: 'Narrator', text: 'Он входит в древний мистический лес. Бирюзовое свечение окутывает деревья.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 63, character: 'silent', name: 'Silent Salt Cookie', text: '... (здесь так спокойно... как давно я не чувствовал покоя)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 64, character: 'narrator', name: 'Narrator', text: 'Он любуется древними деревьями, слушает шёпот листвы, вдыхает аромат мха...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 65, character: 'silent', name: 'Silent Salt Cookie', text: '... (время здесь течёт по-другому... медленнее... мягче...)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 66, character: 'narrator', name: 'Narrator', text: 'Вдруг, среди деревьев появляется силуэт...', image: WHITE_LILY_IMG },
      { id: 67, character: 'whitelily', name: 'White Lily Cookie', text: 'О... здравствуйте...', image: WHITE_LILY_IMG },
      { id: 68, character: 'whitelily', name: 'White Lily Cookie', text: 'Прошу прощения, я не ожидала встретить кого-то здесь.', image: WHITE_LILY_IMG },
      { id: 69, character: 'silent', name: 'Silent Salt Cookie', text: '... *медленно кивает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 70, character: 'whitelily', name: 'White Lily Cookie', text: 'Вы тоже любите этот лес? Эту тишину и покой?', image: WHITE_LILY_IMG },
      { id: 71, character: 'silent', name: 'Silent Salt Cookie', text: '... *снова кивает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 72, character: 'whitelily', name: 'White Lily Cookie', text: 'Знаете... редко встретишь кого-то, кто понимает ценность молчания.', image: WHITE_LILY_IMG },
      { id: 73, character: 'whitelily', name: 'White Lily Cookie', text: 'В мире, где все постоянно говорят, кричат, спорят...', image: WHITE_LILY_IMG },
      { id: 74, character: 'whitelily', name: 'White Lily Cookie', text: '...такое облегчение просто сидеть в тишине с кем-то, кто её понимает.', image: WHITE_LILY_IMG },
      { id: 75, character: 'silent', name: 'Silent Salt Cookie', text: '...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 76, character: 'narrator', name: 'Narrator', text: 'Они сидят рядом, наблюдая за танцем светлячков в бирюзовом сиянии.', image: WHITE_LILY_IMG },
      { id: 77, character: 'whitelily', name: 'White Lily Cookie', text: 'Вы знаете... я всегда думала, что одиночество - это бремя.', image: WHITE_LILY_IMG },
      { id: 78, character: 'whitelily', name: 'White Lily Cookie', text: 'Но сейчас я понимаю... иногда молчание вдвоём лучше тысячи слов.', image: WHITE_LILY_IMG },
      { id: 79, character: 'silent', name: 'Silent Salt Cookie', text: '... (она... понимает)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 80, character: 'whitelily', name: 'White Lily Cookie', text: 'Хотите остаться здесь? Мы могли бы... просто быть рядом.', image: WHITE_LILY_IMG },
      { id: 81, character: 'silent', name: 'Silent Salt Cookie', text: '... *медленная улыбка*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 82, character: 'narrator', name: 'Narrator', text: 'И впервые за тысячу лет Silent Salt почувствовал...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 83, character: 'narrator', name: 'Narrator', text: '...что его молчание - это не проклятие.', image: WHITE_LILY_IMG },
      { id: 84, character: 'narrator', name: 'Narrator', text: 'Это дар, который кто-то наконец смог оценить.', image: WHITE_LILY_IMG },
      { id: 85, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА: "Тихая Гармония" *:･ﾟ✧*:･ﾟ✧', image: WHITE_LILY_IMG },
    ],
    isEnding: true,
  },
  {
    id: 7,
    background: 'from-slate-700 via-gray-800 to-black',
    dialogs: [
      { id: 39, character: 'narrator', name: 'Narrator', text: 'Silent Salt Cookie вернулся спать на 1000 лет.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 40, character: 'narrator', name: 'Narrator', text: 'Иногда сон - лучший побег от реальности.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 41, character: 'narrator', name: 'Narrator', text: 'КОНЦОВКА: "Вечный Сон"', image: SILENT_SALT_SERIOUS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 8,
    background: 'from-indigo-900 via-purple-900 to-black',
    dialogs: [
      { id: 90, character: 'silent', name: 'Silent Salt Cookie', text: '... (мои воспоминания... они такие размытые...)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 91, character: 'narrator', name: 'Narrator', text: 'Silent Salt закрывает глаза, пытаясь вспомнить...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 92, character: 'narrator', name: 'Narrator', text: '*ВОСПОМИНАНИЕ: Тысяча лет назад*', image: SALT_OF_SOLIDARITY_IMG },
      { id: 93, character: 'silent', name: 'Salt of Solidarity', text: '... (я был хранителем... защитником...)', image: SALT_OF_SOLIDARITY_IMG },
      { id: 94, character: 'narrator', name: 'Narrator', text: 'Образы великих битв. Молчаливый воин, защищающий невинных.', image: SALT_OF_SOLIDARITY_IMG },
      { id: 95, character: 'silent', name: 'Silent Salt (прошлое)', text: '... (но я был предан... запечатан... забыт...)', image: SILENT_SALT_ANGRY_IMG },
      { id: 96, character: 'narrator', name: 'Narrator', text: 'Боль. Предательство. Тьма, поглощающая всё...', image: SILENT_SALT_ANGRY_IMG },
      { id: 97, character: 'narrator', name: 'Narrator', text: '*ВОЗВРАЩЕНИЕ В НАСТОЯЩЕЕ*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 98, character: 'silent', name: 'Silent Salt Cookie', text: '... (я помню теперь... всё)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 99, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОЙ! Ты выглядишь так, будто увидел призрака! Что случилось?', image: SHADOW_MILK_IMG },
      { id: 100, character: 'silent', name: 'Silent Salt Cookie', text: '... (я не могу оставаться здесь... не после того что я вспомнил)', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (уйти в лес, чтобы обдумать прошлое)', nextScene: 6 },
      { text: '... (вернуться к Shadow Milk и обсудить прошлое)', nextScene: 9 },
    ],
  },
  {
    id: 9,
    background: 'from-purple-900 via-red-900 to-black',
    dialogs: [
      { id: 101, character: 'silent', name: 'Silent Salt Cookie', text: '... *возвращается к Shadow Milk*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 102, character: 'shadowmilk', name: 'Shadow Milk', text: 'О! Ты вернулся! Что-то не так?', image: SHADOW_MILK_IMG },
      { id: 103, character: 'silent', name: 'Silent Salt Cookie', text: '... (я вспомнил... всё... предательство...)', image: SILENT_SALT_ANGRY_IMG },
      { id: 104, character: 'shadowmilk', name: 'Shadow Milk', text: 'Ах... твоё запечатывание. Да, это была... тёмная история.', image: SHADOW_MILK_IMG },
      { id: 105, character: 'shadowmilk', name: 'Shadow Milk', text: 'Знаешь, я тоже был предан когда-то. Все мы здесь такие.', image: SHADOW_MILK_IMG },
      { id: 106, character: 'silent', name: 'Silent Salt Cookie', text: '... (ты... понимаешь?)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 107, character: 'shadowmilk', name: 'Shadow Milk', text: 'Конечно! Боль от предательства не уходит просто так.', image: SHADOW_MILK_IMG },
      { id: 108, character: 'shadowmilk', name: 'Shadow Milk', text: 'Но знаешь что? Можно жить дальше. Или... можно мстить.', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 109, character: 'shadowmilk', name: 'Shadow Milk', text: 'Выбор за тобой, дружище!', image: SHADOW_MILK_IMG },
      { id: 110, character: 'silent', name: 'Silent Salt Cookie', text: '... (он... на самом деле слушает меня)', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (выбрать путь мести)', nextScene: 3 },
      { text: '... (выбрать путь прощения)', nextScene: 10 },
    ],
  },
  {
    id: 10,
    background: 'from-blue-700 via-cyan-800 to-black',
    dialogs: [
      { id: 111, character: 'silent', name: 'Silent Salt Cookie', text: '... (я выбираю... прощение)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 112, character: 'shadowmilk', name: 'Shadow Milk', text: 'Серьёзно? ПРОЩЕНИЕ? Вау! Не ожидал!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 113, character: 'silent', name: 'Silent Salt Cookie', text: '... (месть не вернёт потерянное время)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 114, character: 'shadowmilk', name: 'Shadow Milk', text: 'Знаешь... это мудро. Прощение - это сложнее чем месть.', image: SHADOW_MILK_IMG },
      { id: 115, character: 'shadowmilk', name: 'Shadow Milk', text: 'Я... я горжусь тобой, молчун!', image: SHADOW_MILK_IMG },
      { id: 116, character: 'silent', name: 'Silent Salt Cookie', text: '... *слабая улыбка*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 117, character: 'silent', name: 'Silent Salt Cookie', text: '... (может... я могу начать заново)', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (остаться с Shadow Milk и стать друзьями)', nextScene: 11 },
      { text: '... (отправиться искать других зверей)', nextScene: 12 },
      { text: '... (покинуть катакомбы навсегда)', nextScene: 13 },
    ],
  },
  {
    id: 11,
    background: 'from-purple-700 via-indigo-800 to-black',
    dialogs: [
      { id: 118, character: 'shadowmilk', name: 'Shadow Milk', text: 'ТЫ ОСТАЁШЬСЯ?! ЭТО ЛУЧШИЙ ДЕНЬ ЗА ТЫСЯЧУ ЛЕТ!', image: SHADOW_MILK_IMG },
      { id: 119, character: 'silent', name: 'Silent Salt Cookie', text: '... (возможно, одиночество было не лучшим решением)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 120, character: 'shadowmilk', name: 'Shadow Milk', text: 'Знаешь... у меня есть СТОЛЬКО планов для нас двоих!', image: SHADOW_MILK_IMG },
      { id: 121, character: 'shadowmilk', name: 'Shadow Milk', text: 'Мы можем создать ТЕАТРАЛЬНУЮ ТРУППУ! Ты будешь молчаливым героем!', image: SHADOW_MILK_IMG },
      { id: 122, character: 'silent', name: 'Silent Salt Cookie', text: '... (во что я ввязался...)', image: SILENT_SALT_TIRED_IMG },
      { id: 123, character: 'shadowmilk', name: 'Shadow Milk', text: 'Или ЦИРК! Я буду жонглёром иллюзий, а ты - таинственным фокусником!', image: SHADOW_MILK_IMG },
      { id: 124, character: 'silent', name: 'Silent Salt Cookie', text: '... *вздыхает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 125, character: 'narrator', name: 'Narrator', text: 'И так началась странная, но искренняя дружба...', image: SHADOW_MILK_IMG },
      { id: 126, character: 'narrator', name: 'Narrator', text: 'Между самым громким и самым тихим существом в Beast-Yeast.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 127, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА: "Странная Дружба" *:･ﾟ✧*:･ﾟ✧', image: SHADOW_MILK_IMG },
    ],
    isEnding: true,
  },
  {
    id: 12,
    background: 'from-orange-900 via-red-900 to-black',
    dialogs: [
      { id: 128, character: 'silent', name: 'Silent Salt Cookie', text: '... (другие звери... они тоже могут быть здесь)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 129, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОХО! Ты хочешь найти ОСТАЛЬНЫХ?! Это ПРИКЛЮЧЕНИЕ!', image: SHADOW_MILK_IMG },
      { id: 130, character: 'shadowmilk', name: 'Shadow Milk', text: 'Я знаю где они! Eternal Sugar, Burning Spice, Mystic Flour!', image: SHADOW_MILK_IMG },
      { id: 131, character: 'silent', name: 'Silent Salt Cookie', text: '... (давно не видел их...)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 132, character: 'narrator', name: 'Narrator', text: 'Они начинают долгое путешествие по Beast-Yeast...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 133, character: 'shadowmilk', name: 'Shadow Milk', text: 'Первая - Eternal Sugar! Она спит в облачной цитадели!', image: SHADOW_MILK_IMG },
      { id: 134, character: 'silent', name: 'Silent Salt Cookie', text: '... (она всегда любила поспать...)', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (идти к Eternal Sugar)', nextScene: 14 },
      { text: '... (идти к Burning Spice)', nextScene: 15 },
      { text: '... (передумать и вернуться)', nextScene: 11 },
    ],
  },
  {
    id: 13,
    background: 'from-sky-800 via-blue-900 to-black',
    dialogs: [
      { id: 135, character: 'silent', name: 'Silent Salt Cookie', text: '... (я должен покинуть это место навсегда)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 136, character: 'shadowmilk', name: 'Shadow Milk', text: 'Ты... уходишь? Навсегда?', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 137, character: 'silent', name: 'Silent Salt Cookie', text: '... *кивает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 138, character: 'shadowmilk', name: 'Shadow Milk', text: '...Я понимаю. Иногда нужно идти вперёд, а не застревать в прошлом.', image: SHADOW_MILK_IMG },
      { id: 139, character: 'shadowmilk', name: 'Shadow Milk', text: 'Прощай, молчун. Было весело... даже если ты меня бил!', image: SHADOW_MILK_IMG },
      { id: 140, character: 'silent', name: 'Silent Salt Cookie', text: '... *последний кивок*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 141, character: 'narrator', name: 'Narrator', text: 'Silent Salt выходит из катакомб в неизвестный мир...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 142, character: 'narrator', name: 'Narrator', text: 'Его путь только начинается. Будущее туманно, но он готов к нему.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 143, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА: "Новый Рассвет" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_SERIOUS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 14,
    background: 'from-pink-300 via-purple-400 to-blue-300',
    dialogs: [
      { id: 144, character: 'narrator', name: 'Narrator', text: 'Они приходят в облачную цитадель Eternal Sugar...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 145, character: 'shadowmilk', name: 'Shadow Milk', text: 'ВОТ МЫ И ЗДЕСЬ! Облака, сладость, и... храп?', image: SHADOW_MILK_IMG },
      { id: 146, character: 'silent', name: 'Silent Salt Cookie', text: '... (она всё ещё спит)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 147, character: 'shadowmilk', name: 'Shadow Milk', text: 'Конечно спит! Eternal Sugar ВСЕГДА спит!', image: SHADOW_MILK_IMG },
      { id: 148, character: 'shadowmilk', name: 'Shadow Milk', text: 'Помню, однажды она проспала целую войну! ХАХАХА!', image: SHADOW_MILK_IMG },
      { id: 149, character: 'silent', name: 'Silent Salt Cookie', text: '... (разбудить её?)', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (попробовать разбудить её)', nextScene: 16 },
      { text: '... (оставить спать и уйти к Burning Spice)', nextScene: 15 },
      { text: '... (остаться здесь и поспать рядом)', nextScene: 17 },
    ],
  },
  {
    id: 15,
    background: 'from-orange-600 via-red-700 to-yellow-600',
    dialogs: [
      { id: 150, character: 'narrator', name: 'Narrator', text: 'Они направляются к вулканическому логову Burning Spice...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 151, character: 'shadowmilk', name: 'Shadow Milk', text: 'Осторожнее! Burning Spice немного... вспыльчив!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 152, character: 'silent', name: 'Silent Salt Cookie', text: '... (я помню)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 153, character: 'narrator', name: 'Narrator', text: '*ВНЕЗАПНО ВЗРЫВ ЛАВЫ*', image: SILENT_SALT_SWORD_IMG },
      { id: 154, character: 'narrator', name: 'Narrator', text: 'Из огня появляется массивная фигура...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 155, character: 'shadowmilk', name: 'Shadow Milk', text: 'Э-э-э... привет, Burning Spice! Давно не виделись!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 156, character: 'silent', name: 'Silent Salt Cookie', text: '...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 157, character: 'narrator', name: 'Narrator', text: 'Burning Spice смотрит на них с яростью в глазах...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 158, character: 'shadowmilk', name: 'Shadow Milk', text: 'Ну что... БЕЖИМ?!', image: SHADOW_MILK_SHOCKED_IMG },
    ],
    choices: [
      { text: '... (сражаться с Burning Spice)', nextScene: 18 },
      { text: '... (бежать обратно)', nextScene: 11 },
      { text: '... (попытаться поговорить)', nextScene: 19 },
    ],
  },
  {
    id: 16,
    background: 'from-pink-300 via-purple-400 to-blue-300',
    dialogs: [
      { id: 159, character: 'shadowmilk', name: 'Shadow Milk', text: 'Эй, Eternal Sugar! ПРОСЫПАЙСЯ!', image: SHADOW_MILK_IMG },
      { id: 160, character: 'narrator', name: 'Narrator', text: '*храп продолжается*', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 161, character: 'silent', name: 'Silent Salt Cookie', text: '... *тихо толкает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 162, character: 'narrator', name: 'Narrator', text: '*всё ещё храп*', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 163, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОНА НЕ ПРОСЫПАЕТСЯ! Может крикнуть громче?', image: SHADOW_MILK_IMG },
      { id: 164, character: 'silent', name: 'Silent Salt Cookie', text: '... (бесполезно)', image: SILENT_SALT_TIRED_IMG },
      { id: 165, character: 'narrator', name: 'Narrator', text: 'Eternal Sugar продолжает спать вечным сном...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 166, character: 'narrator', name: 'Narrator', text: 'Некоторые вещи никогда не меняются.', image: SHADOW_MILK_IMG },
      { id: 167, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА: "Вечный Храп" *:･ﾟ✧*:･ﾟ✧', image: SHADOW_MILK_SHOCKED_IMG },
    ],
    isEnding: true,
  },
  {
    id: 17,
    background: 'from-pink-200 via-purple-300 to-blue-200',
    dialogs: [
      { id: 168, character: 'silent', name: 'Silent Salt Cookie', text: '... (это место такое спокойное...)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 169, character: 'shadowmilk', name: 'Shadow Milk', text: 'Ты хочешь... ПОСПАТЬ? Серьёзно?', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 170, character: 'silent', name: 'Silent Salt Cookie', text: '... *ложится рядом с Eternal Sugar*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 171, character: 'shadowmilk', name: 'Shadow Milk', text: 'Ладно... может и я немного посплю...', image: SHADOW_MILK_IMG },
      { id: 172, character: 'narrator', name: 'Narrator', text: 'Все трое засыпают в облачной цитадели...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 173, character: 'narrator', name: 'Narrator', text: 'Проблемы могут подождать. Иногда лучший ответ - просто отдохнуть.', image: SHADOW_MILK_IMG },
      { id: 174, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА: "Облачный Отдых" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_SERIOUS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 18,
    background: 'from-red-700 via-orange-700 to-yellow-600',
    dialogs: [
      { id: 175, character: 'silent', name: 'Silent Salt Cookie', text: '... *достаёт меч*', image: SILENT_SALT_SWORD_IMG },
      { id: 176, character: 'shadowmilk', name: 'Shadow Milk', text: 'О НЕТ! ОН СОБИРАЕТСЯ ДРАТЬСЯ!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 177, character: 'narrator', name: 'Narrator', text: '*ЭПИЧЕСКАЯ БИТВА НАЧИНАЕТСЯ*', image: SILENT_SALT_SWORD_IMG },
      { id: 178, character: 'narrator', name: 'Narrator', text: 'Огонь против льда. Ярость против спокойствия.', image: SILENT_SALT_SWORD_IMG },
      { id: 179, character: 'narrator', name: 'Narrator', text: 'Но Silent Salt слишком силён...', image: SILENT_SALT_SWORD_IMG },
      { id: 180, character: 'narrator', name: 'Narrator', text: 'Одним ударом он побеждает Burning Spice.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 181, character: 'shadowmilk', name: 'Shadow Milk', text: 'ВАУУУУ! ТЫ ЕГО ПОБЕДИЛ! ТЫ ЛЕГЕНДА!', image: SHADOW_MILK_IMG },
      { id: 182, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА: "Воин Молчания" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_SWORD_IMG },
    ],
    isEnding: true,
  },
  {
    id: 19,
    background: 'from-orange-700 via-red-800 to-black',
    dialogs: [
      { id: 183, character: 'silent', name: 'Silent Salt Cookie', text: '... *поднимает руку в знак мира*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 184, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОН ХОЧЕТ ПОГОВОРИТЬ! Burning Spice, пожалуйста, не убивай нас!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 185, character: 'narrator', name: 'Narrator', text: 'Burning Spice останавливается... смотрит на Silent Salt...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 186, character: 'narrator', name: 'Narrator', text: 'Что-то в его молчаливом взгляде успокаивает ярость...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 187, character: 'shadowmilk', name: 'Shadow Milk', text: 'Вау... он... успокоился? Как ты это сделал?!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 188, character: 'silent', name: 'Silent Salt Cookie', text: '... (иногда молчание громче криков)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 189, character: 'narrator', name: 'Narrator', text: 'Silent Salt учит Burning Spice находить покой в тишине.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 190, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА: "Сила Тишины" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_SERIOUS_IMG },
    ],
    isEnding: true,
  },
];

export default function Index() {
  const [currentScene, setCurrentScene] = useState(0);
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [visitedScenes, setVisitedScenes] = useState<number[]>([0]);
  const [seenDialogs, setSeenDialogs] = useState<Set<number>>(new Set());

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        if (screen.orientation && screen.orientation.lock) {
          await screen.orientation.lock('landscape');
        }
      } catch (err) {
        console.log('Orientation lock not supported');
      }
    };
    
    lockOrientation();

    const handleResize = () => {
      if (window.innerHeight > window.innerWidth) {
        document.body.style.transform = 'rotate(-90deg)';
        document.body.style.transformOrigin = 'left top';
        document.body.style.width = `${window.innerHeight}px`;
        document.body.style.height = `${window.innerWidth}px`;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'absolute';
        document.body.style.top = `${window.innerWidth}px`;
        document.body.style.left = '0';
      } else {
        document.body.style.transform = '';
        document.body.style.transformOrigin = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const scene = STORY_SCENES.find((s) => s.id === currentScene) || STORY_SCENES[0];
  const currentDialog = scene.dialogs[currentDialogIndex];
  const isLastDialog = currentDialogIndex === scene.dialogs.length - 1;
  const hasSeenThisDialog = seenDialogs.has(currentDialog.id);
  const isSceneVisited = visitedScenes.includes(currentScene);

  const handleNext = () => {
    setSeenDialogs(prev => new Set(prev).add(currentDialog.id));
    if (!isLastDialog) {
      setCurrentDialogIndex(currentDialogIndex + 1);
    } else if (scene.choices && !scene.isEnding) {
      setShowChoices(true);
    }
  };

  const handleSkipToChoice = () => {
    scene.dialogs.forEach(dialog => {
      setSeenDialogs(prev => new Set(prev).add(dialog.id));
    });
    setCurrentDialogIndex(scene.dialogs.length - 1);
    if (scene.choices && !scene.isEnding) {
      setShowChoices(true);
    }
  };

  const handleChoice = (nextScene: number) => {
    setCurrentScene(nextScene);
    setCurrentDialogIndex(0);
    setShowChoices(false);
    setVisitedScenes([...visitedScenes, nextScene]);
  };

  const handleRestart = () => {
    setCurrentScene(0);
    setCurrentDialogIndex(0);
    setShowChoices(false);
    setVisitedScenes([0]);
  };

  const characterColors: Record<Character, string> = {
    narrator: 'text-gray-200 bg-gray-800',
    silent: 'text-slate-300 bg-slate-800',
    shadowmilk: 'text-indigo-400 bg-indigo-900',
    whitelily: 'text-white bg-green-700',
  };

  return (
    <div className="fixed inset-0 transition-all duration-700 overflow-hidden w-screen h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${THRONE_HALL_BG})` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${scene.background}`} />
      
      {/* Animated particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
      </div>

      <div className="h-full w-full flex items-center justify-center p-4 relative z-10">
        <div className="h-full w-full max-w-[95vw] flex flex-col">
          <div className="text-center py-3">
            <div className="inline-block relative">
              <h1 className="text-2xl md:text-3xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 font-black tracking-wider animate-gradient">
                ЧТО ЗА ПИЗДЕЦ ТУТ ПРОИСХОДИТ
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 animate-pulse" />
            </div>
            <Badge className="text-xs px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white border-2 border-red-400 shadow-lg shadow-red-500/50 font-bold">
              Cookie Run: Chaos Edition
            </Badge>
          </div>

          <div className="mb-3 flex justify-center gap-2 flex-wrap">
            {STORY_SCENES.map((s) => (
              <div
                key={s.id}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  visitedScenes.includes(s.id) 
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-500/50 scale-125' 
                    : 'bg-gray-600/50 backdrop-blur-sm'
                }`}
              />
            ))}
          </div>

          <div className="flex-1 flex items-stretch">
            <Card className="border-0 overflow-hidden animate-fade-in shadow-2xl bg-transparent w-full flex">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20 rounded-xl" />
              <div className="relative border-2 border-purple-500/30 rounded-xl overflow-hidden w-full flex flex-col md:flex-row">
                <div 
                  className="relative flex-1 flex items-center justify-center bg-cover bg-center min-h-[250px] md:min-h-0"
                  style={{ backgroundImage: `url(${scene.backgroundImage || THRONE_HALL_BG})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
                  {currentDialog.image && (
                    <div className="relative z-10 h-full flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent blur-3xl" />
                      <img
                        src={currentDialog.image}
                        alt="Character Sprite"
                        className={`max-h-[90%] max-w-full h-auto object-contain drop-shadow-[0_0_80px_rgba(139,92,246,0.9)] relative z-10 filter transition-all duration-700 ${
                          currentDialog.id <= 4 ? 'brightness-0' : 'brightness-110'
                        } ${
                          currentDialog.id === 7 ? 'animate-dramatic-entrance' : 'animate-scale-in'
                        }`}
                      />
                    </div>
                  )}
                </div>

            <div className="relative bg-gradient-to-b from-black/98 via-gray-900/98 to-black/98 backdrop-blur-md border-t-2 md:border-t-0 md:border-l-2 border-purple-500/50 p-4 md:p-6 flex flex-col justify-between md:w-[45%]">
              <div className="absolute top-0 left-0 right-0 md:top-0 md:left-0 md:bottom-0 md:right-auto h-px md:h-auto md:w-px bg-gradient-to-r md:bg-gradient-to-b from-transparent via-purple-400 to-transparent" />
              
              <div className="mb-3">
                <Badge className={`${characterColors[currentDialog.character]} border-2 border-current text-xs md:text-sm px-3 py-1.5 font-bold shadow-lg rounded-full`}>
                  {currentDialog.name}
                </Badge>
              </div>
              
              <div className="relative flex-1 flex items-center">
                <p className="text-sm md:text-base leading-relaxed text-white/95 font-medium">
                  {currentDialog.text}
                </p>
              </div>

              <div className="flex justify-between items-center gap-2 mt-3">
                {!showChoices && !scene.isEnding && isSceneVisited && !isLastDialog && (
                  <Button
                    onClick={handleSkipToChoice}
                    variant="outline"
                    className="bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 border-2 border-gray-600/50 text-xs backdrop-blur-sm transition-all hover:scale-105 py-2 px-3"
                  >
                    <Icon name="FastForward" size={12} className="mr-1" />
                    ПРОПУСТИТЬ
                  </Button>
                )}
                <div className="flex-1" />
                {!showChoices && !scene.isEnding && (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/50 font-bold px-4 md:px-6 py-2 text-xs md:text-sm transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/70"
                  >
                    {isLastDialog && scene.choices ? '✨ ВЫБРАТЬ' : 'ДАЛЕЕ'}
                    <Icon name="ChevronRight" size={14} className="ml-1" />
                  </Button>
                )}

                {!showChoices && scene.isEnding && isLastDialog && (
                  <Button
                    onClick={handleRestart}
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white border-2 border-red-400/50 animate-pulse shadow-lg shadow-red-500/50 font-bold px-4 md:px-6 py-2 text-xs md:text-sm transition-all hover:scale-105"
                  >
                    <Icon name="RotateCcw" size={14} className="mr-1" />
                    🔄 ЗАНОВО
                  </Button>
                )}

                {!showChoices && scene.isEnding && !isLastDialog && (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-2 border-purple-400/50 shadow-lg shadow-purple-500/50 font-bold px-4 md:px-6 py-2 text-xs md:text-sm transition-all hover:scale-105"
                  >
                    ДАЛЕЕ
                    <Icon name="ChevronRight" size={14} className="ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {showChoices && scene.choices && (
          <div className="mt-3 space-y-2 animate-fade-in">
            <div className="text-center mb-2">
              <p className="text-sm md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-lg mb-1">
                ⚡ ЧТО ДЕЛАТЬ?! ⚡
              </p>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto" />
            </div>
            {scene.choices.map((choice, idx) => (
              <Button
                key={idx}
                onClick={() => handleChoice(choice.nextScene)}
                className="relative w-full text-xs md:text-sm py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white border-2 border-purple-400/50 shadow-xl shadow-purple-500/50 font-bold transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/70 backdrop-blur-sm overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative z-10">{choice.text}</span>
              </Button>
            ))}
          </div>
        )}

        <div className="mt-3 flex justify-center gap-2">
          <Button
            onClick={handleRestart}
            variant="outline"
            size="sm"
            className="border-2 border-white text-white hover:bg-white/20 text-xs py-1 px-2"
          >
            <Icon name="Home" size={12} className="mr-1" />
            Сначала
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-white text-white hover:bg-white/20 text-xs py-1 px-2"
          >
            <Icon name="Volume2" size={12} className="mr-1" />
            Звук
          </Button>
        </div>
      </div>
    </div>
  );
}