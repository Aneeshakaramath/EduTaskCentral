<template>
    <div class="group-details-container">
        <div>
            <label class="typo__label">Select an existing group or Add a Group Name</label>
            <VueMultiselect
                    v-model="groupValues" tag-placeholder="Add this as new group" placeholder="Search or add a group" label="name" track-by="code"
                    :options="options" :multiple="false" :taggable="true" @tag="addTag">
            </VueMultiselect>
            <pre class="language-json"><code>{{ groupValues  }}</code></pre>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import VueMultiselect from 'vue-multiselect';


let groupValues =  ref([]);
let options =  ref([
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ]);

function addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      options.value.push(tag)
      values.value.push(tag)
}
</script>
  
<style scoped>

.group-details-container {
    margin: 30px;
    color: black;
}

 </style>
  