export const getPosts=(axios)=>{
    return axios.$get('/blog');
}

export const getPost=(axios,id)=>{
    return axios.$get(`/blog/${id}`);
}