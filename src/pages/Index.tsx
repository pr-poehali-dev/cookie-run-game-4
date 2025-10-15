import { useState } from 'react';
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
      { id: 33, character: 'silent', name: 'Silent Salt Cookie', text: '... (убей... меня... пожалуйста...)', image: SILENT_SALT_ANGRY_IMG },
      { id: 34, character: 'shadowmilk', name: 'Shadow Milk', text: 'А ЕЩЁ! У меня есть теория о природе времени! Хочешь послушать?!', image: SHADOW_MILK_IMG },
      { id: 35, character: 'silent', name: 'Silent Salt Cookie', text: '... (это... пытка хуже чем тысяча лет запечатывания...)', image: SILENT_SALT_ANGRY_IMG },
      { id: 36, character: 'narrator', name: 'Narrator', text: '*12 часов спустя*', image: SHADOW_MILK_IMG },
      { id: 37, character: 'silent', name: 'Silent Salt Cookie', text: '...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 38, character: 'narrator', name: 'Narrator', text: 'Silent Salt Cookie не выдержал бесконечного потока слов.', image: DARK_ENCHANTRESS_IMG },
      { id: 39, character: 'narrator', name: 'Narrator', text: 'Его разум растворился в океане болтовни Shadow Milk.', image: DARK_ENCHANTRESS_IMG },
      { id: 40, character: 'narrator', name: 'Narrator', text: 'Некоторые говорят, что он до сих пор слушает эти истории в вечности...', image: DARK_ENCHANTRESS_IMG },
      { id: 41, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА: "Молчание - золото, слова - пытка" *:･ﾟ✧*:･ﾟ✧', image: DARK_ENCHANTRESS_IMG },
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
      { id: 92, character: 'narrator', name: 'Narrator', text: '*ВОСПОМИНАНИЕ: Тысяча лет назад*', image: SILENT_SALT_SWORD_IMG },
      { id: 93, character: 'silent', name: 'Silent Salt (прошлое)', text: '... (я был хранителем... защитником...)', image: SILENT_SALT_SWORD_IMG },
      { id: 94, character: 'narrator', name: 'Narrator', text: 'Образы великих битв. Молчаливый воин, защищающий невинных.', image: SILENT_SALT_SWORD_IMG },
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
      { id: 118, character: 'narrator', name: 'Narrator', text: 'Silent Salt и Shadow Milk стали неожиданными друзьями.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 119, character: 'narrator', name: 'Narrator', text: 'Иногда истинная сила не в мече, а в способности отпустить прошлое.', image: SHADOW_MILK_IMG },
      { id: 120, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА: "Молчаливое Прощение" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_SERIOUS_IMG },
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
    <div className="min-h-screen p-4 transition-all duration-700 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${THRONE_HALL_BG})` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${scene.background} opacity-80`} />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-6 pt-4">
          <h1 className="text-2xl md:text-3xl mb-2 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] font-bold tracking-wide">
            ЧТО ЗА ПИЗДЕЦ ТУТ ПРОИСХОДИТ
          </h1>
          <Badge className="text-xs px-3 py-1 bg-red-600 text-white border-2 border-red-800">
            Cookie Run: Chaos Edition
          </Badge>
        </div>

        <div className="mb-4 flex justify-center gap-2">
          {STORY_SCENES.map((s) => (
            <div
              key={s.id}
              className={`w-3 h-3 rounded-full transition-all ${
                visitedScenes.includes(s.id) ? 'bg-purple-500 animate-sparkle' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>

        <Card className="border-4 border-purple-600 overflow-hidden animate-fade-in shadow-2xl shadow-purple-500/50">
          <div 
            className="relative p-4 min-h-[400px] flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${scene.backgroundImage || THRONE_HALL_BG})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            {currentDialog.image && (
              <img
                src={currentDialog.image}
                alt="Character Sprite"
                className="w-full max-w-md h-auto object-contain animate-scale-in drop-shadow-[0_0_50px_rgba(139,92,246,0.8)] relative z-10"
              />
            )}
          </div>

          <div className="bg-gradient-to-b from-black/95 to-gray-900/95 border-t-4 border-purple-600 p-6">
            <div className="mb-3">
              <Badge className={`${characterColors[currentDialog.character]} border-2 border-current text-sm px-3 py-1 font-semibold`}>
                {currentDialog.name}
              </Badge>
            </div>
            <p className="text-sm md:text-base leading-relaxed mb-4 min-h-[60px] text-white font-normal">
              {currentDialog.text}
            </p>

            <div className="flex justify-between items-center gap-2">
              {!showChoices && !scene.isEnding && isSceneVisited && !isLastDialog && (
                <Button
                  onClick={handleSkipToChoice}
                  variant="outline"
                  className="bg-gray-700 hover:bg-gray-600 text-gray-300 border-2 border-gray-500 text-xs"
                >
                  <Icon name="FastForward" size={14} className="mr-1" />
                  ПРОПУСТИТЬ
                </Button>
              )}
              <div className="flex-1" />
              {!showChoices && !scene.isEnding && (
                <Button
                  onClick={handleNext}
                  className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-purple-400 shadow-lg shadow-purple-500/50"
                >
                  {isLastDialog && scene.choices ? 'ВЫБРАТЬ' : 'ДАЛЕЕ'}
                  <Icon name="ChevronRight" size={16} className="ml-1" />
                </Button>
              )}

              {!showChoices && scene.isEnding && isLastDialog && (
                <Button
                  onClick={handleRestart}
                  className="bg-red-600 hover:bg-red-700 text-white border-2 border-red-400 animate-pulse"
                >
                  <Icon name="RotateCcw" size={16} className="mr-1" />
                  ЗАНОВО
                </Button>
              )}

              {!showChoices && scene.isEnding && !isLastDialog && (
                <Button
                  onClick={handleNext}
                  className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-purple-400"
                >
                  ДАЛЕЕ
                  <Icon name="ChevronRight" size={16} className="ml-1" />
                </Button>
              )}
            </div>
          </div>
        </Card>

        {showChoices && scene.choices && (
          <div className="mt-4 space-y-3 animate-fade-in">
            <p className="text-center text-base font-semibold text-white drop-shadow-lg">ЧТО ДЕЛАТЬ?!</p>
            {scene.choices.map((choice, idx) => (
              <Button
                key={idx}
                onClick={() => handleChoice(choice.nextScene)}
                className="w-full text-sm py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-4 border-purple-400 hover-scale shadow-lg shadow-purple-500/50 font-semibold"
              >
                {choice.text}
              </Button>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center gap-3">
          <Button
            onClick={handleRestart}
            variant="outline"
            size="sm"
            className="border-2 border-white text-white hover:bg-white/20 text-xs"
          >
            <Icon name="Home" size={14} className="mr-1" />
            Сначала
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-2 border-white text-white hover:bg-white/20 text-xs"
          >
            <Icon name="Volume2" size={14} className="mr-1" />
            Звук
          </Button>
        </div>
      </div>
    </div>
  );
}