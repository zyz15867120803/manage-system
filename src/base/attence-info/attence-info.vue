<template>
  <div class="attence-info bg-content">
    <search-wrapper @search="searchWorkerAttence" @modeChange="modeChange" :title="title">
      <div slot="title-icon">
        <Icon type="md-stats" :size="16"></Icon>
      </div>
      <div slot="search-content">
        <Form ref="searchForm" :model="searchForm" :rules="searchRules" :label-width="60" label-position="right">
          <Row>
            <Col span="12">
              <FormItem label="姓名 ">
                <Input v-model="searchForm.name" clearable>
                </Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="性别 ">
                <Select v-model="searchForm.sex" placeholder="请输入性别">
                  <Option value="all">全部</Option>
                  <Option value="male">男</Option>
                  <Option value="female">女</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem prop="age" label="年龄 ">
                <Input v-model="searchForm.age">
                </Input>
              </FormItem>
            </Col>
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
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="年龄段 ">
                <Row>
                  <Col span="11">
                    <FormItem prop="minAge" :label-width="0">
                      <Input v-model="searchForm.minAge"></Input>
                    </FormItem>
                  </Col>
                  <Col span="2" class="age-text">~</Col>
                  <Col span="11">
                    <FormItem prop="maxAge" :label-width="0">
                      <Input v-model="searchForm.maxAge"></Input>
                    </FormItem>
                  </Col>
                </Row>
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
          :chartData3="barData3"
          v-if="mode === 'barChart'"
        ></bar-chart>
        <pie-chart
          :chartSettings="chartSettings"
          :chartData1="pieData1"
          :chartData2="pieData2"
          :chartData3="pieData3"
          v-if="mode === 'pieChart'"
        >
        </pie-chart>
        <line-chart
          :chartSettings="chartSettings"
          :chartData1="lineData1"
          :chartData2="lineData2"
          :chartData3="lineData3"
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
  import {getWorkersAttence} from 'api/manager-attence';
  import BarChart from 'base/bar-chart/bar-chart';
  import PieChart from 'base/pie-chart/pie-chart';
  import LineChart from 'base/line-chart/line-chart';
  import {getDayByMonthEveryone, getDayByHourAndSex, getDayByPersonAndMonth} from 'common/js/chart';

  export default {
    name: 'AttenceInfo',
    created() {
      this._getWorkersAttence();
    },
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
          columns: ['month', 'aveDays', 'aveDaysOfMale', 'aveDaysOfFemale'],
          rows: getDayByMonthEveryone(this.attenceData)
        };
      },
      barData2() {
        return {
          columns: ['hour', 'totalNum', 'maleNum', 'femaleNum'],
          rows: getDayByHourAndSex(this.attenceData)
        };
      },
      barData3() {
        return {
          columns: ['sex', 'aveDaysByPersonAndMonth'],
          rows: getDayByPersonAndMonth(this.attenceData)
        };
      },
      pieData1() {
        return {
          columns: ['month', 'aveDays'],
          rows: getDayByMonthEveryone(this.attenceData)
        };
      },
      pieData2() {
        return {
          columns: ['hour', 'totalNum'],
          rows: getDayByHourAndSex(this.attenceData)
        };
      },
      pieData3() {
        return {
          columns: ['sex', 'aveDaysByPersonAndMonth'],
          rows: getDayByPersonAndMonth(this.attenceData)
        };
      },
      lineData1() {
        return {
          columns: ['month', 'aveDays', 'aveDaysOfMale', 'aveDaysOfFemale'],
          rows: getDayByMonthEveryone(this.attenceData)
        };
      },
      lineData2() {
        return {
          columns: ['hour', 'totalNum', 'maleNum', 'femaleNum'],
          rows: getDayByHourAndSex(this.attenceData)
        };
      },
      lineData3() {
        return {
          columns: ['sex', 'aveDaysByPersonAndMonth'],
          rows: getDayByPersonAndMonth(this.attenceData)
        };
      }
    },
    data() {
      const ageValidate = (rule, value, callback) => {
        if (!value) {
          callback();
        } else if (isNaN(value)) {
          callback(new Error('请输入数值'));
        } else if (!(/^[2-5][0-9]$/.test(value))) {
          callback(new Error('输入的年龄不在范围内'));
        } else {
          callback();
        }
      };
      const minAgeValidate = (rule, value, callback) => {
        if (!value) {
          callback();
        } else if (isNaN(value)) {
          callback(new Error('请输入数值'));
        } else if (!(/^[2-5][0-9]$/.test(value))) {
          callback(new Error('输入的年龄不在范围内'));
        } else if (this.searchForm.maxAge && value > this.searchForm.maxAge) {
          callback(new Error('您选择的年龄范围错误'));
        } else {
          callback();
        }
      };
      const maxAgeValidate = (rule, value, callback) => {
        if (!value) {
          callback();
        } else if (isNaN(value)) {
          callback(new Error('请输入数值'));
        } else if (!(/^[2-5][0-9]$/.test(value))) {
          callback(new Error('输入的年龄不在范围内'));
        } else if (this.searchForm.minAge && value < this.searchForm.minAge) {
          callback(new Error('您选择的年龄范围错误'));
        } else {
          callback();
        }
      };

      return {
        title: '考勤详情',
        currentPage: 1,
        mode: 'table',
        searchForm: {
          name: '',
          sex: '',
          age: '',
          date: '',
          minAge: '',
          maxAge: '',
          daterange: []
        },
        searchRules: {
          age: [
            {
              validator: ageValidate,
              trigger: 'change'
            }
          ],
          minAge: [
            {
              validator: minAgeValidate,
              trigger: 'change'
            }
          ],
          maxAge: [
            {
              validator: maxAgeValidate,
              trigger: 'change'
            }
          ]
        },
        attenceInfo: [
          {
            title: '姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '性别',
            key: 'sex',
            align: 'center'
          },
          {
            title: '年龄',
            key: 'age',
            align: 'center'
          },
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
            aveDays: '人均考勤天数',
            aveDaysOfMale: '男性人均考勤天数',
            aveDaysOfFemale: '女性人均考勤天数',
            totalNum: '考勤人数',
            maleNum: '男性考勤人数',
            femaleNum: '女性考勤人数',
            aveDaysByPersonAndMonth: '平均每人每月考勤天数'
          }
        }
      };
    },
    methods: {
      searchWorkerAttence() {
        this._getWorkersAttence();
      },
      modeChange(mode) {
        this.mode = mode;
      },
      changePage(currentPage) {
        this.currentPage = currentPage;
      },
      _getWorkersAttence() {
        getWorkersAttence(this.searchForm).then(res => {
          let attenceTemp = res;
          if (attenceTemp instanceof Array) {
            attenceTemp = attenceTemp.map(item => {
              if (item.sex === true) {
                item.sex = 'male';
              } else if (item.sex === false) {
                item.sex = 'female';
              } else {
                item.sex = '';
              }
              return item;
            });
          }
          this.currentPage = 1;
          this.attenceData = attenceTemp.reverse();
        });
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
  .attence-info
    min-height: 100%
    .age-text
      font-size: 20px
      text-align: center
</style>
