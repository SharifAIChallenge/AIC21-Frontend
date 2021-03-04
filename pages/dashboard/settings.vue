<template>
  <dashboard-page title="dashboard.settings">
    <v-col>
      <div class="overflow-hidden d-flex setting">
        <v-col cols="6" class="pa-0">
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
          <v-col cols="6" class="pa-0">
            <div style="min-height:100vh;" class="d-flex">
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
        if (this.information.firstnameFa !== profile.firstname_fa) {
          this.formData.append('firstname_fa', this.information.firstnameFa);
          console.log(this.information.resume);
          // console.log(formData.get('firstname_fa'));
          this.disable = false;
        } else if (this.information.firstnameEn !== profile.firstname_en) {
          this.formData.append('firstname_en', this.information.firstnameEn);
          this.disable = false;
        } else if (this.information.lastnameFa !== profile.lastname_fa) {
          this.formData.append('lastname_fa', this.information.lastnameFa);
          this.disable = false;
        } else if (this.information.lastnameEn !== profile.lastname_en) {
          this.formData.append('lastname_en', this.information.lastnameEn);
          this.disable = false;
        } else if (this.information.birthDate !== profile.birth_date) {
          // this.save()
          console.log(this.information.birthDate);
          this.formData.append('birth_date', this.information.birthDate);
          this.disable = false;
        } else if (this.information.university !== profile.university) {
          this.formData.append('university', this.information.university);
          this.disable = false;
        } else if (this.information.resume !== profile.resume) {
          this.formData.append('resume', this.information.resume);
          console.log(formData.get('resume'));
          this.disable = false;
        } else {
          // delete from formDate
          if (this.information.firstnameFa == profile.firstname_fa) {
            this.formData.delete('firstname_fa');
          } else if (this.information.firstnameEn == profile.firstname_en) {
            this.formData.delete('firstname_en');
          } else if (this.information.lastnameFa == profile.lastname_fa) {
            this.formData.delete('lastname_fa');
          } else if (this.information.lastnameEn == profile.lastname_en) {
            this.formData.delete('lastname_en');
          } else if (this.information.birthDate == profile.birth_date) {
            this.formData.delete('birth_date');
          } else if (this.information.university == profile.university) {
            this.formData.delete('university');
          }
          this.disable = true;
        }
      }
    },
    async signUp() {
      console.log('hi :)');
      this.loading = true;
      let { data } = await editProfile(this.$axios, this.formData);
      this.loading = false;
      this.$store.dispatch('api/accounts/profile');
      if (data.status_code) {
        if (data.status_code === 200) {
          this.$toast.success('تغییرات با موفقیت دخیره شد.');
        } else if (data.detail.non_field_errors) {
          if (data.detail.non_field_errors[0].includes('wait'))
            this.$toast.error(this.$tc('dashboard.codeSubmissionMessage', this.codeSubmitDelay));
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
.setting {
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
  .tabsWraper .v-item-group {
    min-height: 100vh;
    .v-slide-group__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  input {
    text-align: right;
  }
}
</style>
