<template>
  <dashboard-page title="dashboard.settings">
    <v-col>
      <div class="overflow-hidden d-flex setting">
        <v-col cols="12" md="6" class="pa-0">
          <v-divider />
          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card-text class="settingWraper">
                <EditProfile
                  :loading="loading"
                  :signUp="signUp"
                  :information="this.information"
                  :edited="edited"
                  :menu="menu"
                  :disable="disable"
                  :resetForm="resetForm"
                />
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text class="settingWraper">
                <Resume
                  :resume="resume"
                  :deleteResume="deleteResume"
                  :signUp="signUp"
                  :edited="edited"
                  :disable="disable"
                  :information="this.information"
                  :loading="loading"
                  :addToArray="addToArray"
                  :skills="skills"
                  :deleteChip="deleteChip"
                  :deleteImage="deleteImage"
                  :image="image"
                  :jobs="jobs"
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
                <div style="margin: 15px auto" class="d-flex flex-column">
                  <v-tab style="width: 150px; height: 150px; background: #141432; color: white">
                    {{ $t('dashboard.editProfile') }}
                    <v-icon size="60" style="color: white">mdi-account-circle-outline</v-icon>
                  </v-tab>
                </div>
                <div style="margin: 15px auto" class="d-flex flex-column">
                  <v-tab style="width: 150px; height: 150px; background: #141432; color: white">
                    {{ $t('dashboard.resume') }}
                    <v-icon size="60" style="color: white">mdi-badge-account-horizontal</v-icon>
                  </v-tab>
                </div>
                <div style="margin: 15px auto" class="d-flex flex-column">
                  <v-tab style="width: 150px; height: 150px; background: #141432; color: white">
                    {{ $t('form.changePassword') }}
                    <v-icon size="60" style="color: white">mdi-form-textbox-password</v-icon>
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
import { mapState } from 'vuex';

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
        hideProfileInfo: '',
        canSponsorsSee: '',
        email: '',
        github: '',
        linkedin: '',
        phoneNumber: '',
        major: '',
        programmingLanguage: '',
        province: '',
        degree: '',
        term: '',
        resume: null,
        image: null,
        skill: '',
        job: '',
      },
      menu: false,
      disable: true,
      loading: false,
      formData: [],
      resume: '',
      image: '',
      skills: [],
      jobs: [],
    };
  },
  methods: {
    edited() {
      if (!this.profile) {
        this.disable = true;
      } else {
        //append to formDate
        this.formData.append('firstname_fa', this.information.firstnameFa);
        this.formData.append('firstname_en', this.information.firstnameEn);
        this.formData.append('lastname_fa', this.information.lastnameFa);
        this.formData.append('lastname_en', this.information.lastnameEn);
        this.formData.append('birth_date', this.information.birthDate);
        this.formData.append('university', this.information.university);
        this.formData.append('hide_profile_info', this.information.hideProfileInfo);
        this.formData.append('hide_profile_info', this.information.hideProfileInfo);
        this.formData.append('linkedin', this.information.linkedin);
        this.formData.append('email', this.information.email);
        this.formData.append('github', this.information.github);
        this.formData.append('major', this.information.major);
        this.formData.append('phone_number', this.information.phoneNumber);
        this.formData.append('programming_language', this.information.programmingLanguage);
        this.formData.append('university_term', this.information.term);
        this.formData.append('university_degree', this.information.degree);
        this.formData.append('province', this.information.province);
        this.formData.append('skills', this.skills);
        this.formData.append('jobs', this.jobs);
        if (
          this.information.firstnameFa !== this.profile.firstname_fa ||
          this.information.firstnameEn !== this.profile.firstname_en ||
          this.information.lastnameFa !== this.profile.lastname_fa ||
          this.information.lastnameEn !== this.profile.lastname_en ||
          this.information.birthDate !== this.profile.birth_date ||
          this.information.university !== this.profile.university ||
          this.information.hideProfileInfo !== this.profile.hide_profile_info ||
          this.information.canSponsorsSee !== this.profile.can_sponsors_see ||
          this.information.linkedin !== this.profile.linkedin ||
          this.information.email !== this.profile.email ||
          this.information.github !== this.profile.github ||
          this.information.major !== this.profile.major ||
          this.information.programmingLanguage !== this.profile.programming_language ||
          this.information.term !== this.profile.university_term ||
          this.information.degree !== this.profile.university_degree ||
          this.information.province !== this.profile.province ||
          JSON.stringify(this.skills) != JSON.stringify(this.profile.skills) ||
          JSON.stringify(this.jobs) != JSON.stringify(this.profile.jobs)
        ) {
          console.log('hi');
          this.disable = false;
        } else if (this.information.resume !== this.profile.resume) {
          console.log('hi 2');
          this.formData.append('resume', this.information.resume);
          this.disable = false;
        } else if (this.information.image !== this.profile.image) {
          console.log('hi 2');
          this.formData.append('image', this.information.image);
          this.disable = false;
        } else {
          if (this.information.resume == this.profile.resume) {
            console.log('hi 2');
            this.formData.delete('resume');
          } else if (this.information.image == this.profile.image) {
            console.log('hi 2');
            this.formData.delete('image');
          }
          console.log('hi 2');
          this.disable = true;
        }
      }
    },
    async signUp() {
      this.loading = true;
      await editProfile(this.$axios, this.formData).then(res => {
        this.loading = false;
        if (res.status_code) {
          if (res.status_code === 200) {
            this.$toast.success('تغییرات با موفقیت دخیره شد.');
            this.resetForm();
          } else {
            this.$toast.error('خطایی در دخیره تغییرات رخ داد.');
          }
        }
      });
    },
    // save() {
    //   this.$refs.dialog.save(date);
    //   this.menu = false;
    // },
    resetForm() {
      if (!this.profile) return;
      this.disable = true
      this.information.firstnameFa = this.profile.firstname_fa;
      this.information.firstnameEn = this.profile.firstname_en;
      this.information.lastnameFa = this.profile.lastname_fa;
      this.information.lastnameEn = this.profile.lastname_en;
      this.information.birthDate = this.profile.birth_date;
      this.information.university = this.profile.university;
      this.information.hideProfileInfo = this.profile.hide_profile_info;
      this.information.canSponsorsSee = this.profile.can_sponsors_see;
      this.information.linkedin = this.profile.linkedin;
      this.information.email = this.profile.email;
      this.information.github = this.profile.github;
      this.resume = this.profile.resume;
      this.information.resume = this.profile.resume;
      this.information.phoneNumber = this.profile.phone_number;
      this.information.major = this.profile.major;
      this.information.programmingLanguage = this.profile.programming_language;
      this.information.term = this.profile.university_term;
      this.information.degree = this.profile.university_degree;
      this.information.province = this.profile.province;
      this.image = this.profile.image;
      this.information.image = this.profile.image;
      for (item in this.profile.skills) {
        this.skills.push(item);
      }
      for (item in this.profile.jobs) {
        this.jobs.push(item);
      }
    },
    deleteResume() {
      this.resume = null;
      if (this.formData.get('resume') == null) {
        this.formData.append('resume', null);
      } else {
        this.formData.delete('resume');
      }
      this.disable = false;
    },

    deleteImage() {
      this.image = null;
      if (this.formData.get('image') == null) {
        this.formData.append('image', null);
      } else {
        this.formData.delete('image');
      }
      this.disable = false;
    },

    addToArray(array) {
      if (array === 'skills' && this.information.skill != '') {
        this.skills.push(this.information.skill);
        // console.log(this.skills);
        this.information.skill = '';
      } else if (array === 'jobs' && this.information.job != '') {
        this.jobs.push(this.information.job);
        // console.log(this.jobs);
        this.information.job = '';
      }
      this.edited();
    },
    deleteChip(array, item) {
      if (array == 'skills') {
        if (this.skills.length == 1) {
          this.skills = [];
        } else {
          this.skills.splice(item, 1);
        }
      } else if (array == 'jobs') {
        if (this.jobs.length == 1) {
          this.jobs = [];
        } else {
          this.jobs.splice(item, 1);
        }
      }
      this.edited();
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
    },
  },
  computed: {
    ...mapState({
      profile: state => state.auth.user,
    }),
  },
  mounted() {
    this.formData = new FormData();
    this.resetForm();
    this.disable = true;
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
