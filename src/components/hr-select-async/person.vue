<!-- person -->
<template>
  <div class="hr-person">
    <HrAvatar :image="msg.picUrl" />
    <div class="hr-person-info">
      <p class="name">
        {{ msg.userName }}
        <span class="userno">{{ msg.userNo ? `(${msg.userNo})` : "" }}</span>
      </p>
      <p>{{ msg.post }}</p>
      <p>{{ msg.orgPath }}</p>
    </div>
  </div>
</template>

<script>
import HrAvatar from "../avatar/index.vue";
export default {
  name: "hr-person",
  data() {
    return {};
  },
  components: {
    HrAvatar,
  },
  props: {
    msg: {
      type: Object,
      required: false,
      default: () => {
        return {
          userName: "张爱军",
          userNo: "", //工号
          picUrl: "", //头像
          post: "", //岗位
          orgPath: "", //部门
        };
      },
    },
  },
};
</script>
<style lang="less" scoped>
.hr-person {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 67px;
  .hr-person-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 6px 0;
    margin-left: 9px;
    .userno {
      margin-left: 5px;
    }
    p {
      color: #999;
      font-size: 12px;
    }
    .name {
      color: #4e596f;
      font-size: 14px;
    }
    &:hover {
      .name {
        color: #285afe;
      }
    }
  }
}
</style>
