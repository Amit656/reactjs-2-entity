import { threePLAPIStore, warehouseAPIStore } from './common';

export const useVendorStore = defineStore('vendor', {
  state: () => ({
    isLoading: false,
    message: null,
    type: 'success',
    apiBase: threePLAPIStore(),
    apiWarehouse: warehouseAPIStore(),
    customerData: {},
    userId: null,
    permissions: JSON.parse(localStorage.getItem('user_info')),
  }),
  actions: {
    async getCustomer() {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('3pl/customers/list');
      this.isLoading = false;
      this.customerData = response.data;
    },
    async getVendors(search = '') {
      // console.log(this.permissions.scopes.vendor, 'dddd');
      this.isLoading = true;
      const response = await this.apiWarehouse.makeRequest(`vendors?search=${search}`);
      this.isLoading = false;
      this.customerData = response.data;
    },
    async save(formData) {
      this.isLoading = true;
      const response = await this.apiWarehouse.makeRequest('vendors', 'POST', formData);
      this.isLoading = false;
      this.message = response.metadata.message;
    },
    async getVendor(vendor) {
      this.isLoading = true;
      const response = await this.apiWarehouse.makeRequest(`vendors/${vendor}`);
      this.isLoading = false;
      this.customerData = response.data;
    },
    async updateVendor(vendor, formData) {
      this.isLoading = true;
      const response = await this.apiWarehouse.makeRequest(`vendors/${vendor}`, 'PUT', formData);
      this.isLoading = false;
      this.message = response.metadata.message;
      navigateTo('/vendors');
    },
    async deleteVendor(vendor) {
      this.isLoading = true;
      const response = await this.apiWarehouse.makeRequest(`vendors/${vendor}`, 'DELETE');
      this.isLoading = false;
      this.message = response.metadata.message;
      return response.metadata.message;
    },
    async getPaginatedData(pageUrl) {
      this.isLoading = true;
      const response = await fetch(pageUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      const data = await response.json();
      this.isLoading = false;
      this.customerData = data.data;
    },
  },
  getters: {
    canAccess: (state) => (permission) => state.permissions.scopes.vendor.includes(permission),
  },
});
