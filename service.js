import ChartComponent from './components/Chart.vue'

const {base, inherit} = g3wsdk.core.utils;
const {PluginService} = g3wsdk.core.plugin;
const {GUI}           = g3wsdk.gui;
const { G3W_FID }     = g3wsdk.constant;

function Service() {
  base(this);
  this.init = function(config={}) {
    console.log(config)
    this.config = config;
    /**
     * Object where store key and setter name method to eventually remove when plugin is removed
     * @type {{}}
     */
    this.keySetters = {};
    /**
     * Get Query result service
     */
    this.queryresultsService = GUI.getService('queryresults');

    const keyOnAfteraddActionsForLayers = this.queryresultsService.onafter('addActionsForLayers', (actions, layers) => {
      //FAKE id
      /**
       *
       * @TODO REMOVE
       */
      const layerId = 'test_1b5433f4_9459_4bd8_99c1_8a79da9e5043';

      if (layers.find(({id}) => id === layerId)) {
        actions[layerId].push({
          id: 'ps-timeseries',
          class: GUI.getFontClass('chart-line'),
          hint: 'Ps Timeseries',
          cbk: async (layer, feature) => {
            const Component = Vue.extend(ChartComponent);
            const vueInstance = new Component({
              propsData: {
                fid: feature.attributes[G3W_FID]
              }
            });
            const message = vueInstance.$mount().$el;
            const dialog = GUI.showModalDialog({
              message,
              size: 'large'
            })
          }
        })
      }
      /**
       * @TODO
       */
    })
    this.keySetters[keyOnAfteraddActionsForLayers] = 'addActionsForLayers';
  };

  /**
   * Clear
   */
  this.clear = function() {
    /**
     * Unlisten to setters call events
     */
    Object
      .enties(this.keySetters)
      .forEach(([key, setter]) => this.queryresultsService.un(setter, key));
  }
}

inherit(Service, PluginService);

module.exports = new Service;
