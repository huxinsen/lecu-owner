<template>
  <div class="shop-list">
    <!-- 我的店铺 -->
    <h4>我的店铺</h4>
    <el-table :data="shopList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="店铺名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <span>{{ props.row.notice }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.tel }}</span>
            </el-form-item>
            <el-form-item label="营业时间">
              <span>{{ props.row.time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" prop="name"></el-table-column>
      <el-table-column label="店铺地址" prop="address"></el-table-column>
      <el-table-column label="店铺介绍" prop="notice"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="success" @click="handleAdd(scope.$index, scope.row)">添加商品</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 审核中 -->
    <h4 v-if="shopCheckingList.length > 0">审核中</h4>
    <el-table v-if="shopCheckingList.length > 0" :data="shopCheckingList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="店铺名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <span>{{ props.row.notice }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.tel }}</span>
            </el-form-item>
            <el-form-item label="营业时间">
              <span>{{ props.row.time }}</span>
            </el-form-item>
            <el-form-item label="店铺法人">
              <span>{{ props.row.legalRepr }}</span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{ props.row.idNumber }}</span>
            </el-form-item>
            <el-form-item label="店铺头像">
              <img
                v-if="props.row.shopImg"
                :src="baseImgUploadedPath + props.row.shopImg"
                class="pic"
              />
            </el-form-item>
            <el-form-item label="营业执照">
              <img
                v-if="props.row.licenseImg"
                :src="baseImgUploadedPath + props.row.licenseImg"
                class="pic"
              />
            </el-form-item>
            <el-form-item label="身份证正">
              <img
                v-if="props.row.withIdFrontImg"
                :src="baseImgUploadedPath + props.row.withIdFrontImg"
                class="pic"
              />
            </el-form-item>
            <el-form-item label="身份证反">
              <img
                v-if="props.row.withIdBackImg"
                :src="baseImgUploadedPath + props.row.withIdBackImg"
                class="pic"
              />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" prop="name"></el-table-column>
      <el-table-column label="店铺地址" prop="address"></el-table-column>
      <el-table-column label="店铺介绍" prop="notice"></el-table-column>
    </el-table>
    <!-- 待修改 -->
    <h4 v-if="shopToBeList.length > 0">待修改</h4>
    <el-table v-if="shopToBeList.length > 0" :data="shopToBeList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="店铺名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <span>{{ props.row.notice }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.tel }}</span>
            </el-form-item>
            <el-form-item label="营业时间">
              <span>{{ props.row.time }}</span>
            </el-form-item>
            <el-form-item label="店铺法人">
              <span>{{ props.row.legalRepr }}</span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{ props.row.idNumber }}</span>
            </el-form-item>
            <el-form-item label="店铺头像">
              <img
                v-if="props.row.shopImg"
                :src="baseImgUploadedPath + props.row.shopImg"
                class="pic"
              />
            </el-form-item>
            <el-form-item label="营业执照">
              <img
                v-if="props.row.licenseImg"
                :src="baseImgUploadedPath + props.row.licenseImg"
                class="pic"
              />
            </el-form-item>
            <el-form-item label="身份证正">
              <img
                v-if="props.row.withIdFrontImg"
                :src="baseImgUploadedPath + props.row.withIdFrontImg"
                class="pic"
              />
            </el-form-item>
            <el-form-item label="身份证反">
              <img
                v-if="props.row.withIdBackImg"
                :src="baseImgUploadedPath + props.row.withIdBackImg"
                class="pic"
              />
            </el-form-item>
            <el-form-item label="修改建议">
              <span>{{ props.row.checkMsg }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" prop="name"></el-table-column>
      <el-table-column label="店铺地址" prop="address"></el-table-column>
      <el-table-column label="店铺介绍" prop="notice"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handleAlter(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Form -->
    <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="alterForm" :rules="rules" ref="alterForm">
        <el-form-item label="店铺名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="alterForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" :label-width="formLabelWidth" prop="address">
          <el-input
            id="update-address"
            v-model.lazy="alterForm.address"
            auto-complete="off"
            placeholder="请填写详细地址"
            @blur="updateLocation"
          ></el-input>
        </el-form-item>
        <el-form-item label="店铺介绍" :label-width="formLabelWidth">
          <el-input v-model="alterForm.notice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="tel">
          <el-input v-model="alterForm.tel" auto-complete="off" maxlength="13"></el-input>
        </el-form-item>
        <el-form-item label="营业时间" :label-width="formLabelWidth">
          <el-time-select
            placeholder="起始时间"
            v-model="startTime"
            :picker-options="{start: '05:30', step: '00:15', end: '23:30'}"
          ></el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="endTime"
            :picker-options="{start: '05:30', step: '00:15', end: '23:30', minTime: startTime}"
          ></el-time-select>
        </el-form-item>
        <el-form-item label="上传店铺头像" :label-width="formLabelWidth" required>
          <el-upload
            class="pic-uploader"
            :action="addImgAction"
            :show-file-list="false"
            :on-success="handleShopAvatarScucess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="alterForm.shopImg" :src="baseImgPath + alterForm.shopImg" class="pic" />
            <i v-else class="el-icon-plus pic-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('alterForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addImgAction, baseImgUploadedPath, baseImgTmpPath } from '@/config/env'
import { getLocation } from '@/api/lbs'
import { getShops, updateShop } from '@/api/shop'
export default {
  data() {
    return {
      dialogFormVisible: false,
      alterForm: {},
      rules: {
        name: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入店铺地址', trigger: 'blur' },
        ],
        tel: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
      },
      formLabelWidth: '120px',
      shopList: [],
      shopCheckingList: [],
      shopToBeList: [],
      startTime: '',
      endTime: '',
      baseImgUploadedPath,
      baseImgTmpPath,
      addImgAction,
      baseImgPath: baseImgUploadedPath,
    }
  },
  computed: {
    ...mapGetters(['username']),
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      if (this.username) {
        // 我的店铺
        getShops(this.username, 'full')
          .then(res => {
            this.shopList = res.data
          })
          .catch(err => {
            this.$notify.error({
              title: '失败',
              message: '系统出错，请重试!',
            })
          })
        // 审核中
        getShops(this.username, 'checking')
          .then(res => {
            this.shopCheckingList = res.data
          })
          .catch(err => {
            this.$notify.error({
              title: '失败',
              message: '系统出错，请重试!',
            })
          })
        // 待修改
        getShops(this.username, 'toBeChecked')
          .then(res => {
            this.shopToBeList = res.data
          })
          .catch(err => {
            this.$notify.error({
              title: '失败',
              message: '系统出错，请重试!',
            })
          })
      }
    },
    // 对象复制
    clone(myObj) {
      if (typeof myObj !== 'object') {
        return myObj
      }
      if (myObj == null) {
        return myObj
      }
      let myNewObj = {}
      for (let i in myObj) {
        myNewObj[i] = this.clone(myObj[i])
      }
      return myNewObj
    },
    // 编辑
    handleEdit(index, row) {
      this.alterForm = this.clone(row)
      let times = row.time.split('/')
      this.startTime = times[0]
      this.endTime = times[1]
      this.dialogFormVisible = true
    },
    // 添加商品
    handleAdd(index, row) {
      this.$router.push({
        name: '添加商品',
        params: {
          shopId: row.shopId,
        },
      })
    },
    // 修改商铺信息
    handleAlter(index, row) {
      this.$router.push({
        name: '添加商铺',
        params: row,
      })
    },
    // 上传成功
    handleShopAvatarScucess(res, file) {
      if (res.success) {
        this.baseImgPath = this.baseImgTmpPath
        // 记录之前图片
        this.alterForm.preImg = this.alterForm.shopImg
        this.alterForm.shopImg = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    // 上传检查
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isRightType) {
        this.$notify.error({
          title: '失败',
          message: '上传图片只能是 JPG、PNG 和 GIF 格式!',
        })
      }
      if (!isLt2M) {
        this.$notify.error({
          title: '失败',
          message: '上传图片大小不能超过 2MB!',
        })
      }
      return isRightType && isLt2M
    },
    // 关闭对话框
    handleClose() {
      this.dialogFormVisible = false
      this.baseImgPath = this.baseImgUploadedPath
      this.alterForm = {}
    },
    // 点击取消
    handleCancel() {
      this.handleClose()
    },
    // 更新经纬度信息
    updateLocation() {
      if (this.alterForm.address) {
        getLocation(this.alterForm.address).then(res => {
          if (res.data.success) {
            let location = res.data.location
            let params = location.split(',')
            this.alterForm.lng = params[0]
            this.alterForm.lat = params[1]
          } else {
            this.$notify.info({
              title: '提示',
              message: '地址经纬度获取失败，重新输入试试！',
            })
          }
        })
      }
    },
    // 确定修改
    submitForm(formName) {
      // 失去焦点触发地址信息更新
      let addressInput = document.getElementById('update-address')
      addressInput.blur()
      // 检查图片是否上传成功
      if (!this.alterForm.shopImg) {
        this.$notify.info({
          title: '提示',
          message: '必须按要求上传图片!',
        })
        return
      }
      this.alterForm.startTime = this.startTime
      this.alterForm.endTime = this.endTime
      if (!this.alterForm.lng || !this.alterForm.lat) {
        this.$notify.info({
          title: '提示',
          message: '地址经纬度获取失败，重新输入试试！',
        })
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改店铺信息
          this.alterForm.type = 'update'
          updateShop(this.alterForm)
            .then(res => {
              if (res.data.success) {
                this.handleClose()
                this.$notify.success({
                  title: '成功',
                  message: res.data.message,
                })
                // 刷新数据
                this.initData()
              } else {
                this.$notify.error({
                  title: '失败',
                  message: res.data.message,
                })
              }
            })
            .catch(err => {
              this.$notify.error({
                title: '失败',
                message: '系统出错，请重试!',
              })
            })
        } else {
          this.$notify.info({
            title: '提示',
            message: '请检查输入是否正确！',
          })
        }
      })
    },
  },
}
</script>

<style scoped>
.shop-list {
  box-sizing: border-box;
  min-width: 760px;
  padding: 20px;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.pic {
  width: 160px;
  height: 160px;
}

.pic-uploader-icon {
  width: 160px;
  height: 160px;
  line-height: 160px;
  text-align: center;
  font-size: 28px;
}
</style>
