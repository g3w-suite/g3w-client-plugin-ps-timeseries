import { name }       from './package.json';
import i18n           from './locales'
import ChartComponent from './components/Chart.vue'

const { Plugin, PluginService } = g3wsdk.core.plugin;
const { GUI }                   = g3wsdk.gui;
const { G3W_FID }               = g3wsdk.constant;

if (!globalThis.Plotly) {
  $script('https://cdn.plot.ly/plotly-1.52.2.min.js');
}

class Service extends PluginService {

  init(config = {}) {

    console.log(config);

    /**
     * @FIXME add description
     */
    this.config = config;

    /**
     * Store key and setter name method to eventually remove when plugin is removed
     * 
     * @type {{}}
     */
    this.keySetters = {};

    /**
     * Query result service
     */
    this.queryresultsService = GUI.getService('queryresults');

    /**
     * Match strings with the following pattern:
     * - starts with the letter "D"
     * - followed by 8 digits representing the date in the format "YYYYMMDD"
     */
    const DATE_REGEX = /^D\d{8}$/;

    const keyOnAfteraddActionsForLayers = this.queryresultsService.onafter('addActionsForLayers', (actions, layers) => {
      layers.forEach(layer => {
        if (!layer.attributes.filter(attr => DATE_REGEX.test(attr.name)).length) {
          return;
        }
        actions[layer.id].push({
          id: 'ps-timeseries',
          class: GUI.getFontClass('chart-line'),
          hint: 'Ps Timeseries',
          cbk: async (layer, feature) => {
            const Component   = Vue.extend(ChartComponent);
            const vueInstance = new Component({ propsData: { fid: feature.attributes[G3W_FID] } });
            const message     = vueInstance.$mount().$el;
            const dialog      = GUI.showModalDialog({ message, size: 'large' });
          }
        });
      });
    })

    this.keySetters[keyOnAfteraddActionsForLayers] = 'addActionsForLayers';
  }

  /**
   * Unlisten to setters events
   */
  clear() {
    Object
      .enties(this.keySetters)
      .forEach(([key, setter]) => this.queryresultsService.un(setter, key));
  }

}

new (class extends Plugin {
  constructor() {
    super({ name, i18n, service: new Service });
    console.log(this.config);
    if (this.registerPlugin(this.config.gid)) {
      this.service.init(this.config);
    }
    // hide loading icon on map
    this.setReady(true);
  }
})();