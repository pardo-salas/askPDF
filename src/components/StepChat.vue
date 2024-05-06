<template>
    <div class="grid grid-cols-4 gap-2">
        <img v-for="image in images" 
        :src="image" 
        alt="PDF page" 
        class=" rounded w-full h-auto aspect-[400/540]">
    </div>
    <form class="mt-8" v-on:submit="handleSubmit">
        <fwb-input
            v-model="question"
            placeholder=""
            label="Deja aqui tu pregunta"
            required
        />
    </form>
    <div v-if="loading">
        <FwbSpinner/>
        <p class="opacity-75">Esperando Respuesta...</p>
    </div>

    <div class="mt-8" v-if="answer">
        <p class="font-medium">
            Respuesta:
        </p>
        <p>{{ answer }}</p>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {FwbInput, FwbSpinner} from 'flowbite-vue'
import {useAppStatusStore } from '../store/store'

const store = useAppStatusStore()
const {url,pages,id} = store

const question = ref("")
let answer = ref("")

let loading= false;

// Se cambia el url de los 4 primeras paginas y se devuelve en un array 
const numImagesToShow = Math.min(pages, 4)
const images = Array.from({ length:numImagesToShow }, (_,i)=>{
    const page = i + 1
    return url
        .replace("/upload/",`/upload/w_400,h_540,c_fill,pg_${page}/`)
        .replace(".pdf",".jpg")
})

const handleSubmit= async(event:any)=>{
    event.preventDefault()

    loading = true
    answer.value = ""
    
    const searchParams = new URLSearchParams()
    searchParams.append("id", id)
    searchParams.append("question", question.value)

    try {
        const eventSource = new EventSource(`/api/ask?${searchParams.toString()}`)

        eventSource.onmessage = (event) => {
            loading = false
            const incomingData = JSON.parse(event.data)
            
            if (incomingData === "__END__") {
            eventSource.close()
            return
            }
            
            answer += incomingData
        }
    } catch (error) {
        store.changeState(-1)
    }
    finally{
        loading=false
    }

}


</script>   