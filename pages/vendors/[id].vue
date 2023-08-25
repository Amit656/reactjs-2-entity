<template>
  <AtomsLoader v-if="vendorStore.isLoading" />
  <TransitionRoot
    as="template"
    :show="open && formData.state === 'dont_see_mine'"
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
                @submit.prevent="saveState()"
              >
                <div class="mt-3 sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900"
                  >
                    {{ $t('lbl_add') }}
                  </DialogTitle>
                  <div class="mt-5">
                    <div>
                      <label
                        for="state"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      > State </label>
                      <div class="relative mt-2 rounded-md shadow-sm">
                        <input
                          id="state"
                          v-model="newstate"
                          type="text"
                          name="state"
                          class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                        focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
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
  <div>
    <main class="lg:pl-72">
      <div class="xl:pl-96">
        <div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <!-- Main area -->
        </div>
      </div>
    </main>
    <aside
      class="fixed inset-y-0 left-72 hidden w-96 overflow-y-auto border-r border-gray-200
      px-4 py-6 sm:px-6 lg:px-8 xl:block"
    >
      <form
        class="space-y-8 divide-y divide-gray-200"
        action="#"
        method="POST"
        @submit.prevent="save()"
      >
        <div class="space-y-8">
          <div>
            <div class="border-b border-gray-400 pb-5">
              <h3 class="text-base font-semibold leading-7 text-gray-900">
                {{ $t('lbl_edit') }} {{ $t('vendor.details') }}
              </h3>
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
            <label
              for="address1"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t("lbl_address") }} 1 </label>
            <div class="relative mt-2 rounded-md shadow-sm">
              <input
                id="name"
                v-model="formData.address_one"
                type="text"
                name="address_one"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
          </div>
          <div class="mt-5">
            <label
              for="address2"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t("lbl_address") }} 2 </label>
            <div class="relative mt-2 rounded-md shadow-sm">
              <input
                id="name"
                v-model="formData.address_two"
                type="text"
                name="address_two"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
            </div>
          </div>
          <div class="mt-5">
            <div>
              <label
                for="city"
                class="block text-sm font-medium leading-6 text-gray-900"
              > {{ $t("lbl_city") }} </label>
              <div class="relative mt-2 rounded-md shadow-sm">
                <input
                  id="name"
                  v-model="formData.city"
                  type="text"
                  name="city"
                  class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
            focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
              </div>
            </div>
          </div>
          <div class="mt-5">
            <label
              for="zip_code"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t("lbl_zipcode") }} </label>
            <div class="relative mt-2 rounded-md shadow-sm">
              <input
                id="name"
                v-model="formData.zip_code"
                type="text"
                name="zip_code"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @blur="v$.zip_code.$touch"
              >
            </div>
            <span
              v-if="v$.zip_code.$error"
              class="text-sm font-medium text-red-600"
            >
              {{ $t('error.zipcode_6digit') }}
            </span>
          </div>
          <div class="mt-5">
            <label
              for="country"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t("lbl_country") }} </label>
            <div class="mt-2">
              <select
                id="country"
                v-model="formData.country"
                name="country"
                autocomplete="country-name"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
        focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option
                  v-for="(country, index) in countries"
                  :key="index"
                  :value="index"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="mt-5">
            <label
              for="state"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t("lbl_state") }}

            </label>
            <div class="mt-2">
              <select
                id="state"
                v-model="formData.state"
                type="text"
                name="state"
                autocomplete="state"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
        focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                @change="open = true"
              >
                <option
                  v-for="(state, index) in states"
                  :key="index"
                  :value="state.name"
                >
                  {{ state.name }}
                </option>
                <option
                  v-if="added == false"
                  value="dont_see_mine"
                >
                  I dont see mine
                </option>
                <option
                  v-if="added == true && inArray(formData.state, states) == false"
                  :value="formData.state"
                >
                  {{ formData.state}}
                </option>
              </select>
            </div>
          </div>
          <div class="mt-5">
            <label
              for="currency"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t("lbl_currency") }} </label>
            <div class="mt-2">
              <select
                id="currency"
                v-model="formData.currency"
                type="text"
                name="currency"
                autocomplete="currency"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
        focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option
                  v-for="(currency, index) in currencies"
                  :key="index"
                  :value="index"
                >
                  {{ currency.code }}
                </option>
              </select>
            </div>
          </div>
          <div class="mt-5">
            <label
              for="phone"
              class="block text-sm font-medium leading-6 text-gray-900"
            > {{ $t("lbl_phone") }} </label>
            <div class="relative mt-2 rounded-md shadow-sm">
              <input
                id="name"
                v-model="formData.phone"
                type="text"
                name="phone"
                class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900
        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
        focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
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
              to="/vendors"
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2
        text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset
        ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            >
              {{ $t('lbl_cancel') }}
            </NuxtLink>
          </div>
        </div>
      </form>
    </aside>
  </div>
</template>

<script setup>
import {
  Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,
} from '@headlessui/vue';
import { useVuelidate } from '@vuelidate/core';
import validators from '../../plugins/validations';
import { useVendorStore } from '../../stores/vendor';
import countries from '../../data/countries.json';
import currencies from '../../data/currencies.json';

const open = ref(false);
const newstate = ref('');
const vendorStore = useVendorStore();
const formData = ref({
  customer_id: ref([]),
  name: ref(''),
  email: ref(''),
  account_number: ref(''),
  internal_note: ref(''),
  po_note: ref(''),
  address_one: ref(''),
  address_two: ref(''),
  city: ref(''),
  zip_code: ref(''),
  state: ref(''),
  country: ref(''),
  currency: ref(''),
  phone: ref(''),
});
const rules = computed(() => ({
  name: { required: validators.nameReq },
  email: {
    required: validators.emailRequired,
    email: validators.email,
  },
  account_number: { required: validators.accountNumberReq },
  zip_code: { containszipRequirement: validators.zipCodeLen },
}));
const v$ = useVuelidate(rules, formData);
const { id } = useRoute().params;
await vendorStore.getVendor(id);
formData.value = vendorStore.customerData;

const countryList = ref('');
countryList.value = countries.map((country) => ({
  name: country.name,
}));

const states = computed(() => {
  const country = countries[formData.value.country];
  if (country) {
    return country.states.map((state) => ({
      name: state.name,
    }));
  }
  return [];
});

async function save() {
  this.v$.$touch();
  if (!v$.value.$error) {
    await vendorStore.updateVendor(id, formData.value);
  }
}
const added = ref(false);
function inArray(needle, haystack) {
  const { length } = haystack;
  for (let i = 0; i < length; i++) {
    if (haystack[i].name === needle) return true;
  }
  return false;
}

if (inArray(formData.value.state, states.value) === false) {
  added.value = true;
  states.value.push({ name: formData.value.state });
}

async function saveState() {
  if (newstate.value !== '' && formData.value.country !== null) {
    formData.value.state = newstate.value;
    open.value = false;
    added.value = true;
  }
}

</script>

<style scoped>

</style>
