<template>
  <div class="personal-attence bg-content">
    <search-wrapper
      :title="title"
      @search="searchPersonalAttence"
      @modeChange="modeChange"
    >
      <div slot="title-icon">
        <Icon type="md-stats" :size="16"></Icon>
      </div>
      <div slot="search-content">
        <Form ref="searchForm" :model="searchForm" :label-width="60" label-position="right">
          <Row>
            <Col span="12">
              <FormItem label="时间 ">
                <DatePicker
                  type="date"
                  placement="bottom-end"
                  confirm
                  clearable
                  style="width: 100%"
                  v-model="searchForm.date"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="时间段 ">
                <DatePicker
                  type="daterange"
                  placement="bottom-end"
                  split-panels
                  confirm
                  clearable
                  style="width: 100%"
                  v-model="searchForm.daterange"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="content">
        <Table :columns="attenceInfo" :data="showData" v-if="mode === 'table'"></Table>
        <bar-chart
          :chartSettings="chartSettings"
          :chartData1="barData1"
          :chartData2="barData2"
          v-if="mode === 'barChart'"
        >
        </bar-chart>
        <pie-chart
          :chartSettings="chartSettings"
          :chartData1="pieData1"
          :chartData2="pieData2"
          v-if="mode === 'pieChart'"
        >
        </pie-chart>
        <line-chart
          :chartSettings="chartSettings"
          :chartData1="lineData1"
          :chartData2="lineData2"
          v-if="mode === 'lineChart'"
        >
        </line-chart>
      </div>
      <div slot="page">
        <Page
          simple
          :page-size="20"
          :current="currentPage"
          :total="attenceData.length"
          @on-change="changePage"
          v-if="mode === 'table'"
        ></Page>
      </div>
    </search-wrapper>
  </div>
</template>

<script>
  import SearchWrapper from 'base/search-wrapper/search-wrapper';
  import {mapGetters} from 'vuex';
  import {getPersonalAttence} from 'api/worker-attence';
  import BarChart from 'base/bar-chart/bar-chart';
  import PieChart from 'base/pie-chart/pie-chart';
  import LineChart from 'base/line-chart/line-chart';
  import {getDayByMonth, getDayByHours} from 'common/js/chart';

  export default {
    name: 'PersonalAttence',
    computed: {
      showData() {
        let startIndex = (this.currentPage - 1) * 20;
        if (this.currentPage * 20 <= this.attenceData.length) {
          return this.attenceData.slice(startIndex, startIndex + 20);
        } else {
          return this.attenceData.slice(startIndex);
        }
      },
      barData1() {
        return {
          columns: ['month', 'days'],
          rows: getDayByMonth(this.attenceData)
        };
      },
      barData2() {
        return {
          columns: ['hour', 'days'],
          rows: getDayByHours(this.attenceData)
        };
      },
      pieData1() {
        return {
          columns: ['month', 'days'],
          rows: getDayByMonth(this.attenceData)
        };
      },
      pieData2() {
        return {
          columns: ['hour', 'days'],
          rows: getDayByHours(this.attenceData)
        };
      },
      lineData1() {
        return {
          columns: ['month', 'days'],
          rows: getDayByMonth(this.attenceData)
        };
      },
      lineData2() {
        return {
          columns: ['hour', 'days'],
          rows: getDayByHours(this.attenceData)
        };
      },
      ...mapGetters([
        'user'
      ])
    },
    created() {
      this._getPersonalAttence();
    },
    data() {
      return {
        title: '个人考勤',
        currentPage: 1,
        mode: 'table',
        searchForm: {
          date: '',
          daterange: []
        },
        attenceInfo: [
          {
            title: '签到时间',
            key: 'time1',
            align: 'center'
          },
          {
            title: '签退时间',
            key: 'time2',
            align: 'center'
          }
        ],
        attenceData: [],
        chartSettings: {
          labelMap: {
            days: '天数'
          }
        }
      };
    },
    methods: {
      searchPersonalAttence() {
        this._getPersonalAttence();
      },
      modeChange(mode) {
        this.mode = mode;
      },
      changePage(currentPage) {
        this.currentPage = currentPage;
      },
      _getPersonalAttence() {
        setTimeout(() => {
          getPersonalAttence(this.searchForm, this.user).then(res => {
            this.currentPage = 1;
            this.attenceData = res.reverse() || [];
          });
        }, 200);
      }
    },
    components: {
      SearchWrapper,
      BarChart,
      PieChart,
      LineChart
    }
  };
</script>

<style lang="stylus" scoped>
  .personal-attence
    min-height: 100%
</style>
