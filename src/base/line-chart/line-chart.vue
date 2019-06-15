<template>
  <div ref="chartWrapper">
    <ve-line
      ref="lineChart1"
      :data="chartData1"
      :settings="chartSettings"
      v-if="chartData1.rows.length"
    ></ve-line>
    <ve-line
      ref="lineChart2"
      :data="chartData2"
      :settings="chartSettings"
      v-if="chartData2.rows.length"
    ></ve-line>
    <ve-line
      ref="lineChart3"
      :data="chartData3"
      :settings="chartSettings"
      v-if="chartData3.rows.length"
    ></ve-line>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'LineChart',
    props: {
      chartSettings: {
        type: Object,
        default() {
          return {};
        }
      },
      chartData1: {
        type: Object,
        default() {
          return {
            columns: [],
            rows: []
          };
        }
      },
      chartData2: {
        type: Object,
        default() {
          return {
            columns: [],
            rows: []
          };
        }
      },
      chartData3: {
        type: Object,
        default() {
          return {
            columns: [],
            rows: []
          };
        }
      }
    },
    computed: {
      ...mapGetters([
        'isCollapsed'
      ])
    },
    watch: {
      isCollapsed() {
        this.$refs.lineChart1 && this.$refs.lineChart1.resize({width: this.$refs.chartWrapper.offsetWidth});
        this.$refs.lineChart2 && this.$refs.lineChart2.resize({width: this.$refs.chartWrapper.offsetWidth});
        this.$refs.lineChart3 && this.$refs.lineChart3.resize({width: this.$refs.chartWrapper.offsetWidth});
      }
    }
  };
</script>

<style scoped>

</style>
