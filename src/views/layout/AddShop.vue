<template>
  <div class="add-shop">
    <el-form :model="shopForm" :rules="rules" ref="shopForm" label-width="140px" class="shop-form">
      <el-form-item label="门店名称" prop="name">
        <el-input v-model="shopForm.name" placeholder="请输入门店名称，不超过15个字"></el-input>
      </el-form-item>
      <el-form-item label="门店地址" prop="address">
        <el-input
          id="add-address"
          v-model="shopForm.address"
          placeholder="详细至门牌号，与营业执照地址一致"
          @blur="updateLocation"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model="shopForm.tel" maxlength="13"></el-input>
      </el-form-item>
      <el-form-item label="门店简介">
        <el-input v-model="shopForm.notice"></el-input>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{start: '00:00', step: '00:15', end: '24:00'}"
        ></el-time-select>
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{start: '00:00', step: '00:15', end: '24:00', minTime: startTime}"
        ></el-time-select>
      </el-form-item>
      <el-form-item label="上传店铺头像" required>
        <el-upload
          class="pic-uploader"
          :action="addImgAction"
          :show-file-list="false"
          :on-success="handleShopAvatarScucess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="!alterMode && shopForm.shopImg"
            :src="baseImgTmpPath + shopForm.shopImg"
            class="pic"
          />
          <img
            v-else-if="alterMode && shopForm.shopImg"
            :src="baseShopImgPath + shopForm.shopImg"
            class="pic"
          />
          <i v-else class="el-icon-plus pic-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="法人代表姓名" prop="legalRepr">
        <el-input v-model="shopForm.legalRepr" placeholder="输入店铺法人代表真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idNumber">
        <el-input v-model="shopForm.idNumber" placeholder="输入法人代表18位身份证号" maxlength="18"></el-input>
      </el-form-item>
      <el-form-item label="法人代表手持身份证正面照片" required>
        <el-col :span="11">
          <el-upload
            class="pic-uploader"
            :action="addImgAction"
            :show-file-list="false"
            :on-success="handleIdFrontScucess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="!alterMode && shopForm.withIdFrontImg"
              :src="baseImgTmpPath + shopForm.withIdFrontImg"
              class="pic"
            />
            <img
              v-else-if="alterMode && shopForm.withIdFrontImg"
              :src="baseFrontImgPath + shopForm.withIdFrontImg"
              class="pic"
            />
            <i v-else class="el-icon-plus pic-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :span="13">
          <ul class="tips">
            <li>正面需清晰拍出人物五官和文字信息</li>
            <li>不可自拍、不可只拍身份证</li>
            <li>可用其它有效证件代替</li>
          </ul>
        </el-col>
      </el-form-item>
      <el-form-item label="法人代表手持身份证背面照片" required>
        <el-col :span="11">
          <el-upload
            class="pic-uploader"
            :action="addImgAction"
            :show-file-list="false"
            :on-success="handleIdBackScucess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="!alterMode && shopForm.withIdBackImg"
              :src="baseImgTmpPath + shopForm.withIdBackImg"
              class="pic"
            />
            <img
              v-else-if="alterMode && shopForm.withIdBackImg"
              :src="baseBackImgPath + shopForm.withIdBackImg"
              class="pic"
            />
            <i v-else class="el-icon-plus pic-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :span="13">
          <ul class="tips">
            <li>背面需清晰拍出有效期等文字信息</li>
            <li>不可自拍、不可只拍身份证</li>
            <li>可用其它有效证件代替</li>
          </ul>
        </el-col>
      </el-form-item>
      <el-form-item label="营业执照照片" required>
        <el-col :span="11">
          <el-upload
            class="pic-uploader"
            :action="addImgAction"
            :show-file-list="false"
            :on-success="handleLicenseScucess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="!alterMode && shopForm.licenseImg"
              :src="baseImgTmpPath + shopForm.licenseImg"
              class="pic"
            />
            <img
              v-else-if="alterMode && shopForm.licenseImg"
              :src="baseLicenseImgPath + shopForm.licenseImg"
              class="pic"
            />
            <i v-else class="el-icon-plus pic-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :span="13">
          <ul class="tips">
            <li>需文字清晰、边框完整、露出国徽</li>
            <li>拍复印件需加盖印章，可用有效特许可证代替</li>
          </ul>
        </el-col>
      </el-form-item>
      <el-form-item class="submit-button">
        <el-button
          v-if="!alterMode"
          type="primary"
          @click="submitForm('shopForm')"
          :loading="loading"
        >立即创建</el-button>
        <el-button v-else type="primary" @click="submitForm('shopForm')" :loading="loading">提交修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addImgAction, baseImgUploadedPath, baseImgTmpPath } from '@/config/env'
import { getLocation } from '@/api/lbs'
import { addShop, updateShop } from '@/api/shop'
export default {
  data() {
    return {
      loading: false,
      alterMode: false,
      shopForm: {
        name: '',
        startTime: '',
        endTime: '',
        address: '',
        lat: '',
        lng: '',
        tel: '',
        legalRepr: '',
        idNumber: '',
        shopImg: '',
        withIdFrontImg: '',
        withIdBackImg: '',
        licenseImg: '',
        notice: '',
      },
      startTime: '',
      endTime: '',
      rules: {
        name: [{ required: true, message: '请输入门店名称', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        tel: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        legalRepr: [
          { required: true, message: '请输入法人代表姓名', trigger: 'blur' },
        ],
        idNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '长度为18位', trigger: 'blur' },
        ],
      },
      baseImgTmpPath,
      baseImgUploadedPath,
      baseShopImgPath: baseImgUploadedPath,
      baseFrontImgPath: baseImgUploadedPath,
      baseBackImgPath: baseImgUploadedPath,
      baseLicenseImgPath: baseImgUploadedPath,
      addImgAction,
    }
  },
  created() {
    if (this.$route.params.shopId) {
      this.alterMode = true
      this.shopForm = this.$route.params
      let times = this.shopForm.time.split('/')
      this.startTime = times[0]
      this.endTime = times[1]
    }
  },
  computed: {
    ...mapGetters(['username']),
  },
  methods: {
    // 上传成功
    handleShopAvatarScucess(res, file) {
      if (res.success) {
        this.baseShopImgPath = this.baseImgTmpPath
        this.shopForm.preShopImg = this.shopForm.shopImg
        this.shopForm.shopImg = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    handleIdFrontScucess(res, file) {
      if (res.success) {
        this.baseFrontImgPath = this.baseImgTmpPath
        this.shopForm.preIdFrontImg = this.shopForm.withIdFrontImg
        this.shopForm.withIdFrontImg = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    handleIdBackScucess(res, file) {
      if (res.success) {
        this.baseBackImgPath = this.baseImgTmpPath
        this.shopForm.preIdBackImg = this.shopForm.withIdBackImg
        this.shopForm.withIdBackImg = res.img_path
      } else {
        this.$notify.error({
          title: '失败',
          message: '上传图片失败！',
        })
      }
    },
    handleLicenseScucess(res, file) {
      if (res.success) {
        this.baseLicenseImgPath = this.baseImgTmpPath
        this.shopForm.preLicenseImg = this.shopForm.licenseImg
        this.shopForm.licenseImg = res.img_path
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
    // 更新经纬度信息
    updateLocation() {
      if (this.shopForm.address) {
        getLocation(this.shopForm.address).then(res => {
          if (res.data.success) {
            let location = res.data.location
            let params = location.split(',')
            this.shopForm.lng = params[0]
            this.shopForm.lat = params[1]
          } else {
            // 再请求一次数据
            getLocation(this.shopForm.address)
              .then(res => {
                if (res.data.success) {
                  let location = res.data.location
                  let params = location.split(',')
                  this.shopForm.lng = params[0]
                  this.shopForm.lat = params[1]
                } else {
                  this.$notify.info({
                    title: '提示',
                    message: '地址经纬度获取失败，重新输入试试！',
                  })
                }
              })
              .catch(err => {
                this.$notify.error({
                  title: '失败',
                  message: '系统出错，请重试!',
                })
              })
          }
        })
      }
    },
    // 添加商店(修改商店申请)
    submitForm(formName) {
      // 失去焦点触发地址信息更新
      let addressInput = document.getElementById('add-address')
      addressInput.blur()
      this.shopForm.owner = this.username
      if (!this.shopForm.owner) {
        this.$notify.error({
          title: '失败',
          message: '系统出错，请重试!',
        })
        return
      }
      if (
        !this.shopForm.shopImg ||
        !this.shopForm.withIdFrontImg ||
        !this.shopForm.withIdBackImg ||
        !this.shopForm.licenseImg
      ) {
        this.$notify.info({
          title: '提示',
          message: '必须上传以上要求图片！',
        })
        return
      }
      if (!this.shopForm.lng || !this.shopForm.lat) {
        this.$notify.info({
          title: '提示',
          message: '地址经纬度获取失败，重新输入试试！',
        })
        return
      }
      this.shopForm.startTime = this.startTime
      this.shopForm.endTime = this.endTime
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 修改模式
          if (this.alterMode) {
            this.shopForm.type = 'alter'
            this.loading = true
            updateShop(this.shopForm)
              .then(res => {
                this.loading = false
                if (res.data.success) {
                  this.$notify.success({
                    title: '成功',
                    message: res.data.message,
                  })
                  // 重置
                  this.shopForm = {
                    name: '',
                    startTime: '',
                    endTime: '',
                    address: '',
                    lat: '',
                    lng: '',
                    tel: '',
                    legalRepr: '',
                    idNumber: '',
                    shopImg: '',
                    withIdFrontImg: '',
                    withIdBackImg: '',
                    licenseImg: '',
                    notice: '',
                  }
                  this.startTime = ''
                  this.endTime = ''
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
                  message: '系统出错，请重试！',
                })
              })
          } else {
            // 新建商店
            addShop(this.shopForm)
              .then(res => {
                if (res.data.success) {
                  this.$notify.success({
                    tite: '成功',
                    message: res.data.message,
                  })
                  // 重置
                  this.shopForm = {
                    name: '',
                    startTime: '',
                    endTime: '',
                    address: '',
                    lat: '',
                    lng: '',
                    tel: '',
                    legalRepr: '',
                    idNumber: '',
                    shopImg: '',
                    withIdFrontImg: '',
                    withIdBackImg: '',
                    licenseImg: '',
                    notice: '',
                  }
                  this.startTime = ''
                  this.endTime = ''
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
                  message: '系统出错，请重试！',
                })
              })
          }
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
.add-shop {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 600px;
}

.shop-form {
  width: 540px;
  margin: 15px 0;
}

.tips {
  padding-left: 10px;
  font-size: 12px;
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


