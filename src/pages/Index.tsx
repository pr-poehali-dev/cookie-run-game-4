import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Character = 'silent' | 'narrator' | 'shadowmilk' | 'whitelily' | 'purevanilla' | 'goldenecheese' | 'darkenchoco' | 'mystic';

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
      { text: '... (продолжать атаковать)', nextScene: 3 },
      { text: '... (остановиться и успокоиться)', nextScene: 4 },
      { text: '... (уйти из катакомб)', nextScene: 5 },
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
    ],
    choices: [
      { text: '... (прервать его - ХВАТИТ)', nextScene: 10 },
      { text: '... (продолжать слушать терпеливо)', nextScene: 11 },
      { id: 36, text: '... (попытаться сбежать незаметно)', nextScene: 12 },
    ],
  },
  {
    id: 3,
    background: 'from-red-600 via-orange-600 to-black',
    dialogs: [
      { id: 37, character: 'silent', name: 'Silent Salt Cookie', text: '... *достаёт меч*', image: SILENT_SALT_SWORD_IMG },
      { id: 38, character: 'shadowmilk', name: 'Shadow Milk', text: 'СТОП СТОП СТОП! Я ЖЕ ШУЧУ!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 39, character: 'narrator', name: 'Narrator', text: '*эпичная драка*', image: SILENT_SALT_SWORD_IMG },
      { id: 40, character: 'shadowmilk', name: 'Shadow Milk', text: '...Ой. Я проиграл. КАК ДРАМАТИЧНО!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 41, character: 'narrator', name: 'Narrator', text: 'Silent Salt одним ударом побеждает Shadow Milk.', image: SILENT_SALT_SWORD_IMG },
      { id: 42, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #1: "Молчаливый Разрушитель" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_SERIOUS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 4,
    background: 'from-blue-900 via-cyan-900 to-black',
    dialogs: [
      { id: 43, character: 'silent', name: 'Silent Salt Cookie', text: '... (хватит драться)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 44, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОХ! Ты остановился! Может ты не такой злой?', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 45, character: 'shadowmilk', name: 'Shadow Milk', text: 'Знаешь... я рад что ты проснулся. Было одиноко тут.', image: SHADOW_MILK_IMG },
      { id: 46, character: 'silent', name: 'Silent Salt Cookie', text: '... (одиноко?)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 47, character: 'shadowmilk', name: 'Shadow Milk', text: 'Да... тысяча лет в тишине... даже для меня это было слишком долго.', image: SHADOW_MILK_IMG },
      { id: 48, character: 'shadowmilk', name: 'Shadow Milk', text: 'Может... мы могли бы попытаться понять друг друга?', image: SHADOW_MILK_IMG },
    ],
    choices: [
      { text: '... (дать ему шанс)', nextScene: 13 },
      { text: '... (всё равно уйти)', nextScene: 5 },
    ],
  },
  {
    id: 5,
    background: 'from-slate-700 via-gray-800 to-black',
    dialogs: [
      { id: 49, character: 'silent', name: 'Silent Salt Cookie', text: '... *уходит*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 50, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОН ПРОСТО УШЁЛ! БРОСИЛ МЕНЯ! КАК ОБИДНО!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 51, character: 'shadowmilk', name: 'Shadow Milk', text: 'Хотя... наверное ему нужно побыть одному. Я понимаю...', image: SHADOW_MILK_IMG },
      { id: 52, character: 'narrator', name: 'Narrator', text: 'Silent Salt выходит из катакомб. Впереди два пути...', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (идти в мистический лес)', nextScene: 6 },
      { text: '... (вернуться в катакомбы молчания)', nextScene: 7 },
      { text: '... (направиться к руинам древнего города)', nextScene: 14 },
    ],
  },
  {
    id: 6,
    background: 'from-green-800 via-emerald-900 to-black',
    backgroundImage: FOREST_BG,
    dialogs: [
      { id: 53, character: 'narrator', name: 'Narrator', text: 'Silent Salt медленно идёт прочь от шума и хаоса...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 54, character: 'silent', name: 'Silent Salt Cookie', text: '... (наконец-то... тишина)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 55, character: 'narrator', name: 'Narrator', text: 'Он входит в древний мистический лес. Бирюзовое свечение окутывает деревья.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 56, character: 'silent', name: 'Silent Salt Cookie', text: '... (здесь так спокойно...)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 57, character: 'narrator', name: 'Narrator', text: 'Вдруг, среди деревьев появляется силуэт...', image: WHITE_LILY_IMG },
      { id: 58, character: 'whitelily', name: 'White Lily Cookie', text: 'О... здравствуйте...', image: WHITE_LILY_IMG },
      { id: 59, character: 'whitelily', name: 'White Lily Cookie', text: 'Прошу прощения, я не ожидала встретить кого-то здесь.', image: WHITE_LILY_IMG },
      { id: 60, character: 'silent', name: 'Silent Salt Cookie', text: '... *медленно кивает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 61, character: 'whitelily', name: 'White Lily Cookie', text: 'Вы тоже любите этот лес? Эту тишину и покой?', image: WHITE_LILY_IMG },
      { id: 62, character: 'silent', name: 'Silent Salt Cookie', text: '... *снова кивает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 63, character: 'whitelily', name: 'White Lily Cookie', text: 'Знаете... редко встретишь кого-то, кто понимает ценность молчания.', image: WHITE_LILY_IMG },
      { id: 64, character: 'whitelily', name: 'White Lily Cookie', text: 'В мире, где все постоянно говорят, кричат, спорят...', image: WHITE_LILY_IMG },
      { id: 65, character: 'whitelily', name: 'White Lily Cookie', text: '...такое облегчение просто сидеть в тишине с кем-то, кто её понимает.', image: WHITE_LILY_IMG },
      { id: 66, character: 'narrator', name: 'Narrator', text: 'Они сидят рядом, наблюдая за танцем светлячков.', image: WHITE_LILY_IMG },
      { id: 67, character: 'whitelily', name: 'White Lily Cookie', text: 'Хотите остаться здесь? Мы могли бы... просто быть рядом.', image: WHITE_LILY_IMG },
      { id: 68, character: 'silent', name: 'Silent Salt Cookie', text: '... *медленная улыбка*', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (остаться с White Lily)', nextScene: 15 },
      { text: '... (продолжить путь одному)', nextScene: 16 },
      { text: '... (предложить ей идти вместе)', nextScene: 17 },
    ],
  },
  {
    id: 7,
    background: 'from-slate-700 via-gray-800 to-black',
    dialogs: [
      { id: 69, character: 'narrator', name: 'Narrator', text: 'Silent Salt Cookie вернулся в катакомбы молчания.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 70, character: 'silent', name: 'Silent Salt Cookie', text: '... (здесь... мой покой)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 71, character: 'narrator', name: 'Narrator', text: 'Он снова погружается в вечный сон...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 72, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #2: "Вечный Сон" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_SERIOUS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 8,
    background: 'from-indigo-900 via-purple-900 to-black',
    dialogs: [
      { id: 73, character: 'silent', name: 'Silent Salt Cookie', text: '... (мои воспоминания... они такие размытые...)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 74, character: 'narrator', name: 'Narrator', text: 'Silent Salt закрывает глаза, пытаясь вспомнить...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 75, character: 'narrator', name: 'Narrator', text: '*ВОСПОМИНАНИЕ: Тысяча лет назад*', image: SALT_OF_SOLIDARITY_IMG },
      { id: 76, character: 'silent', name: 'Salt of Solidarity', text: '... (я был хранителем... защитником...)', image: SALT_OF_SOLIDARITY_IMG },
      { id: 77, character: 'narrator', name: 'Narrator', text: 'Образы великих битв. Молчаливый воин, защищающий невинных.', image: SALT_OF_SOLIDARITY_IMG },
      { id: 78, character: 'silent', name: 'Silent Salt (прошлое)', text: '... (но я был предан... запечатан... забыт...)', image: SILENT_SALT_ANGRY_IMG },
      { id: 79, character: 'narrator', name: 'Narrator', text: 'Боль. Предательство. Тьма поглотила всё...', image: SILENT_SALT_ANGRY_IMG },
      { id: 80, character: 'shadowmilk', name: 'Shadow Milk', text: 'Эй-эй! Ты в порядке? Ты внезапно застыл!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 81, character: 'silent', name: 'Silent Salt Cookie', text: '... (воспоминания... слишком болезненны...)', image: SILENT_SALT_ANGRY_IMG },
    ],
    choices: [
      { text: '... (продолжить вспоминать - нужно знать правду)', nextScene: 18 },
      { text: '... (остановиться - прошлое должно остаться в прошлом)', nextScene: 19 },
      { text: '... (спросить Shadow Milk о прошлом)', nextScene: 20 },
    ],
  },
  {
    id: 10,
    background: 'from-orange-900 via-red-900 to-black',
    dialogs: [
      { id: 82, character: 'silent', name: 'Silent Salt Cookie', text: 'ХВАТИТ!', image: SILENT_SALT_ANGRY_IMG },
      { id: 83, character: 'shadowmilk', name: 'Shadow Milk', text: '...', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 84, character: 'shadowmilk', name: 'Shadow Milk', text: 'Ты... ты ЗАГОВОРИЛ?!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 85, character: 'narrator', name: 'Narrator', text: 'В катакомбах воцарилась абсолютная тишина.', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 86, character: 'shadowmilk', name: 'Shadow Milk', text: 'Впервые... за тысячу лет... ты произнёс слово...', image: SHADOW_MILK_IMG },
      { id: 87, character: 'silent', name: 'Silent Salt Cookie', text: '... (что я наделал...)', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: 'Продолжать говорить', nextScene: 21 },
      { text: '... (вернуться к молчанию)', nextScene: 22 },
    ],
  },
  {
    id: 11,
    background: 'from-gray-800 via-gray-900 to-black',
    dialogs: [
      { id: 88, character: 'narrator', name: 'Narrator', text: '*12 часов спустя*', image: SHADOW_MILK_IMG },
      { id: 89, character: 'silent', name: 'Silent Salt Cookie', text: '...', image: SILENT_SALT_TIRED_IMG },
      { id: 90, character: 'shadowmilk', name: 'Shadow Milk', text: '...и вот так я доказал что пи - это иррациональное число!', image: SHADOW_MILK_IMG },
      { id: 91, character: 'narrator', name: 'Narrator', text: 'Silent Salt теряет сознание от переизбытка информации.', image: SILENT_SALT_TIRED_IMG },
      { id: 92, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #3: "Информационная Перегрузка" *:･ﾟ✧*:･ﾟ✧', image: SHADOW_MILK_IMG },
    ],
    isEnding: true,
  },
  {
    id: 12,
    background: 'from-purple-900 via-indigo-900 to-black',
    dialogs: [
      { id: 93, character: 'silent', name: 'Silent Salt Cookie', text: '... *медленно отступает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 94, character: 'shadowmilk', name: 'Shadow Milk', text: 'А потом я понял что...', image: SHADOW_MILK_IMG },
      { id: 95, character: 'narrator', name: 'Narrator', text: '*Silent Salt успешно сбегает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 96, character: 'shadowmilk', name: 'Shadow Milk', text: '...эй? ЭЙ?! ТЫ КУДА?!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 97, character: 'narrator', name: 'Narrator', text: 'Поздно. Silent Salt уже далеко.', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (бежать в лес)', nextScene: 6 },
      { text: '... (бежать к городу)', nextScene: 14 },
    ],
  },
  {
    id: 13,
    background: 'from-blue-800 via-purple-800 to-black',
    dialogs: [
      { id: 98, character: 'silent', name: 'Silent Salt Cookie', text: '... *кивает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 99, character: 'shadowmilk', name: 'Shadow Milk', text: 'Правда?! Ты дашь мне шанс?!', image: SHADOW_MILK_IMG },
      { id: 100, character: 'shadowmilk', name: 'Shadow Milk', text: 'Знаешь... я многому научился за эти годы.', image: SHADOW_MILK_IMG },
      { id: 101, character: 'shadowmilk', name: 'Shadow Milk', text: 'Научился... слушать тишину.', image: SHADOW_MILK_IMG },
      { id: 102, character: 'silent', name: 'Silent Salt Cookie', text: '... (он... изменился?)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 103, character: 'shadowmilk', name: 'Shadow Milk', text: 'Пойдём. Покажу тебе кое-что интересное.', image: SHADOW_MILK_IMG },
    ],
    choices: [
      { text: '... (пойти с ним)', nextScene: 23 },
      { text: '... (отказаться)', nextScene: 5 },
    ],
  },
  {
    id: 14,
    background: 'from-amber-900 via-yellow-900 to-black',
    backgroundImage: THRONE_HALL_BG,
    dialogs: [
      { id: 104, character: 'narrator', name: 'Narrator', text: 'Древний город. Когда-то величественный, теперь - руины.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 105, character: 'silent', name: 'Silent Salt Cookie', text: '... (я помню это место...)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 106, character: 'narrator', name: 'Narrator', text: 'Среди руин Silent Salt находит старый зал.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 107, character: 'silent', name: 'Silent Salt Cookie', text: '... (здесь... я когда-то стоял на страже...)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 108, character: 'narrator', name: 'Narrator', text: 'Вдруг, из тени появляется фигура...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 109, character: 'mystic', name: '???', text: 'Наконец-то... ты вернулся, Хранитель.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 110, character: 'silent', name: 'Silent Salt Cookie', text: '... (кто это?)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 111, character: 'mystic', name: 'Mystic Flour Cookie', text: 'Я ждала тебя тысячу лет.', image: WHITE_LILY_IMG },
      { id: 112, character: 'mystic', name: 'Mystic Flour Cookie', text: 'Есть много того, о чём мы должны поговорить.', image: WHITE_LILY_IMG },
    ],
    choices: [
      { text: '... (выслушать её)', nextScene: 24 },
      { text: '... (приготовиться к бою)', nextScene: 25 },
      { text: '... (развернуться и уйти)', nextScene: 26 },
    ],
  },
  {
    id: 15,
    background: 'from-green-800 via-emerald-900 to-black',
    backgroundImage: FOREST_BG,
    dialogs: [
      { id: 113, character: 'silent', name: 'Silent Salt Cookie', text: '... *садится рядом*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 114, character: 'whitelily', name: 'White Lily Cookie', text: '*улыбается* Спасибо...', image: WHITE_LILY_IMG },
      { id: 115, character: 'narrator', name: 'Narrator', text: 'Дни превращаются в недели. Недели в месяцы.', image: WHITE_LILY_IMG },
      { id: 116, character: 'narrator', name: 'Narrator', text: 'Они не говорят. Они просто... есть.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 117, character: 'whitelily', name: 'White Lily Cookie', text: 'Знаете... я никогда не думала, что молчание может быть таким... тёплым.', image: WHITE_LILY_IMG },
      { id: 118, character: 'silent', name: 'Silent Salt Cookie', text: '...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 119, character: 'narrator', name: 'Narrator', text: 'И впервые за тысячу лет Silent Salt чувствует...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 120, character: 'narrator', name: 'Narrator', text: '...что его молчание - не проклятие. Это дар.', image: WHITE_LILY_IMG },
      { id: 121, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #4: "Тихая Гармония" *:･ﾟ✧*:･ﾟ✧', image: WHITE_LILY_IMG },
    ],
    isEnding: true,
  },
  {
    id: 16,
    background: 'from-slate-800 via-gray-900 to-black',
    dialogs: [
      { id: 122, character: 'silent', name: 'Silent Salt Cookie', text: '... *качает головой*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 123, character: 'whitelily', name: 'White Lily Cookie', text: 'Я... понимаю. Каждому нужен свой путь.', image: WHITE_LILY_IMG },
      { id: 124, character: 'narrator', name: 'Narrator', text: 'Silent Salt продолжает путь в одиночестве.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 125, character: 'silent', name: 'Silent Salt Cookie', text: '... (мой путь... всегда был одинок...)', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (идти дальше в горы)', nextScene: 27 },
      { text: '... (вернуться к ней)', nextScene: 15 },
    ],
  },
  {
    id: 17,
    background: 'from-green-800 via-emerald-900 to-black',
    backgroundImage: FOREST_BG,
    dialogs: [
      { id: 126, character: 'silent', name: 'Silent Salt Cookie', text: '... *протягивает руку*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 127, character: 'whitelily', name: 'White Lily Cookie', text: 'Вы... приглашаете меня?', image: WHITE_LILY_IMG },
      { id: 128, character: 'silent', name: 'Silent Salt Cookie', text: '... *кивает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 129, character: 'whitelily', name: 'White Lily Cookie', text: 'Я... я бы с радостью! Куда мы направляемся?', image: WHITE_LILY_IMG },
      { id: 130, character: 'narrator', name: 'Narrator', text: 'Два одиноких странника начинают новое путешествие вместе.', image: WHITE_LILY_IMG },
    ],
    choices: [
      { text: '... (к древнему городу)', nextScene: 28 },
      { text: '... (в неизведанные земли)', nextScene: 29 },
    ],
  },
  {
    id: 18,
    background: 'from-red-900 via-black to-red-900',
    dialogs: [
      { id: 131, character: 'narrator', name: 'Narrator', text: '*ВОСПОМИНАНИЯ НАХЛЫНУЛИ*', image: SALT_OF_SOLIDARITY_IMG },
      { id: 132, character: 'silent', name: 'Salt of Solidarity (прошлое)', text: '... (я защищал их всех...)', image: SALT_OF_SOLIDARITY_IMG },
      { id: 133, character: 'narrator', name: 'Narrator', text: 'Битвы. Кровь. Предательство.', image: SILENT_SALT_ANGRY_IMG },
      { id: 134, character: 'silent', name: 'Salt of Solidarity', text: '... (и меня запечатали... те, кого я защищал...)', image: SILENT_SALT_ANGRY_IMG },
      { id: 135, character: 'narrator', name: 'Narrator', text: 'Боль слишком велика. Ярость поглощает разум.', image: SILENT_SALT_ANGRY_IMG },
      { id: 136, character: 'silent', name: 'Silent Salt Cookie', text: '... (МЕСТЬ... МНЕ НУЖНА МЕСТЬ!)', image: SILENT_SALT_ANGRY_IMG },
    ],
    choices: [
      { text: '... (отпустить гнев)', nextScene: 30 },
      { text: '... (принять тьму внутри)', nextScene: 31 },
    ],
  },
  {
    id: 19,
    background: 'from-blue-900 via-indigo-900 to-black',
    dialogs: [
      { id: 137, character: 'silent', name: 'Silent Salt Cookie', text: '... (нет... прошлое в прошлом)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 138, character: 'narrator', name: 'Narrator', text: 'Silent Salt останавливает поток воспоминаний.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 139, character: 'shadowmilk', name: 'Shadow Milk', text: 'Эй, ты в порядке?', image: SHADOW_MILK_IMG },
      { id: 140, character: 'silent', name: 'Silent Salt Cookie', text: '... *кивает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 141, character: 'shadowmilk', name: 'Shadow Milk', text: 'Ладно... если что, я тут.', image: SHADOW_MILK_IMG },
    ],
    choices: [
      { text: '... (поговорить с Shadow Milk)', nextScene: 13 },
      { text: '... (уйти)', nextScene: 5 },
    ],
  },
  {
    id: 20,
    background: 'from-purple-900 via-violet-900 to-black',
    dialogs: [
      { id: 142, character: 'silent', name: 'Silent Salt Cookie', text: '... (Shadow Milk... расскажи мне...)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 143, character: 'shadowmilk', name: 'Shadow Milk', text: 'О! Ты хочешь знать о прошлом?', image: SHADOW_MILK_IMG },
      { id: 144, character: 'shadowmilk', name: 'Shadow Milk', text: 'Хм... это длинная история. Ты уверен?', image: SHADOW_MILK_IMG },
      { id: 145, character: 'silent', name: 'Silent Salt Cookie', text: '... *кивает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 146, character: 'shadowmilk', name: 'Shadow Milk', text: 'Ладно... слушай...', image: SHADOW_MILK_IMG },
      { id: 147, character: 'shadowmilk', name: 'Shadow Milk', text: 'Тысячу лет назад... мы были героями.', image: SHADOW_MILK_IMG },
      { id: 148, character: 'shadowmilk', name: 'Shadow Milk', text: 'Но сила развратила нас. Мы стали тем, от чего защищали других.', image: SHADOW_MILK_IMG },
      { id: 149, character: 'shadowmilk', name: 'Shadow Milk', text: 'И нас запечатали. Справедливо, если подумать.', image: SHADOW_MILK_IMG },
      { id: 150, character: 'silent', name: 'Silent Salt Cookie', text: '... (значит... мы сами виноваты...)', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (принять прошлое)', nextScene: 32 },
      { text: '... (отрицать его слова)', nextScene: 33 },
    ],
  },
  {
    id: 21,
    background: 'from-orange-800 via-red-800 to-black',
    dialogs: [
      { id: 151, character: 'silent', name: 'Silent Salt Cookie', text: 'Я... устал молчать.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 152, character: 'shadowmilk', name: 'Shadow Milk', text: '...ВАУ. Твой голос... он такой...', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 153, character: 'silent', name: 'Silent Salt Cookie', text: 'Тихий? Слабый?', image: SILENT_SALT_SERIOUS_IMG },
      { id: 154, character: 'shadowmilk', name: 'Shadow Milk', text: 'Нет. Сильный. Очень сильный.', image: SHADOW_MILK_IMG },
      { id: 155, character: 'shadowmilk', name: 'Shadow Milk', text: 'Потому что ты говоришь только когда это действительно важно.', image: SHADOW_MILK_IMG },
      { id: 156, character: 'silent', name: 'Silent Salt Cookie', text: '... Спасибо.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 157, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #5: "Найденный Голос" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_SERIOUS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 22,
    background: 'from-gray-900 via-slate-900 to-black',
    dialogs: [
      { id: 158, character: 'silent', name: 'Silent Salt Cookie', text: '...', image: SILENT_SALT_SERIOUS_IMG },
      { id: 159, character: 'shadowmilk', name: 'Shadow Milk', text: 'Снова молчание, да?', image: SHADOW_MILK_IMG },
      { id: 160, character: 'shadowmilk', name: 'Shadow Milk', text: 'Ничего. Я... наверное понимаю.', image: SHADOW_MILK_IMG },
      { id: 161, character: 'narrator', name: 'Narrator', text: 'Момент был потерян. Молчание вернулось.', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (уйти)', nextScene: 5 },
      { text: '... (остаться)', nextScene: 13 },
    ],
  },
  {
    id: 23,
    background: 'from-purple-800 via-blue-800 to-black',
    dialogs: [
      { id: 162, character: 'shadowmilk', name: 'Shadow Milk', text: 'Смотри! Это... моё творение!', image: SHADOW_MILK_IMG },
      { id: 163, character: 'narrator', name: 'Narrator', text: 'Shadow Milk показывает зал, полный скульптур из тени.', image: SHADOW_MILK_IMG },
      { id: 164, character: 'shadowmilk', name: 'Shadow Milk', text: 'Я создавал их годами. Каждая - история.', image: SHADOW_MILK_IMG },
      { id: 165, character: 'silent', name: 'Silent Salt Cookie', text: '... (это... красиво)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 166, character: 'shadowmilk', name: 'Shadow Milk', text: 'Правда? Ты думаешь?!', image: SHADOW_MILK_IMG },
      { id: 167, character: 'shadowmilk', name: 'Shadow Milk', text: 'Знаешь... тишина помогла мне найти это искусство.', image: SHADOW_MILK_IMG },
      { id: 168, character: 'shadowmilk', name: 'Shadow Milk', text: 'Может... ты был прав всё это время.', image: SHADOW_MILK_IMG },
      { id: 169, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #6: "Искусство Тишины" *:･ﾟ✧*:･ﾟ✧', image: SHADOW_MILK_IMG },
    ],
    isEnding: true,
  },
  {
    id: 24,
    background: 'from-amber-900 via-yellow-900 to-black',
    backgroundImage: THRONE_HALL_BG,
    dialogs: [
      { id: 170, character: 'silent', name: 'Silent Salt Cookie', text: '... *слушает*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 171, character: 'mystic', name: 'Mystic Flour Cookie', text: 'Ты был великим воином. Самым верным.', image: WHITE_LILY_IMG },
      { id: 172, character: 'mystic', name: 'Mystic Flour Cookie', text: 'Но сила изменила нас всех. Даже тебя.', image: WHITE_LILY_IMG },
      { id: 173, character: 'mystic', name: 'Mystic Flour Cookie', text: 'Мы были запечатаны не из злобы. Из необходимости.', image: WHITE_LILY_IMG },
      { id: 174, character: 'mystic', name: 'Mystic Flour Cookie', text: 'Теперь ты свободен. Вопрос - что ты будешь делать?', image: WHITE_LILY_IMG },
      { id: 175, character: 'mystic', name: 'Mystic Flour Cookie', text: 'Повторишь ошибки прошлого? Или найдёшь новый путь?', image: WHITE_LILY_IMG },
    ],
    choices: [
      { text: '... (я найду новый путь)', nextScene: 34 },
      { text: '... (прошлое не отпускает меня)', nextScene: 35 },
    ],
  },
  {
    id: 25,
    background: 'from-red-900 via-orange-900 to-black',
    backgroundImage: THRONE_HALL_BG,
    dialogs: [
      { id: 176, character: 'silent', name: 'Silent Salt Cookie', text: '... *достаёт меч*', image: SILENT_SALT_SWORD_IMG },
      { id: 177, character: 'mystic', name: 'Mystic Flour Cookie', text: '*вздох* Я надеялась, что ты изменился.', image: WHITE_LILY_IMG },
      { id: 178, character: 'narrator', name: 'Narrator', text: '*ЭПИЧЕСКАЯ БИТВА*', image: SILENT_SALT_SWORD_IMG },
      { id: 179, character: 'mystic', name: 'Mystic Flour Cookie', text: 'Ты всё ещё тот же... всё ещё выбираешь насилие...', image: WHITE_LILY_IMG },
      { id: 180, character: 'narrator', name: 'Narrator', text: 'Битва длится вечность. В конце - только руины.', image: SILENT_SALT_ANGRY_IMG },
      { id: 181, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #7: "Вечная Война" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_SWORD_IMG },
    ],
    isEnding: true,
  },
  {
    id: 26,
    background: 'from-slate-800 via-gray-900 to-black',
    dialogs: [
      { id: 182, character: 'silent', name: 'Silent Salt Cookie', text: '... *уходит*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 183, character: 'mystic', name: 'Mystic Flour Cookie', text: 'Бегство... Может, это тоже ответ.', image: WHITE_LILY_IMG },
      { id: 184, character: 'narrator', name: 'Narrator', text: 'Silent Salt покидает город. Снова один.', image: SILENT_SALT_SERIOUS_IMG },
    ],
    choices: [
      { text: '... (в горы)', nextScene: 27 },
      { text: '... (в лес)', nextScene: 6 },
    ],
  },
  {
    id: 27,
    background: 'from-slate-600 via-gray-700 to-black',
    dialogs: [
      { id: 185, character: 'narrator', name: 'Narrator', text: 'Высоко в горах. Вдали от всех.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 186, character: 'silent', name: 'Silent Salt Cookie', text: '... (здесь... только я и ветер)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 187, character: 'narrator', name: 'Narrator', text: 'Silent Salt находит покой в одиночестве.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 188, character: 'narrator', name: 'Narrator', text: 'Годы проходят. Он становится легендой - призраком гор.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 189, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #8: "Горный Отшельник" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_SERIOUS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 28,
    background: 'from-amber-900 via-yellow-900 to-black',
    backgroundImage: THRONE_HALL_BG,
    dialogs: [
      { id: 190, character: 'narrator', name: 'Narrator', text: 'Silent Salt и White Lily входят в древний город.', image: WHITE_LILY_IMG },
      { id: 191, character: 'whitelily', name: 'White Lily Cookie', text: 'Здесь... чувствуется что-то древнее.', image: WHITE_LILY_IMG },
      { id: 192, character: 'silent', name: 'Silent Salt Cookie', text: '... (я знал это место...)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 193, character: 'narrator', name: 'Narrator', text: 'Вместе они исследуют руины, раскрывая секреты прошлого.', image: WHITE_LILY_IMG },
      { id: 194, character: 'whitelily', name: 'White Lily Cookie', text: 'Какая бы ни была твоя история... я рядом.', image: WHITE_LILY_IMG },
      { id: 195, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #9: "Новая Глава Вместе" *:･ﾟ✧*:･ﾟ✧', image: WHITE_LILY_IMG },
    ],
    isEnding: true,
  },
  {
    id: 29,
    background: 'from-cyan-900 via-blue-900 to-black',
    dialogs: [
      { id: 196, character: 'narrator', name: 'Narrator', text: 'За горизонт. В неизведанные земли.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 197, character: 'whitelily', name: 'White Lily Cookie', text: 'Куда мы идём?', image: WHITE_LILY_IMG },
      { id: 198, character: 'silent', name: 'Silent Salt Cookie', text: '... (не знаю... но мы вместе)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 199, character: 'narrator', name: 'Narrator', text: 'Два странника. Бесконечный путь. Новые приключения.', image: WHITE_LILY_IMG },
      { id: 200, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #10: "Бесконечный Путь" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_SERIOUS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 30,
    background: 'from-blue-800 via-indigo-800 to-black',
    dialogs: [
      { id: 201, character: 'silent', name: 'Silent Salt Cookie', text: '... (нет... месть - не путь)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 202, character: 'narrator', name: 'Narrator', text: 'Silent Salt отпускает гнев. Боль уходит.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 203, character: 'silent', name: 'Silent Salt Cookie', text: '... (прошлое... прощено)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 204, character: 'shadowmilk', name: 'Shadow Milk', text: 'Эй! Ты вернулся! Всё в порядке?', image: SHADOW_MILK_IMG },
      { id: 205, character: 'silent', name: 'Silent Salt Cookie', text: '... *кивает с улыбкой*', image: SILENT_SALT_SERIOUS_IMG },
      { id: 206, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #11: "Прощение" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_SERIOUS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 31,
    background: 'from-red-950 via-black to-red-950',
    dialogs: [
      { id: 207, character: 'silent', name: 'Silent Salt Cookie', text: 'МЕСТЬ... ОНИ ЗАПЛАТЯТ...', image: SILENT_SALT_ANGRY_IMG },
      { id: 208, character: 'narrator', name: 'Narrator', text: 'Тьма поглощает Silent Salt полностью.', image: SILENT_SALT_ANGRY_IMG },
      { id: 209, character: 'shadowmilk', name: 'Shadow Milk', text: 'ОЙ... это плохо. ЭТО ОЧЕНЬ ПЛОХО!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 210, character: 'narrator', name: 'Narrator', text: 'Silent Salt становится тем, от чего когда-то защищал других.', image: SILENT_SALT_ANGRY_IMG },
      { id: 211, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #12: "Падение во Тьму" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_ANGRY_IMG },
    ],
    isEnding: true,
  },
  {
    id: 32,
    background: 'from-indigo-800 via-purple-800 to-black',
    dialogs: [
      { id: 212, character: 'silent', name: 'Silent Salt Cookie', text: '... (ты прав... мы были чудовищами)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 213, character: 'shadowmilk', name: 'Shadow Milk', text: 'Но знаешь что? Мы можем измениться.', image: SHADOW_MILK_IMG },
      { id: 214, character: 'shadowmilk', name: 'Shadow Milk', text: 'Начать заново. Стать лучше.', image: SHADOW_MILK_IMG },
      { id: 215, character: 'silent', name: 'Silent Salt Cookie', text: '... (может быть...)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 216, character: 'narrator', name: 'Narrator', text: 'Два древних зла решают искупить прошлое.', image: SHADOW_MILK_IMG },
      { id: 217, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #13: "Путь Искупления" *:･ﾟ✧*:･ﾟ✧', image: SHADOW_MILK_IMG },
    ],
    isEnding: true,
  },
  {
    id: 33,
    background: 'from-orange-900 via-red-900 to-black',
    dialogs: [
      { id: 218, character: 'silent', name: 'Silent Salt Cookie', text: '... (нет... ты лжёшь!)', image: SILENT_SALT_ANGRY_IMG },
      { id: 219, character: 'shadowmilk', name: 'Shadow Milk', text: 'Я? Лгу? Ну... иногда. Но не сейчас.', image: SHADOW_MILK_IMG },
      { id: 220, character: 'silent', name: 'Silent Salt Cookie', text: '... *атакует*', image: SILENT_SALT_SWORD_IMG },
      { id: 221, character: 'shadowmilk', name: 'Shadow Milk', text: 'АЙ! Хорошо, хорошо! Я ухожу!', image: SHADOW_MILK_SHOCKED_IMG },
      { id: 222, character: 'narrator', name: 'Narrator', text: 'Silent Salt отказывается принять правду.', image: SILENT_SALT_ANGRY_IMG },
      { id: 223, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #14: "Отрицание" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_ANGRY_IMG },
    ],
    isEnding: true,
  },
  {
    id: 34,
    background: 'from-yellow-800 via-amber-800 to-black',
    backgroundImage: THRONE_HALL_BG,
    dialogs: [
      { id: 224, character: 'silent', name: 'Silent Salt Cookie', text: '... (я выбираю... новый путь)', image: SILENT_SALT_SERIOUS_IMG },
      { id: 225, character: 'mystic', name: 'Mystic Flour Cookie', text: 'Мудрый выбор. Я горжусь тобой.', image: WHITE_LILY_IMG },
      { id: 226, character: 'mystic', name: 'Mystic Flour Cookie', text: 'Иди. Найди своё предназначение.', image: WHITE_LILY_IMG },
      { id: 227, character: 'narrator', name: 'Narrator', text: 'Silent Salt покидает руины с новой целью.', image: SILENT_SALT_SERIOUS_IMG },
      { id: 228, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #15: "Новое Начало" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_SERIOUS_IMG },
    ],
    isEnding: true,
  },
  {
    id: 35,
    background: 'from-gray-900 via-slate-950 to-black',
    backgroundImage: THRONE_HALL_BG,
    dialogs: [
      { id: 229, character: 'silent', name: 'Silent Salt Cookie', text: '... (прошлое... слишком тяжёлое)', image: SILENT_SALT_TIRED_IMG },
      { id: 230, character: 'mystic', name: 'Mystic Flour Cookie', text: 'Я понимаю. Некоторые раны не заживают.', image: WHITE_LILY_IMG },
      { id: 231, character: 'narrator', name: 'Narrator', text: 'Silent Salt остаётся в руинах. Навсегда.', image: SILENT_SALT_TIRED_IMG },
      { id: 232, character: 'narrator', name: 'Narrator', text: 'Узник собственной истории.', image: SILENT_SALT_TIRED_IMG },
      { id: 233, character: 'narrator', name: 'Narrator', text: '✧･ﾟ: *✧･ﾟ:* КОНЦОВКА #16: "Узник Прошлого" *:･ﾟ✧*:･ﾟ✧', image: SILENT_SALT_TIRED_IMG },
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

  const scene = STORY_SCENES.find(s => s.id === currentScene) || STORY_SCENES[0];
  const currentDialog = scene.dialogs[currentDialogIndex];
  const isLastDialog = currentDialogIndex >= scene.dialogs.length - 1;

  const handleNext = () => {
    if (!isLastDialog) {
      setCurrentDialogIndex(prev => prev + 1);
      setSeenDialogs(prev => new Set(prev).add(currentDialog.id));
    } else if (scene.choices) {
      setShowChoices(true);
    }
  };

  const handleChoice = (nextScene: number) => {
    setCurrentScene(nextScene);
    setCurrentDialogIndex(0);
    setShowChoices(false);
    setVisitedScenes(prev => [...prev, nextScene]);
    setSeenDialogs(new Set());
  };

  const handleRestart = () => {
    setCurrentScene(0);
    setCurrentDialogIndex(0);
    setShowChoices(false);
    setVisitedScenes([0]);
    setSeenDialogs(new Set());
  };

  const characterStyles = {
    silent: 'text-gray-300 bg-gray-800',
    narrator: 'text-amber-200 bg-transparent',
    shadowmilk: 'text-purple-300 bg-purple-900',
    whitelily: 'text-white bg-green-700',
    purevanilla: 'text-yellow-100 bg-yellow-800',
    goldenecheese: 'text-amber-200 bg-amber-900',
    darkenchoco: 'text-red-200 bg-red-950',
    mystic: 'text-indigo-200 bg-indigo-900',
  };

  return (
    <div className="fixed inset-0 transition-all duration-700 overflow-hidden w-screen h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: scene.backgroundImage ? `url(${scene.backgroundImage})` : 'none',
        }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${scene.background}`} />
      
      <div className="relative h-full flex flex-col items-center justify-between p-8">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-black/50 text-white border-white/30">
            Сцена {scene.id + 1}/{STORY_SCENES.length}
          </Badge>
          <Badge variant="outline" className="bg-black/50 text-white border-white/30">
            {visitedScenes.length} посещено
          </Badge>
        </div>

        <div className="w-full max-w-6xl flex items-center gap-8">
          {currentDialog.image && (
            <div className="flex-shrink-0">
              <img 
                src={currentDialog.image} 
                alt={currentDialog.name}
                className="w-96 h-96 object-contain drop-shadow-2xl"
              />
            </div>
          )}

          <Card className={`flex-1 p-8 ${characterStyles[currentDialog.character]} backdrop-blur-sm border-2`}>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="text-lg px-4 py-1">
                  {currentDialog.name}
                </Badge>
              </div>
              
              <p className="text-2xl leading-relaxed font-medium">
                {currentDialog.text}
              </p>

              <div className="flex justify-between items-center pt-4">
                <span className="text-sm opacity-70">
                  {currentDialogIndex + 1} / {scene.dialogs.length}
                </span>
                
                {!showChoices && (
                  <Button 
                    size="lg"
                    onClick={handleNext}
                    className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50"
                  >
                    {isLastDialog && scene.choices ? 'Выбрать действие' : 'Далее'}
                    <Icon name="ChevronRight" className="ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>

        {showChoices && scene.choices && (
          <div className="w-full max-w-4xl space-y-4">
            {scene.choices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => handleChoice(choice.nextScene)}
                className="w-full text-xl p-8 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 backdrop-blur-sm"
                size="lg"
              >
                {choice.text}
              </Button>
            ))}
          </div>
        )}

        {scene.isEnding && (
          <div className="w-full max-w-4xl space-y-4">
            <Button
              onClick={handleRestart}
              className="w-full text-xl p-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              size="lg"
            >
              <Icon name="RotateCcw" className="mr-3" />
              Начать заново
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
