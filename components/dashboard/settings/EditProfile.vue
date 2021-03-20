<template>
  <div>
    <SectionHeader title="اطلاعات شخصی" icon="mdi-account-circle-outline" />
    <SectionContainer>
      <v-form ref="editProfile" v-model="valid" onSubmit="return false;" @submit="signUp">
        <v-row>
          <v-col class="py-0 mb-3" cols="12">
            <v-text-field v-model="information.firstname_fa" :label="$t('form.nameInPersian')" required :rules="requiredRules" outlined />
          </v-col>
          <v-col class="py-0 mb-3" cols="12">
            <v-text-field
              v-model="information.lastname_fa"
              :label="$t('form.lastNameInPersian')"
              required
              :rules="requiredRules"
              v-bind="filedProps"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0 mb-3" cols="12">
            <v-text-field v-model="information.email" label="ایمیل" readonly v-bind="filedProps" :rules="emailRules"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0 mb-3" cols="12">
            <v-text-field
              v-model="information.phone_number"
              required
              label="شماره تماس"
              v-bind="filedProps"
              :rules="phoneRules"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="py-0 mb-3" cols="12">
            <v-text-field
              v-model="information.university"
              :label="$t('form.educationPlace')"
              required
              :rules="requiredRules"
              v-bind="filedProps"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0 mb-3" cols="12">
            <v-text-field
              type="int"
              v-model="information.birth_date"
              v-bind="filedProps"
              required
              :rules="requiredRules"
              label="سال ورودی"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0 mb-3" cols="12">
            <v-text-field v-model="information.major" :rules="requiredRules" outlined required label="رشته"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0 mb-3" cols="12">
            <v-select v-model="information.university_degree" :items="degreeItem" required label="مقطع تحصیلی" outlined></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="py-0 mb-3" cols="12">
            <v-select
              v-model="information.programming_language"
              :rules="requiredRules"
              :items="languageSelectItem"
              label="زبان برنامه نویسی"
              outlined
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="px-3">
          <v-checkbox
            v-model="information.hide_profile_info"
            required
            label="اطلاعاتم برای سایر شرکت کننده ها قابل جستجو نباشد."
          ></v-checkbox>
        </v-row>

        <div class="d-flex mt-8">
          <div style="flex: 0 1 93px; margin-left: 24px">
            <v-btn block color="black" style="flex-basis: 20%" @click="resetForm">لغو</v-btn>
          </div>
          <div style="flex: 1">
            <v-btn block :loading="loading" type="submit" :disabled="!valid" color="primary" style="flex-basis: 75%">
              <v-icon left>mdi-content-save-outline</v-icon>
              ذخیره اطلاعات
            </v-btn>
          </div>
        </div>
      </v-form>
    </SectionContainer>
  </div>
</template>

<script>
import { emailRules, requiredRules, phoneRules } from '../../../mixins/formValidations';
import { primaryButtonProps } from '../../../mixins/buttonProps';
import { fieldProps } from '../../../mixins/fieldProps';
import SectionHeader from '~/components/SectionHeader';
import SectionContainer from '~/components/SectionContainer';
import { mapState } from 'vuex';

export default {
  mixins: [requiredRules, emailRules, primaryButtonProps, fieldProps, phoneRules],
  components: { SectionHeader, SectionContainer },
  props: {
    information: Object,
    loading: Boolean,
    signUp: Function,
    resetForm: Function,
  },
  data() {
    return {
      valid: false,
      isLoading: false,
      languageSelectItem: [
        {
          text: 'Java',
          value: 'java',
        },
        {
          text: '++C',
          value: 'cpp',
        },
        {
          text: 'Python',
          value: 'py3',
        },
      ],
      degreeItem: [
        {
          text: 'دانش آموز',
          value: 'ST',
        },
        {
          text: 'کارشناسی',
          value: 'BA',
        },
        {
          text: 'کارشناسی ارشد',
          value: 'MA',
        },
        {
          text: 'دکترا',
          value: 'DO',
        },
      ],
      universityItems: [],
    };
  },
  // async fetch() {

  // },
};
</script>
