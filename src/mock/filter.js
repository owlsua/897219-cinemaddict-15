const cardToFilterMap = {
  all: {
    name: 'All movies',
    count: (cards) => cards,
    active: true,
  },
  watchlist: {
    name: 'Watchlist',
    count: (cards) => cards
      .filter((card) => card.watchlist).length,
  },
  watched: {
    name: 'Watched',
    count: (cards) => cards
      .filter((card) => card.watched).length,
  },
  favorites: {
    name: 'Favorites',
    count: (cards) => cards
      .filter((card) => card.favorites).length,
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
