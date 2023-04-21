<template>
  <div class="hr-preview">
    <t-dialog
      ref="dialog1"
      :visible.sync="visible"
      :footer="false"
      attach="body"
      :width="1000"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template #header>
        <div class="operate">
          <zoom-in-icon @click="scaleD"></zoom-in-icon>
          <zoom-out-icon @click="scaleX"></zoom-out-icon>
        </div>
      </template>
      <template v-if="['pdf', 'word'].includes(previewType)">
        <pdf v-for="i in numPages" :key="i" :src="previewUrl" :page="i"></pdf>
      </template>
    </t-dialog>
  </div>
</template>

<script>
import pdf from "vue-pdf-signature";
import { ZoomInIcon, ZoomOutIcon } from "tdesign-icons-vue";
export default {
  name: "hr-preview",
  components: {
    pdf,
    ZoomInIcon,
    ZoomOutIcon,
  },
  props: {
    previewUrl: {
      type: String,
      default: "",
    },
    previewType: {
      type: String,
      default: "pdf",
    },
  },
  data() {
    return {
      visible: false,
      numPages: 0,
      scale: 1000,
    };
  },
  watch: {
    previewUrl: {
      handler(val) {
        if (val) {
          if (this.previewType === "img") {
            this.$hevueImgPreview({
              url: this.previewUrl,
              clickMaskCLose: true,
            });
            return;
          }
          let loadingTask = pdf.createLoadingTask(val);
          loadingTask.promise.then((pdf) => {
            this.numPages = pdf.numPages;
          });
          this.visible = true;
        }
      },
      deep: true,
    },
  },
  methods: {
    scaleD() {
      console.log(this.$refs.dialog1);
      this.scale += 50;
      this.$refs.dialog1.$refs.dialog.style.width = `${this.scale}px`;
    },
    scaleX() {
      this.scale -= 50;
      this.$refs.dialog1.$refs.dialog.style.width = `${this.scale}px`;
    },
  },
};
</script>
<style lang="less" scoped>
@import "@/style/variables";
/deep/ .t-dialog {
  position: relative;
  height: 80vh;
  padding: 60px 0;
  .t-dialog__header {
    position: absolute;
    top: 12px;
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
  }
  .t-dialog__body {
    height: calc(80vh - 96px);
    padding: 0 16px;
    overflow: auto;
  }
}
/deep/ .t-dialog__position.t-dialog--top {
  padding-top: 10vh;
}
.operate {
  display: flex;
  align-items: center;
  height: 32px;
  border-radius: 16px;
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.6);
  .t-icon {
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
