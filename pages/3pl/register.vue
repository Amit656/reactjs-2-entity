<template>
  <form
    class="space-y-8 divide-y divide-gray-200"
    action="#"
    method="POST"
    @submit.prevent="save()"
  >
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="pt-8">
        <div>
          <h3 class="text-xl font-semibold leading-6 text-gray-900">
            {{ $t('customer.lbl_register') }}
          </h3>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label
              for="fullname"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t('lbl_name') }} <span class="text-red-600"> * </span>
            </label>
            <div class="mt-2">
              <input
                id="fullname"
                v-model="formData.fullname"
                type="text"
                name="fullname"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                @blur="v$.fullname.$touch"
              >
            </div>
            <div v-if="v$.fullname.$error">
              <span
                v-if="v$.fullname.required.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.req_name') }} </span>
            </div>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t('lbl_email') }} <span class="text-red-600"> * </span>
            </label>
            <div class="mt-2">
              <input
                id="email"
                v-model="formData.email"
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                @blur="v$.email.$touch"
              >
            </div>
            <div v-if="v$.email.$error">
              <span
                v-if="v$.email.required.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.req_email') }} </span>
              <span
                v-if="v$.email.email.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.invalid_email') }} </span>
            </div>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t('lbl_password') }} <span class="text-red-600"> * </span></label>
            <div class="mt-2">
              <input
                id="password"
                v-model="formData.password"
                name="password"
                type="password"
                autocomplete="password"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.password.$touch"
              >
            </div>
            <div v-if="v$.password.$error">
              <span
                v-if="v$.password.required.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.req_password') }} </span>
              <span
                v-else-if="v$.password.minLength.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.min_password') }} </span>
              <span
                v-else-if="v$.password.contains.$invalid"
                class="text-sm font-medium text-red-600"
              > {{ $t('error.with_password') }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <div class="flex justify-end">
        <NuxtLink
          type="button"
          to="/3pl"
          class="ml-3 block app-button border-2 rounded-md py-2 px-3 text-center
            text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2"
        >
          {{ $t('lbl_cancel') }}
        </NuxtLink>
        <button
          type="submit"
          class="ml-3 block app-button border-2 rounded-md py-2 px-3 text-center
           text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2
           focus-visible:outline-offset-2"
        >
          {{ $t('lbl_save') }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import validators from '../../plugins/validations';

const formData = reactive({
  fullname: ref(''),
  email: ref(''),
  password: ref(''),
});
const rules = computed(() => ({
  fullname: {
    required: validators.nameReq,
  },
  email: {
    required: validators.emailRequired,
    email: validators.email,
  },
  password: {
    required: validators.passReq,
    minLength: validators.passMin,
    contains: validators.passWith,
  },
}));
const v$ = useVuelidate(rules, formData);
async function save() {
  this.v$.$touch();
}
</script>

<style lang="scss" scoped>

</style>
