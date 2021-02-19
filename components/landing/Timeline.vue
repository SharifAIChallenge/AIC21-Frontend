<template>
  <v-responsive class="overflow-y-auto">
    <v-responsive class="d-flex align-center text-center pa-2">
      <v-card
        v-intersect="{
          handler: onIntersectTimeline,
          options: {
            threshold: 0.4,
          },
        }"
        class="mx-auto"
        max-width="336"
      >
        <v-card-title>timeline</v-card-title>
        <v-card-text>
          Phasellus magna. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis harum ut atque quae praesentium numquam nesciunt,
          earum iusto consequatur alias omnis velit ipsa quia at ipsam corporis, dignissimos id! Cum unde aut quisquam, quo minima
          laudantium at assumenda voluptatibus, iure deserunt id consequuntur ducimus exercitationem autem nam, facilis aperiam ex rem ipsa
          eius. Animi qui tempora repudiandae, nobis cupiditate illo vel neque aspernatur facilis ducimus unde alias perspiciatis
          doloremque? Dolorem quaerat molestiae libero quisquam doloribus perspiciatis explicabo aperiam, repellendus labore assumenda
          maiores ipsum eos provident rerum nostrum aliquid. Officiis omnis ullam, in numquam doloribus mollitia nobis sapiente dolor iure
          quidem. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede.
          Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. In turpis. In dui magna, posuere eget,
          vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.
        </v-card-text>
      </v-card>
    </v-responsive>
  </v-responsive>
</template>
<script>
export default {
  props: {
    onIntersectTimeline: Function,
  },
};
</script>

<style></style>
