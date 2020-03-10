const globalInfographic01Config = require("../../configs/info_graphic_01_01/config");
const renderer = require("./generic");

var globalConfig = globalInfographic01Config.config_01_02;

module.exports = {
  draw: async (canvasAdaptor, trip) => {
    await renderer.renderInfographic(canvasAdaptor, globalConfig, trip);
  }
};