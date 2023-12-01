const {base, inherit} = g3wsdk.core.utils;
const {PluginService} = g3wsdk.core.plugin;
const {GUI} = g3wsdk.gui;

function Service() {
  base(this);
  this.init = function(config={}) {
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
    /**
     * HERE CODE TO LISTEN AND REGISTER QUERY RESULTS SERVICE SETTERS CALL
     *
     * ES. setQueryResponse
     *
     * const keyOnAfterSetQueryResponse = this.queryresultsService.onafter('setQueryResponse', ()=>{CODE HERE})
     * this.keySetters[keyOnAfterSetQueryResponse] = 'setQueryResponse'
     *
     */
  };

  this.clear = function() {
    /**
     * Unlisten to setters call events
     */
    Object.enties(this.keySetters).forEach(([key, setter]) => this.queryresultsService.un(setter, key));
  }
}

inherit(Service, PluginService);

module.exports = new Service;
