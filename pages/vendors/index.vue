<template>
  <AtomsConfirm
    v-if="showDelete"
    :message="$t('vendor.txt_delete')"
    @confirm="onDelete"
    @cancel="showDelete = false"
  />
  <AtomsLoader v-if="vendorStore.isLoading" />
  <AtomsAlert
    v-if="textVisible"
    :type="resType"
    :message="res"
  />
  <div
    class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center
    sm:justify-between sm:px-6 lg:px-8"
  >
    <TransitionRoot
      as="template"
      :show="open"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="open = false"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5
                text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <form
                  ref="myForm"
                  class="space-y-8 divide-y divide-gray-200"
                  action="#"
                  method="POST"
                  @submit.prevent="save()"
                >
                  <div class="mt-3 sm:mt-5">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                    >
                      {{ $t('lbl_add') }} {{ $t('vendor.details') }}
                    </DialogTitle>
                    <div
                      v-if="isUser([THREE_PL_CUSTOMER,THREE_PL_CUSTOMER_STAFF])"
                      class="mt-5"
                    >
                      <label
                        for="name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      > {{ $t('customer.label_cust') }}</label>
                      <div class="relative mt-2 rounded-md">
                        <div class="mt-4 sm:mt-0">
                          <MoleculesSelect
                            :options-list="customerList"
                            label="full_name"
                            track-by="hash"
                            :multiple="true"
                            @change="updateCustomerIds"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div>
                        <label
                          for="name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        > {{ $t('lbl_name') }} <span class="text-red-600"> * </span> </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input
                            id="name"
                            v-model="formData.name"
                            type="text"
                            name="name"
                            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            @blur="v$.name.$touch"
                          >
                        </div>
                      </div>
                      <div v-if="v$.name.$error">
                        <span
                          v-if="v$.name.required.$invalid"
                          class="text-sm font-medium text-red-600"
                        > {{ $t('error.req_name') }} </span>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div>
                        <label
                          for="email"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        > {{ $t('lbl_email') }} <span class="text-red-600"> * </span> </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input
                            id="email"
                            v-model="formData.email"
                            type="text"
                            name="email"
                            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            @blur="v$.email.$touch"
                          >
                        </div>
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
                    <div class="mt-5">
                      <div>
                        <label
                          for="account_number"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        > {{ $t('vendor.lbl_acc_number') }} </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input
                            id="account_number"
                            v-model="formData.account_number"
                            type="text"
                            name="account_number"
                            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            @blur="v$.account_number.$touch"
                          >
                        </div>
                      </div>
                      <div v-if="v$.account_number.$error">
                        <span
                          v-if="v$.account_number.required.$invalid"
                          class="text-sm font-medium text-red-600"
                        > {{ $t('error.account_number') }} </span>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div>
                        <label
                          for="internal_note"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        > {{ $t('vendor.lbl_internal_note') }} </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <textarea
                            id="internal_note"
                            v-model="formData.internal_note"
                            name="internal_note"
                            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <div>
                        <label
                          for="po_note"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        > {{ $t('vendor.lbl_po_note') }} </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <textarea
                            id="po_note"
                            v-model="formData.po_note"
                            name="po_note"
                            class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3
                        py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-indigo-600 sm:col-start-2"
                    >
                      {{ $t('lbl_save') }}
                    </button>
                    <NuxtLink
                      ref="cancelButtonRef"
                      to="#"
                      type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2
                        text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                      @click="open = false, reset()"
                    >
                      {{ $t('lbl_cancel') }}
                    </NuxtLink>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div class="sm:flex-auto">
      <h1 class="text-base font-semibold leading-6 text-gray-900">
        {{ $t('vendor.label') }}
      </h1>
    </div>
    <div
      class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end"
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
            :placeholder="$t('lbl_search') + ' ' + $t('vendor.label')"
            @input="searchVendor"
          >
        </div>
      </div>
    </div>
    <div
      class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"
    >
      <button
        class="block app-button border-2 rounded-md py-2 px-3 text-center
        text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click="open = true, get3pl()"
      >
        {{ $t('lbl_add') }} {{ $t('vendor.label_vendor') }}
      </button>
    </div>
  </div>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('vendor.lbl_id') }}
                  </th>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('lbl_name') }}
                  </th>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('lbl_email') }}
                  </th>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    {{ $t('vendor.lbl_acc_number') }}
                  </th>
                  <th
                    scope="col"
                    colspan="2"
                    class="w-12 py-3.5 pl-7 pr-2 text-left text-sm
                    font-semibold text-gray-900 sm:pr-6"
                  >
                    {{ $t('lbl_action') }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="vendor in vendorList.data"
                  :key="vendor.id"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900
                    sm:pl-6"
                  >
                    {{ vendor.id }}
                  </td>
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-sm text-gray-900
                    sm:pl-6"
                  >
                    {{ vendor.name }}
                  </td>
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-sm text-gray-900
                    sm:pl-6"
                  >
                    {{ vendor.email }}
                  </td>
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-sm text-gray-900
                    sm:pl-6"
                  >
                    {{ vendor.account_number }}
                  </td>
                  <td
                    class="w-12 py-3.5 pl-4 pr-3 text-left text-sm
                    font-semibold text-gray-900 sm:pl-6"
                  >
                    <NuxtLink
                      class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      :to="`/vendors/${vendor.hash}`"
                    >
                      <PencilIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                  <td
                    class="w-12 relative whitespace-nowrap py-4 pr-4 pl-3
                    text-right text-sm font-medium sm:pr-8 lg:pr-8"
                  >
                    <NuxtLink
                      class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      @click="showDelete = true, vendorDelete = vendor.hash"
                    >
                      <TrashIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </NuxtLink>
                  </td>
                </tr>
                <tr
                  v-if="vendorList.data == ''"
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
              v-if="vendorList.data != ''"
              v-model="currentPage"
              :current-page="currentPage"
              :total-data="totalData"
              :links="pageLinks"
              @change="refetch"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,
} from '@headlessui/vue';
import {
  TrashIcon, PencilIcon, MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';
import { useVuelidate } from '@vuelidate/core';
import { debounce } from 'lodash';
import validators from '../../plugins/validations';
import { useVendorStore } from '../../stores/vendor';

const open = ref(false);
const textVisible = ref(false);
const res = ref('');
const resType = ref('');

const vendorStore = useVendorStore();
const formData = ref({
  customer_id: ref([]),
  name: ref(''),
  email: ref(''),
  account_number: ref(''),
  internal_note: ref(''),
  po_note: ref(''),
});

const rules = computed(() => ({
  name: { required: validators.nameReq },
  email: {
    required: validators.emailRequired,
    email: validators.email,
  },
  account_number: {
    required: validators.accountNumberReq,
  },
}));
const v$ = useVuelidate(rules, formData);
const customerList = ref('');
const vendorList = ref('');

await vendorStore.getVendors();
vendorList.value = vendorStore.customerData;
async function get3pl() {
  await vendorStore.getCustomer();
  customerList.value = vendorStore.customerData;
}
async function save() {
  this.v$.$touch();
  if (!v$.value.$error) {
    await vendorStore.save(formData.value);
    await vendorStore.getVendors();
    vendorList.value = vendorStore.customerData;
    res.value = vendorStore.message;
    resType.value = vendorStore.type;
    if (resType.value !== 'error') {
      open.value = false;
      this.reset();
    }
    if (res.value !== null) {
      textVisible.value = true;
      setTimeout(() => {
        textVisible.value = false;
        vendorStore.message = null;
      }, 3000);
    }
  }
}

res.value = vendorStore.message;
resType.value = vendorStore.type;
if (res.value !== null) {
  textVisible.value = true;
  setTimeout(() => {
    textVisible.value = false;
    vendorStore.message = null;
  }, 3000);
}
const search = ref('');
const pageLinks = ref(vendorStore.customerData.links);
const currentPage = ref(vendorStore.customerData.current_page);
const totalData = ref(vendorStore.customerData.total);
const searchVendor = debounce(async () => {
  await vendorStore.getVendors(search.value);
  vendorList.value = vendorStore.customerData;
  pageLinks.value = vendorStore.customerData.links;
  currentPage.value = vendorStore.customerData.current_page;
}, DEBOUNCE_TIMEOUT);
async function refetch(pageUrl) {
  await vendorStore.getPaginatedData(pageUrl);
  vendorList.value = vendorStore.customerData;
  pageLinks.value = vendorStore.customerData.links;
  currentPage.value = vendorStore.customerData.current_page;
}

const showDelete = ref(false);
const vendorDelete = ref('');
async function onDelete() {
  res.value = await vendorStore.deleteVendor(vendorDelete.value);
  resType.value = vendorStore.type;
  await vendorStore.getVendors();
  vendorList.value = vendorStore.customerData;
  showDelete.value = false;
  textVisible.value = true;
  pageLinks.value = vendorStore.customerData.links;
  currentPage.value = vendorStore.customerData.current_page;
  setTimeout(() => {
    textVisible.value = false;
  }, 3000);
}
async function reset() {
  Object.keys(formData.value).forEach((key) => {
    formData.value[key] = '';
  });
  this.v$.$reset();
}
function isUser(role) {
  const user = JSON.parse(localStorage.getItem('user_info'));
  if (role.findIndex((item) => item === user.user_type) !== -1) {
    return false;
  }
  return true;
}
function updateCustomerIds(value) {
  formData.value.customer_id = value.map((item) => item.hash);
}
</script>
<style>
</style>
