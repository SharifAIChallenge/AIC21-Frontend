<template>
  <dashboard-page title="dashboard.settings">
    <v-col>
      <div class="overflow-hidden d-flex setting">
        <v-col cols="12" md="6" class="pa-0">
          <v-divider />
          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card-text class="settingWraper">
                <EditProfile :signUp="signUp" :information="this.information" :edited="edited" :menu="menu" :disable="disable" />
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text class="settingWraper">
                <Resume :signUp="signUp" :edited="edited" :disable="disable" :information="this.information" />
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
                <div style="margin:15px auto" class="d-flex flex-column">
                  <v-tab style="width:150px;height:150px" class="secondary">
                    {{ $t('dashboard.editProfile') }}
                    <v-icon size="40">mdi-account-circle-outline</v-icon>
                  </v-tab>
                </div>
                <div style="margin:15px auto" class="d-flex flex-column">
                  <v-tab style="width:150px;height:150px" class="secondary">
                    {{ $t('dashboard.editProfile') }}
                    <v-icon size="40">mdi-badge-account-horizontal</v-icon>
                  </v-tab>
                </div>
                <div style="margin:15px auto" class="d-flex flex-column">
                  <v-tab style="width:150px;height:150px" class="secondary">
                    {{ $t('form.changePassword') }}
                    <v-icon size="40">mdi-form-textbox-password</v-icon>
                  </v-tab>
                </div>
              </v-tabs>
            </div>
          </v-col>
        </client-only>
      </div>
    </v-col>
  </dashboard-page>
</template>

<script>
import EditProfile from '../../components/dashboard/settings/EditProfile';
import Resume from '../../components/dashboard/settings/resume';
import ChangePassword from '../../components/dashboard/settings/ChangePassword';
import DashboardPage from '../../components/dashboard/DashboardPage';
import { editProfile } from '~/api';

export default {
  components: { DashboardPage, ChangePassword, EditProfile, Resume },
  layout: 'dashboard',
  transition: 'fade-transition',
  data() {
    return {
      tabs: null,
      information: {
        firstnameFa: '',
        firstnameEn: '',
        lastnameFa: '',
        lastnameEn: '',
        birthDate: '',
        university: '',
        resume: '',
      },
      menu: false,
      disable: true,
      loading: false,
      formData: [],
    };
  },
  methods: {
    edited() {
      const profile = this.$auth.user;
      if (!profile) {
        this.disable = true;
      } else {
        this.formData = new FormData();
        //append to formDate
        this.formData.append('firstname_fa', this.information.firstnameFa);
        this.formData.append('firstname_en', this.information.firstnameEn);
        this.formData.append('lastname_fa', this.information.lastnameFa);
        this.formData.append('lastname_en', this.information.lastnameEn);
        this.formData.append('birth_date', this.information.birthDate);
        this.formData.append('university', this.information.university);
        if (
          this.information.firstnameFa !== profile.firstname_fa ||
          this.information.firstnameEn !== profile.firstname_en ||
          this.information.lastnameFa !== profile.lastname_fa ||
          this.information.lastnameEn !== profile.lastname_en ||
          this.information.birthDate !== profile.birth_date ||
          this.information.university !== profile.university
        ) {
          this.disable = false;
        } else {
          this.disable = true;
        }
        if (this.information.resume !== profile.resume) {
          this.formData.append('resume', this.information.resume);
          this.disable = false;
        }
      }
    },
    async signUp() {
      this.loading = true;
      let { data } = await editProfile(this.$axios, this.formData);
      this.loading = false;
      if (data.status_code) {
        if (data.status_code === 200) {
          // console.log('sucsess !!!')
          this.$toast.success('تغییرات با موفقیت دخیره شد.');
        } else {
          this.$toast.error('خطایی در دخیره تغییرات رخ داد.');
        }
      }
    },
    // save() {
    //   this.$refs.dialog.save(date);
    //   this.menu = false;
    // },
    resetForm() {
      const profile = this.$auth.user;
      if (!profile) return;
      this.information.firstnameFa = profile.firstname_fa;
      this.information.firstnameEn = profile.firstname_en;
      this.information.lastnameFa = profile.lastname_fa;
      this.information.lastnameEn = profile.lastname_en;
      this.information.birthDate = profile.birth_date;
      this.information.university = profile.university;
      this.information.resume = profile.resume;
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
    },
  },
  mounted() {
    this.resetForm();
    // this.edited();
    this.disable = true;
  },
};
</script>

<style lang="scss">
@import '../../assets/variables.scss';
@import '../../assets/mixins.scss';

.setting {
  @include not-md {
    flex-wrap: wrap;
    flex-flow: column-reverse;
  }
  hr {
    display: none;
  }
  .v-tabs-slider-wrapper {
    display: none;
  }
  .settingWraper {
    min-height: 100vh;
    background-color: #0e1224;
  }
  .tabsW {
    min-height: 100vh;
    position: fixed;
    left: 0;
    width: calc(50% - 136px);
    @include not-md {
      position: relative;
      width: auto;
      min-height: 150px;
    }
  }
  .tabsWraper .v-item-group {
    min-height: 100vh;
    @include not-md {
      min-height: 150px;
    }
    .v-slide-group__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      @include not-md {
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
