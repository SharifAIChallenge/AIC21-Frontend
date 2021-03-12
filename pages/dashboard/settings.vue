<template>
  <v-row class="setting">
    <v-col cols="12" md="6" class="pa-0">
      <v-divider />
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card-text class="settingWraper">
            <EditProfile :loading="loading" :signUp="signUp" :information="this.information" :resetForm="resetForm" />
          </v-card-text>
        </v-tab-item>
        <v-tab-item>
          <v-card-text class="settingWraper">
            <Resume
              :deleteResume="deleteResume"
              :signUp="signUp"
              :information="this.information"
              :loading="loading"
              :deleteImage="deleteImage"
              :resetForm="resetForm"
            />
          </v-card-text>
        </v-tab-item>
        <v-tab-item>
          <v-card-text class="settingWraper">
            <ChangePassword />
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
    <client-only>
      <v-col cols="12" md="6" class="pa-0">
        <div class="d-flex tabsW">
          <v-tabs v-model="tabs" icons-and-text grow class="tabsWraper">
            <div v-for="(item, key) in tabLabels" :key="key" style="margin: 15px auto" class="d-flex flex-column">
              <v-tab>
                {{ item.title }}
                <v-icon size="60" style="color: white">{{ tabs === key ? item.icon : item.iconOutline }}</v-icon>
              </v-tab>
            </div>
          </v-tabs>
        </div>
      </v-col>
    </client-only>
  </v-row>
</template>

<script>
import EditProfile from '../../components/dashboard/settings/EditProfile';
import Resume from '../../components/dashboard/settings/resume';
import ChangePassword from '../../components/dashboard/settings/ChangePassword';
import DashboardPage from '../../components/dashboard/DashboardPage';
import { editProfile } from '~/api';
import { mapState } from 'vuex';

export default {
  components: { DashboardPage, ChangePassword, EditProfile, Resume },
  layout: 'dashboard',
  transition: 'fade-transition',
  data() {
    return {
      tabs: null,
      information: {
        firstname_fa: '',
        lastname_fa: '',
        birth_date: '',
        university: '',
        hide_profile_info: '',
        can_sponsors_see: '',
        email: '',
        github: '',
        linkedin: '',
        phone_number: '',
        major: '',
        programming_language: '',
        province: '',
        degree: '',
        term: '',
        resume: null,
        image: null,
        skill: '',
        job: '',
      },
      tabLabels: [
        {
          title: 'اطلاعات شخصی',
          icon: 'mdi-account-circle',
          iconOutline: 'mdi-account-circle-outline',
        },
        {
          title: 'رزومه',
          icon: 'mdi-badge-account-horizontal',
          iconOutline: 'mdi-badge-account-horizontal-outline',
        },
        {
          title: 'تغییر رمز عبور',
          icon: 'mdi-form-textbox-password',
          iconOutline: 'mdi-form-textbox-password',
        },
      ],
      loading: false,
    };
  },
  methods: {
    async signUp() {
      const formData = new FormData();
      let isFormValid = false;
      for (const key in this.information) {
        if (this.information[key] !== this.profile[key]) {
          formData.append(key, this.information[key]);
          isFormValid = true;
        }
      }

      if (!isFormValid) {
        return;
      }
      this.loading = true;
      let res = await editProfile(this.$axios, formData);

      this.loading = false;
      this.$store.commit('auth/setUser', res);
      this.resetForm();
      this.$toast.success('تغییرات با موفقیت دخیره شد.');
    },
    resetForm() {
      this.information = { ...this.profile };
    },
    deleteResume() {
      this.information.resume = null;
    },

    deleteImage() {
      this.information.image = null;
    },
  },
  watch: {
    profile(newProfile, oldProfile) {
      this.information = { ...newProfile };
    },
  },
  computed: {
    ...mapState({
      profile: state => state.auth.user,
    }),
  },
  mounted() {
    if (this.profile) this.information = { ...this.profile };
  },
};
</script>

<style lang="scss">
@import '../../assets/variables.scss';
@import '../../assets/mixins.scss';

.setting {
  @include v-not-md {
    flex-wrap: wrap;
    flex-flow: column-reverse;
    > div {
      width: 100vw;
    }
  }
  .v-tab--active {
    background-color: var(--v-secondary-base) !important;
    color: white !important;
  }
  .v-tab {
    width: 150px;
    height: 150px;
    background: #141432;
    color: white !important;
  }
  hr {
    display: none;
  }
  .v-tabs-slider-wrapper {
    display: none;
  }
  .settingWraper {
    background-color: #0e1224;
  }
  .tabsW {
    min-height: 100vh;
    position: fixed;
    left: 0;
    width: calc(50% - 136px);
    @include v-not-md {
      position: relative;
      width: auto;
      min-height: 150px;
    }
  }
  .tabsWraper .v-item-group {
    min-height: 100vh;
    @include v-not-md {
      min-height: 150px;
    }
    .v-slide-group__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      @include v-not-md {
        flex-direction: row;
        > div {
          margin: 0 !important;
          width: 33.3333%;
          > div {
            width: 100% !important;
          }
        }
      }
    }
  }
  input {
    text-align: right;
  }
}
</style>
