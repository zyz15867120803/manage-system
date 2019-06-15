<template>
  <div ref="chartWrapper">
    <ve-pie
      ref="pieChart1"
      :data="chartData1"
      :settings="chartSettings"
      v-if="chartData1.rows.length"
    ></ve-pie>
    <ve-pie
      ref="pieChart2"
      :data="chartData2"
      :settings="chartSettings"
      v-if="chartData2.rows.length"
    ></ve-pie>
    <ve-pie
      ref="pieChart3"
      :data="chartData3"
      :settings="chartSettings"
      v-if="chartData3.rows.length"
    ></ve-pie>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'PieChart',
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
        this.$refs.pieChart1 && this.$refs.pieChart1.resize({width: this.$refs.chartWrapper.offsetWidth});
        this.$refs.pieChart2 && this.$refs.pieChart2.resize({width: this.$refs.chartWrapper.offsetWidth});
        this.$refs.pieChart3 && this.$refs.pieChart3.resize({width: this.$refs.chartWrapper.offsetWidth});
      }
    }
  };
</script>

<style scoped>

</style>
