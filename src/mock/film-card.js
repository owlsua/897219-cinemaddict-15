import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateTitle = () => {
  const titles = [
    'Made for each other',
    'Popeye meets sinbad',
    'Sagebrush trail',
    'Santa claus conquers the martians',
    'The dance of life',
    'The-great-flamarion',
    'The-man-with-the-golden-arm',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateImage = () => {
  const images = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, images.length - 1);

  return images[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const n = getRandomInteger(1, 5);
  const description = descriptions.sort(() => Math.random() - Math.random()).slice(0, n).join(', ');

  return description;
};

const generateWritters = () => {
  const writters = [
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
    'Daniel Ortega',
    'Tyrone Tate',
    'Blossom Sharp',
    'Simona Green',
  ];

  const n = getRandomInteger(2, 7);
  const writter = writters.sort(() => Math.random() - Math.random()).slice(0, n).join(', ');

  return writter;
};

const generateGenres = () => {
  const genres = [
    'Drama',
    'Film-Noir',
    'Mystery',
    'Fantasy',
    'Horror',
    'Romance',
    'Thriller',
  ];

  const n = getRandomInteger(1, 3);
  const genre = genres.sort(() => Math.random() - Math.random()).slice(0, n);

  return genre;
};

const generateDate = () => {
  const dates = [
    '10 April 1994',
    '22 September 1989',
    '14 October 2001',
    '01 July 1996',
    '07 June 1990',
  ];

  const randomIndex = getRandomInteger(0, dates.length - 1);

  return dates[randomIndex];
};

const generateName = () => {
  const names = [
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
    'Daniel Ortega',
    'Tyrone Tate',
    'Blossom Sharp',
    'Simona Green',
  ];

  const randomIndex = getRandomInteger(0, names.length - 1);

  return names[randomIndex];
};

const generateEmotion = () => {
  const emotions = ['smile', 'sleeping', 'puke', 'angry'];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generateCoomentDate = () => {
  const dates = [
    '2019-05-11T16:12:32.554Z',
    '2021-06-11T16:12:32.554Z',
    '2021-08-06T16:12:32.554Z',
    '2020-03-11T16:12:32.554Z',
    '2021-03-12T16:12:32.554Z',
    '2020-01-18T16:12:32.554Z',
    '2021-04-16T16:12:32.554Z',
  ];

  const randomIndex = getRandomInteger(0, dates.length - 1);

  return dates[randomIndex];
};

const generateComment = () => ({
  id: getRandomInteger(1, 40),
  author: generateName(),
  comment: generateDescription(),
  date: dayjs(generateCoomentDate()).format('DD/MM/YYYY HH:mm'),
  emotion: generateEmotion(),
});

const generateComments = () => {
  const comments = new Array(getRandomInteger(1, 5)).fill().map(generateComment);

  const n = getRandomInteger(0, 5);
  const comment = comments.sort(() => Math.random() - Math.random()).slice(0, n);

  return comment;
};

export const generateFilmCard = () => ({
  title: generateTitle(),
  originalName: generateTitle(),
  image: generateImage(),
  rating: getRandomInteger(1, 10),
  director: generateWritters(),
  writters: generateWritters(),
  actors: generateWritters(),
  releaseDate: generateDate(),
  duration: '1h 18min',
  country: 'USA',
  age: '18',
  genres: generateGenres(),
  description: generateDescription(),
  watchlist: getRandomInteger(0, 1),
  watched: getRandomInteger(0, 1),
  favorites: getRandomInteger(0, 1),
  comments: generateComments(),
});


