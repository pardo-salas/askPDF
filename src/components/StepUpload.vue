<template>
    <FwbFileInput v-model="files" dropzone @change="handleFileSelected"/>
</template>

<script setup lang="ts">
import { FwbFileInput } from 'flowbite-vue'
import { ref } from "vue";
import { useAppStatusStore } from "../store/store"

const store = useAppStatusStore()

const files = ref()

async function handleFileSelected() {
  if (!files.value) {
    return;
  }

  // Validacion de un pdf
  if (files.value.type !== "application/pdf") {
    files.value = null;
    return;
  }

  store.changeState(1);
  const formData = new FormData()
  formData.append('file', files.value)

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      store.changeState(-1)
      // Manejar el error aquí
      throw new Error('Error en la petición de carga');
    }

    const { id, url, pages } = await res.json()
    store.changeInfoPDF(id, url, pages)
    store.changeState(2)
  } catch (error) {
    // Manejar el error aquí
    console.error(error);
  }
}
</script>