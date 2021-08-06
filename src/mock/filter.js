const cardToFilterMap = {
  all: {
    name: 'All movies',
    count: (cards) => cards,
    active: true,
  },
  watchlist: {
    name: 'Watchlist',
    count: (cards) => cards
      .filter((card) => card.watchlist),
  },
  watched: {
    name: 'Watched',
    count: (cards) => cards
      .filter((card) => card.watched),
  },
  favorites: {
    name: 'Favorites',
    count: (cards) => cards
      .filter((card) => card.favorites),
  },
};

export const generateFilter = (cards) => Object.entries(cardToFilterMap).map(
  ([key, card]) => ({
    key: key,
    name: card.name,
    count: card.count(cards),
    active: card.active,
  }),
);
