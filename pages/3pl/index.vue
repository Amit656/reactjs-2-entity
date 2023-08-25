<template>
  <AtomsAlert
    v-if="textVisible"
    :type="resType"
    :message="res"
  />
  <AtomsLoader v-if="customerStore.isLoading" />
  <div
    class="border-b border-gray-200 px-6 py-6 mb-6 sm:flex sm:items-center
    sm:justify-between sm:px-6"
  >
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold leading-6 text-gray-900">
        {{ $t('customer.label') }}
      </h1>
    </div>
  </div>
  <div class="border border-gray-200 px-4 py-4 mb-6 sm:px-6">
    <div>
      <h3 class="text-lg font-semibold leading-6 text-gray-900">
        {{ $t('customer.txt_invite') }}
      </h3>
    </div>
    <form
      ref="myForm"
      class="space-y-8 divide-y divide-gray-200"
      action="#"
      method="POST"
      @submit.prevent="save()"
    >
      <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-2">
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
          > {{ $t("lbl_email") }} <span class="text-red-600"> * </span>
          </label>
          <div class="relative mt-2 rounded-md shadow-sm">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center
              pl-3"
            >
              <EnvelopeIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              id="email"
              v-model="formData.email"
              name="email"
              type="email"
              autocomplete="email"
              class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900
              ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
              focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @blur="v$.email.$touch"
            >
          </div>
          <div v-if="v$.email.$error">
            <span
              v-if="v$.email.required.$invalid"
              class="text-sm font-medium text-red-600"
            > {{ v$.email.$errors[0].$message }} </span>
          </div>
        </div>
        <div class="mt-7">
          <button
            class="block app-button border-2 rounded-md py-2 px-3 text-center
              text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-600"
          >
            {{ $t('customer.lbl_sendinv') }}
          </button>
        </div>
      </div>
    </form>
  </div>
  <div class="py-4">
    <div
      class="flex flex-1 items-center justify-center px-2 mb-4 lg:ml-6 lg:justify-end"
    >
      <div class="w-full max-w-lg lg:max-w-xs">
        <label
          for="search"
          class="sr-only"
        >{{ $t('lbl_search') }}</label>
        <div class="relative">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <MagnifyingGlassIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            id="search"
            v-model="search"
            name="search"
            class="block w-full rounded-md border-0 bg-white py-1.5
            pl-10 pr-3 shadow-sm ring-1 ring-inset ring-gray-300
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset
            focus:ring-blue-600 sm:text-sm sm:leading-6"
            type="search"
            :placeholder="$t('lbl_search') + ' ' + $t('customer.label')"
            @input="search3PL"
          >
        </div>
      </div>
    </div>
    <table class="border min-w-full divide-y divide-gray-300">
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            {{ $t('lbl_fullname') }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr
          v-for="customer in customerList.data"
          :key="customer.hash"
        >
          <td
            class="whitespace-nowrap py-4 text-sm font-medium text-gray-900
            sm:pl-6"
          >
            {{ customer.full_name }}
          </td>
        </tr>
        <tr
          v-if="customerList.data == ''"
        >
          <td
            colspan="5"
            class="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500 col-span-6"
          >
            {{ $t('txt_nodata') }}
          </td>
        </tr>
      </tbody>
    </table>
    <MoleculesPagination
      v-if="customerList.data != ''"
      v-model="currentPage"
      :current-page="currentPage"
      :total-data="totalData"
      :links="pageLinks"
      @change="refetch"
    />
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { MagnifyingGlassIcon, EnvelopeIcon } from '@heroicons/vue/24/outline';
import { debounce } from 'lodash';
import validators from '../../plugins/validations';
import { use3PLCustomerStore } from '../../stores/3pl';

const formData = reactive({
  email: ref(''),
});
const rules = computed(() => ({
  email: {
    required: validators.emailRequired,
    email: validators.email,
  },
}));
const v$ = useVuelidate(rules, formData);

const textVisible = ref(false);
let res = ref('');
let resType = ref('');
const customerList = ref('');
const search = ref('');
const customerStore = use3PLCustomerStore();
await customerStore.get3PLCustomers();
customerList.value = customerStore.customerData;
const pageLinks = ref(customerStore.customerData.links);
const currentPage = ref(customerStore.customerData.current_page);
const totalData = ref(customerStore.customerData.total);
async function save() {
  this.v$.$touch();
  if (!v$.value.$error) {
    await customerStore.sendInvite(formData);
    res = customerStore.message;
    resType = customerStore.type;
    if (res !== null) {
      textVisible.value = true;
      setTimeout(() => {
        textVisible.value = false;
        customerStore.message = null;
      }, 3000);
    }
  }
}
const search3PL = debounce(async () => {
  await customerStore.get3PLCustomers(search.value);
  customerList.value = customerStore.customerData;
  pageLinks.value = customerStore.customerData.links;
  currentPage.value = customerStore.customerData.current_page;
}, DEBOUNCE_TIMEOUT);
async function refetch(pageUrl) {
  await customerStore.get3PLCustomers(pageUrl);
  customerList.value = customerStore.customerData;
  pageLinks.value = customerStore.customerData.links;
  currentPage.value = customerStore.customerData.current_page;
}
</script>

<style lang="scss" scoped>

</style>
