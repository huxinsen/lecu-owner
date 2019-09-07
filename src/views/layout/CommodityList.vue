<template>
  <div class="commodity-list">
    <!-- Table -->
    <el-table :data="commodityList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shopName }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.classValue }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品详情">
              <span>{{ props.row.details }}</span>
            </el-form-item>
            <el-form-item label="活动详情">
              <span>{{ props.row.promotionInfo }}</span>
            </el-form-item>
            <el-form-item label="原价">
              <span>{{ props.row.originalPrice }}</span>
            </el-form-item>
            <el-form-item label="开始时间">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="现价">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="结束时间">
              <span>{{ props.row.endTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="活动详情" prop="promotionInfo"></el-table-column>
      <el-table-column label="活动时间" prop="time" width="190"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Form -->
    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="updateForm" :rules="rules" ref="updateForm">
        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="updateForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品详情" :label-width="formLabelWidth" prop="details">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="不超过85个字"
            v-model="updateForm.details"
          ></el-input>
        </el-form-item>
        <el-row class="class-select">
          <h4 class="form-header">选择分类</h4>
          <el-form-item label="商品分类" :label-width="formLabelWidth" required>
            <el-select
              v-model="updateForm.classValue"
              clearable
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in classOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row class="add-class-row" :class="{ 'show-edit': showAddClass }">
          <div class="add-class">
            <el-form-item label="新分类" :label-width="formLabelWidth">
              <el-input v-model="updateForm.newClass"></el-input>
            </el-form-item>
          </div>
        </el-row>
        <div class="add-class-button" @click="handleAddClass">
          <i class="el-icon-caret-top add-class-button__icon" v-if="showAddClass"></i>
          <i class="el-icon-caret-bottom add-class-button__icon" v-else slot="icon"></i>
          <span class="add-class-button__text">添加商品分类</span>
        </div>
        <el-form-item label="商品图片" :label-width="formLabelWidth" required>
          <el-row>
            <!-- 图片1 -->
            <el-col :span="11">
              <el-upload
                class="pic-uploader"
                :action="addImgAction"
                :show-file-list="false"
                :on-success="handlePic1Scucess"
                :before-upload="beforePicUpload"
              >
                <img v-if="updateForm.pic1" :src="baseImgPath1 + updateForm.pic1" class="pic" />
                <i v-else class="el-icon-plus pic-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="11" :offset="2">
              <div>
                <ul class="tips">
                  <li>首张图片必须上传~</li>
                </ul>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <!-- 图片2 -->
            <el-col :span="11">
              <el-upload
                class="pic-uploader"
                :action="addImgAction"
                :show-file-list="false"
                :on-success="handlePic2Scucess"
                :before-upload="beforePicUpload"
              >
                <img v-if="updateForm.pic2" :src="baseImgPath2 + updateForm.pic2" class="pic" />
                <i v-else class="el-icon-plus pic-uploader-icon"></i>
              </el-upload>
            </el-col>
            <!-- 图片3 -->
            <el-col :span="11" :offset="2">
              <el-upload
                class="pic-uploader"
                :action="addImgAction"
                :show-file-list="false"
                :on-success="handlePic3Scucess"
                :before-upload="beforePicUpload"
              >
                <img v-if="updateForm.pic3" :src="baseImgPath3 + updateForm.pic3" class="pic" />
                <i v-else class="el-icon-plus pic-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
          <el-row>
            <!-- 图片4 -->
            <el-col :span="11">
              <el-upload
                class="pic-uploader"
                :action="addImgAction"
                :show-file-list="false"
                :on-success="handlePic4Scucess"
                :before-upload="beforePicUpload"
              >
                <img v-if="updateForm.pic4" :src="baseImgPath4 + updateForm.pic4" class="pic" />
                <i v-else class="el-icon-plus pic-uploader-icon"></i>
              </el-upload>
            </el-col>
            <!-- 图片5 -->
            <el-col :span="11" :offset="2">
              <el-upload
                class="pic-uploader"
                :action="addImgAction"
                :show-file-list="false"
                :on-success="handlePic5Scucess"
                :before-upload="beforePicUpload"
              >
                <img v-if="updateForm.pic5" :src="baseImgPath5 + updateForm.pic5" class="pic" />
                <i v-else class="el-icon-plus pic-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" required>
          <el-col :span="11">
            <el-input v-model.number="updateForm.originalPrice" placeholder="原价(选填)"></el-input>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-input v-model.number="updateForm.price" placeholder="现价(必填)"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="活动详情" :label-width="formLabelWidth" prop="promotionInfo">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="不超过85个字"
            v-model="updateForm.promotionInfo"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动时间" :label-width="formLabelWidth" required>
          <el-date-picker
            v-model="updateForm.time"
            type="datetimerange"
            range-separator=" 至 "
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('updateForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addImgAction, baseImgUploadedPath, baseImgTmpPath } from '@/config/env'
import { getCommodities, updateCommodity } from '@/api/commodity'
import { getClasses } from '@/api/shop'
export default {
  data() {
    return {
      dialogFormVisible: false,
      commodityList: [],
      updateForm: {},
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        details: [
          { required: true, message: '请输入商品详情', trigger: 'blur' },
        ],
        promotionInfo: [
          { required: true, message: '请输入活动信息', trigger: 'blur' },
        ],
      },
      formLabelWidth: '120px',
      classOptions: [],
      showAddClass: false,
      baseImgUploadedPath,
      baseImgTmpPath,
      addImgAction,
      baseImgPath1: baseImgUploadedPath,
      baseImgPath2: baseImgUploadedPath,
      baseImgPath3: baseImgUploadedPath,
      baseImgPath4: baseImgUploadedPath,
      baseImgPath5: baseImgUploadedPath,
    }
  },
  computed: {
    ...mapGetters(['username']),
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      if (this.username) {
        getCommodities(this.username)
          .then(res => {
            this.commodityList = res.data
            this.commodityList.forEach(item => {
              item.startTime = this.moment(item.startTime).format(
                'YYYY-MM-DD HH:mm:ss',
              )
              item.endTime = this.moment(item.endTime).format(
                'YYYY-MM-DD HH:mm:ss',
              )
              item.time = item.startTime + ' 至 ' + item.endTime
            })
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
      this.updateForm = this.clone(row)
      this.updateForm.time = [
        this.updateForm.startTime,
        this.updateForm.endTime,
      ]
      // 加载分类信息
      if (this.updateForm.shopId) {
        getClasses(this.updateForm.shopId)
          .then(res => {
            this.classOptions = res.data
            this.classOptions.forEach(item => {
              item.value = item.class
              item.label = item.class
            })
          })
          .catch(err => {
            this.$notify.error({
              title: '失败',
              message: '系统出错，请重试!',
            })
          })
      }
      this.dialogFormVisible = true
    },
    // 添加分类
    handleAddClass() {
      this.showAddClass = !this.showAddClass
    },
    // 上传检查
    beforePicUpload(file) {
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
    // 上传成功
    handlePic1Scucess(res, file) {
      if (res.success) {
        this.baseImgPath1 = this.baseImgTmpPath
        this.updateForm.prePic1 = this.updateForm.pic1
        this.updateForm.pic1 = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    handlePic2Scucess(res, file) {
      if (res.success) {
        this.baseImgPath2 = this.baseImgTmpPath
        this.updateForm.prePic2 = this.updateForm.pic2
        this.updateForm.pic2 = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    handlePic3Scucess(res, file) {
      if (res.success) {
        this.baseImgPath3 = this.baseImgTmpPath
        this.updateForm.prePic3 = this.updateForm.pic3
        this.updateForm.pic3 = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    handlePic4Scucess(res, file) {
      if (res.success) {
        this.baseImgPath4 = this.baseImgTmpPath
        this.updateForm.prePic4 = this.updateForm.pic4
        this.updateForm.pic4 = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    handlePic5Scucess(res, file) {
      if (res.success) {
        this.baseImgPath5 = this.baseImgTmpPath
        this.updateForm.prePic5 = this.updateForm.pic5
        this.updateForm.pic5 = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    // 关闭对话框
    handleClose() {
      this.dialogFormVisible = false
      this.baseImgPath1 = this.baseImgUploadedPath
      this.baseImgPath2 = this.baseImgUploadedPath
      this.baseImgPath3 = this.baseImgUploadedPath
      this.baseImgPath4 = this.baseImgUploadedPath
      this.baseImgPath5 = this.baseImgUploadedPath
      this.updateForm = {}
    },
    // 点击取消
    handleCancel() {
      this.handleClose()
    },
    // 确定修改
    submitForm(formName) {
      // 检查分类
      if (this.updateForm.classValue || this.updateForm.newClass) {
        if (this.updateForm.newClass) {
          this.updateForm.classValue = this.updateForm.newClass
        }
      } else {
        this.$notify.info({
          title: '提示',
          message: '请为商品设置分类!',
        })
        return
      }
      // 检查现价
      if (!this.updateForm.price) {
        this.$notify.info({
          title: '提示',
          message: '请填写现价!',
        })
        return
      }
      // 检查图片是否上传成功
      if (!this.updateForm.pic1) {
        this.$notify.info({
          title: '提示',
          message: '必须按要求上传图片!',
        })
        return
      }
      // 检查时间
      if (!this.updateForm.time) {
        this.$notify.info({
          title: '提示',
          message: '必须设置活动时间!',
        })
        return
      }
      // 检查其他商品信息
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateForm.startTime = this.moment(
            this.updateForm.time[0],
          ).format('YYYY-MM-DD HH:mm:ss')
          this.updateForm.endTime = this.moment(this.updateForm.time[1]).format(
            'YYYY-MM-DD HH:mm:ss',
          )
          // 更新商品信息
          updateCommodity(this.updateForm)
            .then(res => {
              this.handleClose()
              if (res.data.success) {
                this.$notify.success({
                  title: '成功',
                  message: res.data.message,
                })
                // 刷新数据
                this.initData()
                this.updateForm = {}
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
.commodity-list {
  min-width: 780px;
  box-sizing: border-box;
  padding: 20px;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.form-header {
  text-align: center;
  margin-bottom: 10px;
}

.class-select {
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.add-class-row {
  height: 0;
  overflow: hidden;
  transition: all 400ms;
  background: #f9fafc;
}

.show-edit {
  height: 90px;
}

.add-class {
  padding: 10px 30px 0px 10px;
  background: #f9fafc;
  border: 1px solid #eaeefb;
  border-top: none;
}

.add-class-button {
  margin-bottom: 20px;
  line-height: 40px;
  text-align: center;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border: 1px solid #eaeefb;
  border-top: none;
  transition: all 400ms;
}

.add-class-button:hover {
  cursor: pointer;
}

.add-class-button:hover .add-class-button__text {
  color: #20a0ff;
}

.add-class-button:hover .add-class-button__icon {
  color: #20a0ff;
}

.add-class-button__text {
  font-size: 14px;
  color: #999;
  transition: all 400ms;
}

.add-class-button__icon {
  color: #ccc;
  transition: all 400ms;
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
