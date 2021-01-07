<template>
    <div>
    <h2>{{post.title}}</h2>
    <h4><v-avatar color="primary" size="40"></v-avatar>{{post.author}}</h4>
    <p>{{post.description.slice(0,20)}}...</p>
    <p><i>{{post.date}}</i></p>
    <button>save!</button>
    </div>
</template>

<script>
export default {
    props:['post'],
}
</script>