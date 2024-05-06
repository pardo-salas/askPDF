<template>
  <div v-if="store.status == APP_STATUS.INIT">
    <StepUpload/>
  </div>
  <div v-else-if="store.status == APP_STATUS.LOADING">
    <StepLoading/>
  </div>
  <div v-else-if="store.status == APP_STATUS.CHAT_MODE">
    <StepChat/>
  </div>
  <div v-else-if="store.status == APP_STATUS.ERROR">
    <FwbAlert>
      pito quiero pito
    </FwbAlert>
  </div>
  <div v-else> 
    <FwbAlert>
      <span>Estado no reconocido</span>
    </FwbAlert>
  </div>
</template>

<script lang="ts" setup>
import StepUpload from "./StepUpload.vue"
import StepChat from "./StepChat.vue"
import StepLoading from "./StepLoading.vue"
import { FwbAlert } from "flowbite-vue";
import {APP_STATUS ,useAppStatusStore  } from "../store/store";

const store = useAppStatusStore()

</script>
