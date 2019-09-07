<template>
  <div class="add-commodity">
    <el-form :model="optionsForm" ref="optionsForm" class="form" label-width="100px">
      <el-row class="shop-select">
        <h4 class="form-header">选择店铺</h4>
        <el-form-item label="所属店铺" required>
          <el-select v-model="shopId" placeholder="请选择" style="width:100%;" @change="updateClass">
            <el-option
              v-for="item in optionsForm.shopOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row class="class-select">
        <h4 class="form-header">选择分类</h4>
        <el-form-item label="商品分类" required>
          <el-select v-model="classValue" clearable placeholder="请选择" style="width:100%;">
            <el-option
              v-for="item in optionsForm.classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row class="add-class-row" :class="{ 'show-edit': showAddClass }">
        <div class="add-class">
          <el-form-item label="新分类" prop="newClass">
            <el-input v-model="optionsForm.newClass"></el-input>
          </el-form-item>
        </div>
      </el-row>
      <div class="add-class-button" @click="handleAddClass">
        <i class="el-icon-caret-top add-class-button__icon" v-if="showAddClass"></i>
        <i class="el-icon-caret-bottom add-class-button__icon" v-else slot="icon"></i>
        <span class="add-class-button__text">添加商品分类</span>
      </div>
    </el-form>
    <el-form
      :model="commodityForm"
      :rules="rules"
      ref="commodityForm"
      label-width="100px"
      class="form commodity-form"
    >
      <h4 class="form-header">添加商品</h4>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="commodityForm.name" placeholder="不超过20个字"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)" required>
        <el-col :span="11">
          <el-input v-model.number="commodityForm.originalPrice" placeholder="原价(选填)"></el-input>
        </el-col>
        <el-col :span="11" :offset="2">
          <el-input v-model.number="commodityForm.price" placeholder="现价(必填)"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品详情" prop="details">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="不超过85个字"
          v-model="commodityForm.details"
        ></el-input>
      </el-form-item>
      <el-form-item label="促销信息" prop="promotionInfo">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="不超过85个字"
          v-model="commodityForm.promotionInfo"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-date-picker
          v-model="commodityForm.time"
          type="datetimerange"
          range-separator=" 至 "
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="商品图片" required>
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
              <img v-if="commodityForm.pic1" :src="baseImgTmpPath + commodityForm.pic1" class="pic" />
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
              <img v-if="commodityForm.pic2" :src="baseImgTmpPath + commodityForm.pic2" class="pic" />
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
              <img v-if="commodityForm.pic3" :src="baseImgTmpPath + commodityForm.pic3" class="pic" />
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
              <img v-if="commodityForm.pic4" :src="baseImgTmpPath + commodityForm.pic4" class="pic" />
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
              <img v-if="commodityForm.pic5" :src="baseImgTmpPath + commodityForm.pic5" class="pic" />
              <i v-else class="el-icon-plus pic-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="submit-button">
        <el-button type="primary" @click="submitForm('commodityForm')" :loading="loading">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addImgAction, baseImgTmpPath } from '@/config/env'
import { addCommodity } from '@/api/commodity'
import { getShops, getClasses } from '@/api/shop'
export default {
  data() {
    return {
      loading: false,
      shopId: '',
      classValue: '',
      optionsForm: {
        shopOptions: [],
        classOptions: [],
        newClass: '',
      },
      showAddClass: false,
      commodityForm: {
        name: '',
        originalPrice: '',
        price: '',
        details: '',
        promotionInfo: '',
        pic1: '',
        pic2: '',
        pic3: '',
        pic4: '',
        pic5: '',
        time: '',
      },
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        details: [
          { required: true, message: '请输入商品详情', trigger: 'blur' },
        ],
        promotionInfo: [
          { required: true, message: '请输入活动信息', trigger: 'blur' },
        ],
      },
      addImgAction,
      baseImgTmpPath,
    }
  },
  created() {
    if (this.$route.params.shopId) {
      this.shopId = this.$route.params.shopId
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
        getShops(this.username, 'lite')
          .then(res => {
            this.optionsForm.shopOptions = res.data
            this.optionsForm.shopOptions.forEach(item => {
              item.value = item.shopId
              item.label = item.name
            })
          })
          .catch(err => {
            this.$notify.error({
              title: '失败',
              message: '系统出错，请重试!',
            })
          })
        this.updateClass()
      }
    },
    updateClass() {
      if (this.shopId) {
        getClasses(this.shopId)
          .then(res => {
            this.optionsForm.classOptions = res.data
            this.optionsForm.classOptions.forEach(item => {
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
    },
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
        this.commodityForm.pic1 = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    handlePic2Scucess(res, file) {
      if (res.success) {
        this.commodityForm.pic2 = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    handlePic3Scucess(res, file) {
      if (res.success) {
        this.commodityForm.pic3 = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    handlePic4Scucess(res, file) {
      if (res.success) {
        this.commodityForm.pic4 = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    handlePic5Scucess(res, file) {
      if (res.success) {
        this.commodityForm.pic5 = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    // 添加商品
    submitForm(formName) {
      // 检查所属商店
      if (this.shopId) {
        this.commodityForm.shopId = this.shopId
        this.optionsForm.shopOptions.forEach(shop => {
          if (shop.shopId === this.shopId) {
            this.commodityForm.lat = shop.lat
            this.commodityForm.lng = shop.lng
          }
        })
      } else {
        this.$notify.info({
          title: '提示',
          message: '请选择所属商店!',
        })
        return
      }
      // 检查分类
      if (this.classValue || this.optionsForm.newClass) {
        if (this.classValue) {
          this.commodityForm.classValue = this.classValue
        } else {
          this.commodityForm.classValue = this.optionsForm.newClass
        }
      } else {
        this.$notify.info({
          title: '提示',
          message: '请为商品设置分类!',
        })
        return
      }
      // 检查现价
      if (!this.commodityForm.price) {
        this.$notify.info({
          title: '提示',
          message: '请填写现价!',
        })
        return
      }
      // 检查图片是否上传成功
      if (!this.commodityForm.pic1) {
        this.$notify.info({
          title: '提示',
          message: '必须按要求上传图片!',
        })
        return
      }
      // 检查时间
      if (!this.commodityForm.time) {
        this.$notify.info({
          title: '提示',
          message: '必须设置活动时间!',
        })
        return
      }
      // 检查商品信息
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 格式化日期
          this.commodityForm.startTime = this.moment(
            this.commodityForm.time[0],
          ).format('YYYY-MM-DD HH:mm:ss')
          this.commodityForm.endTime = this.moment(
            this.commodityForm.time[1],
          ).format('YYYY-MM-DD HH:mm:ss')
          this.loading = true
          addCommodity(this.commodityForm)
            .then(res => {
              this.loading = false
              if (res.data.success) {
                this.$notify.success({
                  title: '成功',
                  message: res.data.message,
                })
              } else {
                this.$notify.error({
                  title: '失败',
                  message: res.data.message,
                })
              }
              // 重置
              this.commodityForm = {
                name: '',
                originalPrice: '',
                price: '',
                details: '',
                promotionInfo: '',
                pic1: '',
                pic2: '',
                pic3: '',
                pic4: '',
                pic5: '',
                time: '',
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
.add-commodity {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 600px;
}

.form {
  box-sizing: border-box;
  width: 540px;
  margin: 15px 0;
}

.form-header {
  margin-bottom: 10px;
  text-align: center;
}

.commodity-form {
  padding: 10px 30px 10px 10px;
  border: 1px solid #eaeefb;
  border-radius: 6px;
}

.shop-select {
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.class-select {
  border: 1px solid #eaeefb;
  padding: 10px 30px 10px 10px;
  border-top: none;
}
/* add-class */
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
  text-align: center;
  line-height: 40px;
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

.submit-button {
  text-align: center;
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
