<template>
  <v-responsive class="overflow-y-auto">
    <v-responsive class="d-flex align-center text-center pa-2">
      <v-card
        v-intersect="{
          handler: onIntersectAbout,
          options: {
            threshold: 0.4,
          },
        }"
        class="mx-auto"
        max-width="336"
      >
        <v-card-title>about</v-card-title>
        <v-card-text>
          Phasellus magna. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum debitis impedit saepe deserunt, expedita amet,
          necessitatibus qui nemo quia eos voluptas nulla non quaerat dolorum magnam molestias temporibus perferendis possimus cumque
          veniam. Quam minima cum explicabo quae voluptates veritatis, praesentium animi blanditiis nihil maxime laudantium adipisci dolor?
          Numquam, maiores? Voluptas quae exercitationem nam ab? Impedit, nulla dicta minus ipsum necessitatibus ex molestias a voluptates
          harum doloremque quam tenetur dignissimos officiis dolorum at sequi magni quos assumenda labore corrupti ut quasi architecto.
          Asperiores, obcaecati quasi animi temporibus porro, fugiat qui quis mollitia ipsum magni cupiditate, explicabo repudiandae at sit
          quas pariatur! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis harum ut atque quae praesentium numquam nesciunt,
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
    onIntersectAbout: Function,
  },
};
</script>

<style></style>
