<template>
  <div id="g3w-ps-timeseries-content">
    <bar-loader :loading="loading"/>
    <section id="ps-timeseries-chart" style="margin-top: 10px;">
        <div ref="chart"></div>
    </section>
  </div>
</template>

<script>
const { resizeMixin } = g3wsdk.gui.vue.Mixins;

export default {
  name: "Chart",
  props: {
    fid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true, //need to show loading bar during get data from server
    }
  },
  mixins: [resizeMixin],
  methods: {
    /**
     * Resize method call when window is resized
     */
    resize() {
      Plotly.Plots.resize(this.$refs.chart)
    }
  },
  /*
  * Need to configure for resizeMixin
   */
  beforeCreate() {
    this.delayType = 'debounce';
  },
  async created() {
    //Fake Data
    this.chart = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data:  [
            {
              x: [
                '2013-08-04 22:23:00',
                '2013-09-04 22:23:00',
                '2013-10-04 22:23:00',
                '2013-11-04 22:23:00',
                '2013-12-04 22:23:00'],
              y: [4, 1, 7, 1, 4],
              mode: 'markers',
              type: 'scatter',
              name: 'Scatter',
              marker: { size: 5, color: 'black' }
            },
            {
              x: [
                '2013-08-04 22:23:00',
                '2013-09-04 22:23:00',
                '2013-10-04 22:23:00',
                '2013-11-04 22:23:00',
                '2013-12-04 22:23:00'],
              y: [3, 2, 1.5, 2, 4],
              mode: 'lines',
              name: 'Lin Trend',
              marker: {
                color: 'red'
              }
            }
          ],
          layout: {
            xaxis: {
              title: '[Date]',
              range: [ '2013-07-04 22:23:00', '2014-01-04 22:23:00' ]
            },
            yaxis: {
              title: '[mm]',
              range: [0, 8]
            },
            title:'Data Labels Hover'
          }
        })
      }, 1000)
    })
    Plotly.newPlot(this.$refs.chart, this.chart.data, this.chart.layout);
    //set loading to false
    this.loading = false;
  },
}
</script>

<style scoped></style>