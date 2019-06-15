<template>
  <div class="worker-info bg-content">
    <search-wrapper @search="searchWorker" @modeChange="modeChange">
      <div slot="title-icon">
        <Icon type="md-person" :size="14"></Icon>
      </div>
      <div slot="title-btn">
        <Button type="primary" icon="md-add" @click="addWorker">添加员工</Button>
      </div>
      <div slot="search-content">
        <Form ref="searchForm" :model="searchForm" :rules="searchRules" :label-width="50" label-position="right">
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
                  <Option value="">全部</Option>
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
          </Row>
        </Form>
      </div>
      <div slot="content">
        <Table :columns="workerInfo" :data="showData" v-if="mode === 'table'">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" @click="reviseWorker(index)">修改</Button>
            <Poptip
              confirm
              transfer
              title="确认删除该员工吗?"
              placement="bottom-end"
              @on-ok="deleteWorker(index)"
            >
              <Button type="error" size="small">删除</Button>
            </Poptip>
          </template>
        </Table>
        <bar-chart
          :chartSettings="chartSettings"
          :chartData1="barData1"
          :chartData2="barData2"
          v-if="mode === 'barChart'"
        ></bar-chart>
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
          v-if="mode === 'table'"
          simple
          :page-size="20"
          :current="currentPage"
          :total="workersData.length"
          @on-change="changePage"
        ></Page>
      </div>
    </search-wrapper>
    <add-modal ref="addModal" @confirmAdd="confirmAdd"></add-modal>
    <revise-modal
      ref="reviseModal"
      :title="title"
      :reviseData="workerData"
      @confirmRevise="confirmRevise"
    ></revise-modal>
  </div>
</template>

<script>
  import SearchWrapper from 'base/search-wrapper/search-wrapper';
  import AddModal from 'base/add-modal/add-modal';
  import ReviseModal from 'base/revise-modal/revise-modal';
  import {getWorkerInfo, addWorkerInfo, reviseWorkerInfo, deleteWorkerInfo} from 'api/worker-manage';
  import BarChart from 'base/bar-chart/bar-chart';
  import PieChart from 'base/pie-chart/pie-chart';
  import LineChart from 'base/line-chart/line-chart';
  import {getNumByAge, getNumBySex, getTotalNumByAge} from 'common/js/chart';

  export default {
    name: 'WorkerInfo',
    created() {
      this._getWorkerInfo(this.searchForm);
    },
    computed: {
      showData() {
        let startIndex = (this.currentPage - 1) * 20;
        if (this.currentPage * 20 <= this.workersData.length) {
          return this.workersData.slice(startIndex, startIndex + 20);
        } else {
          return this.workersData.slice(startIndex);
        }
      },
      barData1() {
        return {
          columns: ['age', 'totalNum', 'maleNum', 'femaleNum'],
          rows: getNumByAge(this.workersData)
        };
      },
      barData2() {
        return {
          columns: ['sex', 'totalNum'],
          rows: getNumBySex(this.workersData)
        };
      },
      pieData1() {
        return {
          columns: ['age', 'totalNum'],
          rows: getTotalNumByAge(this.workersData)
        };
      },
      pieData2() {
        return {
          columns: ['sex', 'totalNum'],
          rows: getNumBySex(this.workersData)
        };
      },
      lineData1() {
        return {
          columns: ['age', 'totalNum', 'maleNum', 'femaleNum'],
          rows: getNumByAge(this.workersData)
        };
      },
      lineData2() {
        return {
          columns: ['sex', 'totalNum'],
          rows: getNumBySex(this.workersData)
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
        title: '修改员工信息',
        currentPage: 1,
        mode: 'table',
        searchForm: {
          name: '',
          sex: '',
          age: '',
          minAge: '',
          maxAge: ''
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
        workerInfo: [
          {
            title: '用户名',
            key: 'userName',
            align: 'center'
          },
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
            title: '手机',
            key: 'phone',
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            align: 'center'
          }
        ],
        workersData: [],
        workerData: {},
        chartSettings: {
          labelMap: {
            totalNum: '总人数',
            maleNum: '男性人数',
            femaleNum: '女性人数'
          }
        }
      };
    },
    methods: {
      addWorker() {
        this.$refs.addModal.show();
      },
      confirmAdd(addData) {
        addWorkerInfo(addData).then(res => {
          if (res.stat === 'true') {
            this._getWorkerInfo({
              name: '',
              sex: '',
              age: '',
              minAge: '',
              maxAge: ''
            });
            this.$Message.success({
              content: '添加员工成功',
              duration: 2
            });
          } else if (res.stat === 'false') {
            this.$Message.error({
              content: '添加失败，用户名已存在',
              duration: 2
            });
          }
        });
      },
      confirmRevise(revisedData) {
        reviseWorkerInfo(revisedData).then(res => {
          if (res.stat === 'true') {
            let index = this.workersData.findIndex(item => {
              return item.id === this.workerData.id;
            });
            let workerTemp = res.emp[0];
            if (workerTemp.sex === true) {
              workerTemp.sex = 'male';
            } else if (workerTemp.sex === false) {
              workerTemp.sex = 'female';
            } else {
              workerTemp.sex = '';
            }
            this.workersData.splice(index, 1, workerTemp);
            this.$Message.success({
              content: '修改信息成功',
              duration: 2
            });
          } else if (res.stat === 'false') {
            this.$Message.error({
              content: '修改信息失败',
              duration: 2
            });
          }
        });
      },
      searchWorker() {
        this._getWorkerInfo(this.searchForm);
      },
      reviseWorker(index) {
        this.workerData = this.workersData[index];
        this.$refs.reviseModal.show();
      },
      deleteWorker(index) {
        deleteWorkerInfo(this.workersData[index]).then(res => {
          if (res.stat === 'true') {
            this.workersData.splice(index, 1);
            this.$Message.success({
              content: '成功删除该员工',
              duration: 2
            });
          } else if (res.stat === 'false') {
            this.$Message.error({
              content: '删除失败',
              duration: 2
            });
          } else if (res.stat === 'error') {
            this.$Message.error({
              content: '无操作权限',
              duration: 2
            });
          }
        });
      },
      modeChange(mode) {
        this.mode = mode;
      },
      changePage(currentPage) {
        this.currentPage = currentPage;
      },
      _getWorkerInfo(searchOptions) {
        getWorkerInfo(searchOptions).then(res => {
          let workersTemp = res;
          if (workersTemp instanceof Array) {
            workersTemp = workersTemp.map(item => {
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
          this.workersData = workersTemp.reverse();
        });
      }
    },
    components: {
      SearchWrapper,
      AddModal,
      ReviseModal,
      BarChart,
      PieChart,
      LineChart
    }
  };
</script>

<style lang="stylus" scoped>
  .worker-info
    min-height: 100%
    .age-text
      font-size: 20px
      text-align: center
</style>
