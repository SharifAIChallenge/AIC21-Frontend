<template>
  <div class="pa-5">
    <v-form ref="editProfile" v-model="valid" onSubmit="return false;" @submit="signUp">
      <v-row>
        <div class="pa-3 d-flex align-center mb-12">
          <v-icon class="ml-3" color="primary">mdi-account-circle-outline</v-icon>
          <h2>رزومه</h2>
        </div>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex mb-8" style="align-items: flex-end">
          <div class="pa-2 bg"><v-icon @click="deleteImage" :disabled="image == null">mdi-trash-can-outline</v-icon></div>
          <div class="secondary pa-2 d-flex" style="width: 150px; height: 150px; overflow: hidden">
            <img v-if="image !== null" :src="image" alt="profile_picture" style="width: 100%; heght: 100%; object-fit: cover" />
          </div>
        </v-col>
      </v-row>
      <v-row class="resume">
        <v-col class="py-0 mb-3" cols="12">
          <v-file-input
            v-model="information.image"
            label="تغییر عکس"
            outlined
            dense
            prepend-icon="mdi-file-upload-outline"
            @change="edited"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex mb-8">
          <div class="pa-2 bg"><v-icon @click="deleteResume" :disabled="resume == null">mdi-trash-can-outline</v-icon></div>
          <div class="secondary pa-2 d-flex" style="width: 100%; overflow: hidden">
            <v-icon>mdi-file-download-outline</v-icon>
            <a
              v-if="resume !== null"
              :href="resume"
              target="_blanck"
              style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
            >
              <span>{{ resume }}</span>
            </a>
          </div>
        </v-col>
      </v-row>
      <v-row class="resume">
        <v-col class="py-0 mb-3" cols="12">
          <v-file-input
            v-model="information.resume"
            label="تغییر فایل رزومه"
            outlined
            dense
            prepend-icon="mdi-file-upload-outline"
            @change="edited"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-3" cols="12">
          <v-text-field v-model="information.email" label="ایمیل" v-bind="filedProps" :rules="emailRules" @keyup="edited"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-6 skill" cols="12">
          <v-text-field
            v-model="information.skill"
            label="مهارت ها"
            v-bind="filedProps"
            @keyup="edited"
            @keyup.enter="addToArray('skills')"
          ></v-text-field>
          <v-icon v-if="information.skill != ''" @click="addToArray('skills')" @keyup.enter="addToArray('skills')">mdi-check</v-icon>
          <div class="my-2">
            <v-chip v-for="(item, index) in skills" :key="index" class="ma-2" close @click:close="deleteChip('skills', index)">
              {{ item }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-6 job" cols="12">
          <v-text-field
            v-model="information.job"
            label="شغل"
            v-bind="filedProps"
            @keyup="edited"
            @keyup.enter="addToArray('jobs')"
          ></v-text-field>
          <v-icon v-if="information.job != ''" @click="addToArray('jobs')" @keyup.enter="addToArray('jobs')">mdi-check</v-icon>
          <div class="my-2">
            <v-chip v-for="(item, index) in jobs" :key="index" class="ma-2" close @click:close="deleteChip('jobs', index)">
              {{ item }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-3" cols="12">
          <v-text-field v-model="information.linkedin" label="آدرس لینکدین" v-bind="filedProps" @keyup="edited"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-3" cols="12">
          <v-text-field v-model="information.github" label="گیت هاب" v-bind="filedProps" @keyup="edited"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-3" cols="12">
          <v-text-field v-model="information.phoneNumber" label="شماره تماس" v-bind="filedProps" @keyup="edited"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-3" cols="12">
          <v-text-field v-model="information.major" label="رشته" v-bind="filedProps" @keyup="edited"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-3" cols="12">
          <v-text-field v-model="information.term" label="ترم" v-bind="filedProps" @keyup="edited"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-3" cols="12">
          <v-text-field v-model="information.degree" label="مدرک" v-bind="filedProps" @keyup="edited"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-3" cols="12">
          <v-text-field v-model="information.phoneNumber" label="شماره تماس" v-bind="filedProps" @keyup="edited"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 mb-3" cols="12">
          <v-text-field
            v-model="information.programmingLanguage"
            label="زبان برنامه نویسی"
            v-bind="filedProps"
            @keyup="edited"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- <v-row class="px-3">
        <v-checkbox v-model="information.isComplete" label="اطلاعاتم برای اسپانسر قابل مشاهده باشد." @change="edited"></v-checkbox>
      </v-row> -->
      <v-row class="justify-space-between pa-3" v-bind:class="[information.resume == '' || resume == null ? 'marginTop' : '']">
        <v-btn style="flex-basis: 20%">لغو</v-btn>
        <v-btn :disabled="!valid || disable" :loading="loading" type="submit" color="primary" style="flex-basis: 75%">
          <v-icon left>mdi-content-save-outline</v-icon>
          {{ $t('dashboard.editProfile') }}
        </v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { emailRules, requiredRules } from '../../../mixins/formValidations';
import { primaryButtonProps } from '../../../mixins/buttonProps';
import { fieldProps } from '../../../mixins/fieldProps';

export default {
  mixins: [requiredRules, emailRules, primaryButtonProps, fieldProps],
  data() {
    return {
      valid: false,
    };
  },

  props: {
    information: Object,
    edited: Function,
    disable: Boolean,
    loading: Boolean,
    signUp: Function,
    deleteResume: Function,
    resume: String,
    addToArray: Function,
    skills: Array,
    jobs: Array,
    deleteChip: Function,
    deleteImage: Function,
    image: String,
  },
  methods: {},
};
</script>
<style lang="scss">
.resume {
  .v-input__prepend-outer {
    position: absolute;
    left: 3px;
  }
  .v-input__append-inner {
    display: none;
  }
}
.marginTop {
  margin-top: 100px !important;
}
.skill,
.job {
  position: relative;
  .v-text-field__details {
    display: none;
  }
  .mdi-check {
    position: absolute !important;
    left: 19px;
    cursor: pointer;
    top: 7px;
  }
}
</style>
