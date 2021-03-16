<template>
  <div>
    <SectionHeader title="رزومه" icon="mdi-badge-account-horizontal-outline" />
    <SectionContainer>
      <v-form ref="editProfile" onSubmit="return false;" @submit="signUp">
        <v-row v-if="information.image_link">
          <v-col cols="12" class="d-flex mb-8" style="align-items: flex-end">
            <v-btn @click="deleteImage" class="pa-2 bg d-flex justify-center align-center" style="width: 50px; height: 50px">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
            <div class="secondary pa-2 d-flex" style="width: 150px; height: 150px; overflow: hidden">
              <img :src="information.image_link" alt="profile_picture" style="width: 100%; heght: 100%; object-fit: cover" />
            </div>
          </v-col>
        </v-row>

        <v-row class="resume">
          <v-col class="py-0 mb-3" cols="12">
            <v-file-input
              v-model="information.image"
              label="تغییر عکس"
              v-bind="filedProps"
              prepend-icon="mdi-file-upload-outline"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-row v-if="information.resume_link">
          <v-col cols="12" class="d-flex mb-8">
            <v-btn @click="deleteResume" class="pa-2 bg d-flex justify-center align-center" style="width: 50px; height: 50px">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>

            <a
              :href="information.resume_link"
              target="_blanck"
              class="secondary pa-2 d-flex align-center"
              style="width: 100%; overflow: hidden; height: 50px"
            >
              <v-icon class="ml-3">mdi-file-download-outline</v-icon>
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">{{ information.resume_link }}</span>
            </a>
          </v-col>
        </v-row>

        <v-row class="resume">
          <v-col class="py-0 mb-3" cols="12">
            <v-file-input
              v-model="information.resume"
              label="تغییر فایل رزومه"
              v-bind="filedProps"
              prepend-icon="mdi-file-upload-outline"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="py-0 mb-10 skill" cols="12">
            <v-combobox
              v-model="information.skills"
              height="50px"
              dense
              chips
              multiple
              outlined
              label="مهارت ها"
              append-icon=""
              messages="با زدن Enter می‌توانید چند آیتم وارد کنید"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0 mb-10 job" cols="12">
            <v-combobox
              v-model="information.jobs"
              height="50px"
              dense
              chips
              multiple
              outlined
              label="شغل"
              append-icon=""
              :persistent-hint="true"
              hint="با زدن Enter می‌توانید چند آیتم وارد کنید"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0 mb-3" cols="12">
            <v-text-field v-bind="filedProps" v-model="information.linkedin" label="آدرس لینکدین"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0 mb-3" cols="12">
            <v-text-field v-bind="filedProps" v-model="information.github" label="گیت هاب"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="py-0 mb-3" cols="12">
            <v-text-field v-bind="filedProps" v-model="information.term" label="ترم"></v-text-field>
          </v-col>
        </v-row>

        <v-row class="px-3">
          <v-checkbox
            v-bind="filedProps"
            v-model="information.can_sponsors_see"
            label="اطلاعاتم برای اسپانسر قابل جستجو باشد."
          ></v-checkbox>
        </v-row>
        <div class="d-flex mt-8">
          <div style="flex: 0 1 93px; margin-left: 24px">
            <v-btn block color="black" style="flex-basis: 20%" @click="resetForm">لغو</v-btn>
          </div>
          <div style="flex: 1">
            <v-btn block :loading="loading" type="submit" color="primary" style="flex-basis: 75%">
              <v-icon left>mdi-content-save-v-bind="filedProps"</v-icon>
              ذخیره اطلاعات
            </v-btn>
          </div>
        </div>
      </v-form>
    </SectionContainer>
  </div>
</template>

<script>
import { emailRules, requiredRules } from '../../../mixins/formValidations';
import { fieldProps } from '../../../mixins/fieldProps';
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';

export default {
  mixins: [requiredRules, emailRules, fieldProps],
  components: { SectionHeader, SectionContainer },
  data() {
    return {};
  },

  props: {
    information: Object,
    disable: Boolean,
    loading: Boolean,
    signUp: Function,
    deleteResume: Function,
    deleteImage: Function,
    resetForm: Function,
  },
  methods: {},
};
</script>
<style lang="scss">
.resume {
  .v-text-field--outlined .v-input__prepend-outer {
    margin-top: 10px !important;
  }
  .v-input__prepend-outer {
    position: absolute;
    left: 3px;
    top: 3px;
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
