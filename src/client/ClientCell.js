/* eslint-disable implicit-arrow-linebreak */
import PositionedObject from '../common/PositionedObject';
import ClientGameObject from './ClientGameObject';

class ClientCell extends PositionedObject {
  constructor(cfg) {
    super();
    const { cellWidth, cellHeight } = cfg.world;

    Object.assign(
      this,
      {
        cfg,
        objects: [],
        x: cellWidth * cfg.cellCol,
        y: cellWidth * cfg.cellRow,
        width: cellWidth,
        height: cellHeight,
      },
      cfg,
    );

    this.initGameObjects();
  }

  initGameObjects() {
    const { cellCfg } = this;

    // this.objects = cellCfg[0].map(
    //   // eslint-disable-next-line object-curly-newline
    //   (objCfg) => new ClientGameObject({ cell: this, objCfg }),
    // );
    this.objects = cellCfg.map(
      (layer, layerId) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        layer.map(
          (objCfg) => new ClientGameObject({ cell: this, objCfg, layerId }),
        ),
      // eslint-disable-next-line function-paren-newline
    );
  }

  render(time, layerId) {
    const { objects } = this;

    if (objects[layerId]) {
      objects[layerId].forEach((obj) => obj.render(time));
    }
  }

  addGameObject(objToAdd) {
    const { objects } = this;
    if (objToAdd.layerId === undefined) {
      // eslint-disable-next-line no-param-reassign
      objToAdd.layerId = objects.length;
    }

    if (!objects[objToAdd.layerId]) {
      objects[objToAdd.layerId] = [];
    }

    objects[objToAdd.layerId].push(objToAdd);
  }

  removeGameObject(objToRemove) {
    // this.objects = this.objects.filter((obj) => obj !== objToRemove);
    const { objects } = this;
    this.objects.forEach(
      // eslint-disable-next-line no-return-assign
      (layer, layerId) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        (objects[layerId] = layer.filter((obj) => obj !== objToRemove)),
    );
  }

  findObjectsByType(type) {
    let foundObjects = [];
    this.objects.forEach(
      // eslint-disable-next-line no-return-assign
      (layer) =>
        (foundObjects = [...foundObjects, ...layer].filter(
          (obj) => obj.type === type,
        )),
    );
    return foundObjects;
  }
}

export default ClientCell;
