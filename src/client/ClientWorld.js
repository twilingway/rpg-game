class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
    });
  }

  init() {
    this.levelCfg.map.forEach((item, indexX) => {
      item.forEach((i, indexY) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', i[0][0]],
          frame: 0,
          x: (indexY * this.engine.canvas.width) / this.levelCfg.camera.width,
          y: (indexX * this.engine.canvas.width) / this.levelCfg.camera.width,
          w: this.engine.canvas.width / this.levelCfg.camera.width,
          h: this.engine.canvas.height / this.levelCfg.camera.height,
        });
      });
    });
  }
}

export default ClientWorld;
