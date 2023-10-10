import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
export const useUserStore = defineStore("user", () => {
  const Router = useRouter();
  const user = ref(null);
  return { user };
});
