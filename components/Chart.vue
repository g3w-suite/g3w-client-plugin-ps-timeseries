<template>
  <div id="g3w-ps-timeseries-content">
    <bar-loader :loading="loading"/>
    <section id="ps-timeseries-chart" style="margin-top: 10px;">
        <div ref="chart"></div>
    </section>
  </div>
</template>

<script>
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
    const chart = await (await fetch(initConfig.baseurl + 'qps_timeseries/api/some-protected-view/' + this.fid)).json();
    Plotly.newPlot(this.$refs.chart, chart.data, chart.layout, chart.config);
    setTimeout(() => Plotly.Plots.resize(this.$refs.chart))
    this.loading = false;
  },

}
</script>