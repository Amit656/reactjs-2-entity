<template>
  <TransitionRoot
    as="template"
    :show="sidebarOpen"
  >
    <Dialog
      as="div"
      class="relative z-40 lg:hidden"
      @close="sidebarOpen = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex h-10 w-10 items-center justify-center rounded-full
                   focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon
                    class="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </TransitionChild>
            <div class="flex flex-shrink-0 items-center px-4">
              <AtomsLogo
                class="h-8 w-auto"
                alt="Stallion Warehouse Admin"
              />
            </div>
            <div class="mt-5 h-0 flex-1 overflow-y-auto">
              <nav class="px-2">
                <div class="space-y-1">
                  <a
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    :class="[item.current ? 'bg-gray-100 text-gray-900' :
                               'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                             'group flex items-center rounded-md px-2',
                             'py-2 text-base font-medium leading-5']"
                    :aria-current="item.current ? 'page' : undefined"
                  >
                    <component
                      :is="item.icon"
                      :class="[item.current ? 'text-gray-500' :
                                 'text-gray-400 group-hover:text-gray-500',
                               'mr-3 h-6 w-6 flex-shrink-0']"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </a>
                </div>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
        <div
          class="w-14 flex-shrink-0"
          aria-hidden="true"
        >
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  <!-- Main column -->
  <div class="flex flex-col lg:pl-64">
    <!-- Search header -->
    <div
      class="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b
     border-gray-200 bg-white lg:hidden"
    >
      <button
        type="button"
        class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none
         focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3CenterLeftIcon
          class="h-6 w-6"
          aria-hidden="true"
        />
      </button>
      <div class="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex flex-1">
          <form
            class="flex w-full md:ml-0"
            action="#"
            method="GET"
          >
            <label
              for="search-field"
              class="sr-only"
            >Search</label>
            <div class="relative w-full text-gray-400 focus-within:text-gray-600">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <MagnifyingGlassIcon
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search-field"
                name="search-field"
                class="block h-full w-full border-transparent py-2 pl-8 pr-3
                 text-gray-900 focus:border-transparent focus:outline-none
                  focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm"
                placeholder="Search"
                type="search"
              >
            </div>
          </form>
        </div>
        <div class="flex items-center">
          <!-- Profile dropdown -->
          <Menu
            as="div"
            class="relative ml-3"
          >
            <div>
              <MenuButton
                class="flex max-w-xs items-center rounded-full bg-white
               text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                >
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
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y
               divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
                focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                               'block px-4 py-2 text-sm']"
                    >View profile</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                               'block px-4 py-2 text-sm']"
                    >Settings</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                               'block px-4 py-2 text-sm']"
                    >Notifications</a>
                  </MenuItem>
                </div>
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                               'block px-4 py-2 text-sm']"
                    >Logout</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
    <main class="flex-1">
      <!-- Page title & actions -->
      <!-- <div
        class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between
       sm:px-6 lg:px-8"
      >
        <div class="min-w-0 flex-1">
          <h1 class="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Home
          </h1>
        </div>
      </div> -->
    </main>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import {
  Bars3CenterLeftIcon, XMarkIcon,
} from '@heroicons/vue/24/outline';
import {
  MagnifyingGlassIcon,
} from '@heroicons/vue/20/solid';

const sidebarOpen = ref(false);

</script>

<style lang="scss" scoped>

</style>
