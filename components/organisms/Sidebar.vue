<template>
  <div
    class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r
   lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4"
  >
    <div class="flex flex-shrink-0 items-center px-6">
      <AtomsLogo
        class="h-8 w-auto"
        alt="Stallion Warehouse Admin"
      />
    </div>
    <div class="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
      <Menu
        as="div"
        class="relative inline-block px-3 text-left"
      >
        <div>
          <MenuButton
            class="group w-full rounded-md bg-gray-100 px-3.5 py-2
          text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none
          focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            <span class="flex w-full items-center justify-between">
              <span class="flex min-w-0 items-center justify-between space-x-3">
                <AtomsImage
                  class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                  alt=""
                />
                <span class="flex min-w-0 flex-1 flex-col">
                  <span
                    class="truncate text-sm font-medium text-gray-900"
                    :title="emailInfo"
                  >
                    {{ emailInfo }}
                  </span>
                </span>
              </span>
              <ChevronUpDownIcon
                class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </span>
          </MenuButton>
        </div>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200
             rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <MenuItem>
                <AtomsLink
                  class="bg-gray-100 text-gray-900 block px-4 py-2 text-sm"
                  link-text="Logout"
                  @click="logout"
                />
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <nav class="mt-6 px-3">
        <div class="space-y-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            :class="'group flex items-center rounded-md px-2 py-2 text-sm font-medium'"
          >
            <component
              :is="item.icon"
              :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                       'mr-3 h-6 w-6 flex-shrink-0']"
              aria-hidden="true"
            />
            {{ $t(item.local) }}
          </NuxtLink>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import {
  Menu,
  MenuButton,
  MenuItems,
} from '@headlessui/vue';
import {
  UserGroupIcon,
  HomeIcon,
  BuildingStorefrontIcon,
} from '@heroicons/vue/24/outline';
import {
  ChevronUpDownIcon,
} from '@heroicons/vue/20/solid';

const userInfo = await JSON.parse(localStorage.getItem('user_info'));
const emailInfo = userInfo.email;
const navigation = [
  {
    name: 'Home', to: '/', local: 'home.label', icon: HomeIcon,
  },
  {
    name: '3pl', to: '/3pl', local: 'customer.label', icon: UserGroupIcon,
  },
  {
    name: 'Vendors', to: '/vendors', local: 'vendor.label', icon: BuildingStorefrontIcon,
  },
];
const config = useRuntimeConfig();
const baseURL = config.public.THREEPL_URL;
const logout = () => {
  localStorage.removeItem('access_token');
  navigateTo(`${baseURL}/login`, {
    external: true,
  });
};
</script>

<style>
.router-link-active  {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity));
}
</style>
