<template>
  <div id="g3w-ps-timeseries-content">
    <bar-loader :loading="loading"/>
    <section id="ps-timeseries-chart" style="margin-top: 10px;">
        <div ref="chart"></div>
    </section>
  </div>
</template>

<script>
// const { XHR }      = g3wsdk.core.utils;

// Fake Data
const XHR = {
  get: async function(url) {
    console.log(url);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data:  [
              {
                x: [
                  '2013-08-04 22:23:00',
                  '2013-09-04 22:23:00',
                  '2013-10-04 22:23:00',
                  '2013-11-04 22:23:00',
                  '2013-12-04 22:23:00',
                ],
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
                  '2013-12-04 22:23:00',
                ],
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
            },
            config: {
              displayModeBar: true,
              editable: true,
              responsive: true,
              scrollZoom: true
            }
          })
        }, 1000)
      });
  },
};

export default {

  name: "Chart",

  props: {
    fid: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: true, // show loading bar while getting data from server
    }
  },

  async created() {
    const chart = await XHR.get('path/to/' + this.fid);
    Plotly.newPlot(this.$refs.chart, chart.data, chart.layout, chart.config);
    this.loading = false;
  },

}
</script>

<style scoped></style>