const assets = {
  sprites: {
    stars: [
      {name: 'star1', src: 'star_1.png'},
      {name: 'star2', src: 'star_2.png'},
      {name: 'star3', src: 'star_3.png'},
    ],
    ships: [
      {name: 'default', src: 'default.png'},
    ],
  },
  getAll: function() {
    const _ = this;
    const allAssets = [];
    Object.keys(_).map((type) => {
      Object.keys(_[type]).map((cat) => {
        _[type][cat].map((asset) => {
          allAssets.push(`assets/${type}/${cat}/${asset.src}`);
        });
      });
    });
    return allAssets;
  },
};

module.exports = assets;
