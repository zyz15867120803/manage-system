<template>
  <div ref="chartWrapper">
    <ve-histogram
      ref="barChart1"
      :data="chartData1"
      :settings="chartSettings"
      v-if="chartData1.rows.length"
    ></ve-histogram>
    <ve-histogram
      ref="barChart2"
      :data="chartData2"
      :settings="chartSettings"
      v-if="chartData2.rows.length"
    ></ve-histogram>
    <ve-histogram
      ref="barChart3"
      :data="chartData3"
      :settings="chartSettings"
      v-if="chartData3.rows.length"
    ></ve-histogram>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'BarChart',
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
        this.$refs.barChart1 && this.$refs.barChart1.resize({width: this.$refs.chartWrapper.offsetWidth});
        this.$refs.barChart2 && this.$refs.barChart2.resize({width: this.$refs.chartWrapper.offsetWidth});
        this.$refs.barChart3 && this.$refs.barChart3.resize({width: this.$refs.chartWrapper.offsetWidth});
      }
    }
  };
</script>

<style scoped>

</style>
