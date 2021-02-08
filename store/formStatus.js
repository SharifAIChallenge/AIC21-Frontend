export const state = () => ({
    show: false,
    form: 'login',
})


export const mutations = {
    toggleShow(state){
        state.show = !state.show;
        state.form = 'login'
    },
    changeStatus(state,form){
        state.form = form;
    }

}
