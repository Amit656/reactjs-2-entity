import { threePLAPIStore } from './common';

export const use3PLCustomerStore = defineStore('3pl-customer', {
  state: () => ({
    isLoading: false,
    message: null,
    type: 'success',
    apiBase: threePLAPIStore(),
    customerData: {},
    userId: localStorage.getItem('user_id'),
  }),
  actions: {
    async verify3pl(uniqueId) {
      const response = await this.apiBase.makeRequest(
        `three-pl-customers/invitation/verify/${uniqueId}`,
      );
      this.customerData = response.data;
      this.message = response.metadata.message;
    },
    async save(inviteThreePlCustomer, formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`three-pl-customers/register/${inviteThreePlCustomer}`, 'POST', formData);
      this.isLoading = false;
      this.message = response.metadata.message;
    },
    async exists(inviteThreePlCustomer) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest('three-pl-customers/exists', 'POST', inviteThreePlCustomer);
      this.isLoading = false;
      this.customerData = response.data;
      this.message = response.metadata.message;
    },
    async sendInvite(formData) {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(
        '3pl-customers/invite',
        'POST',
        formData,
      );
      this.isLoading = false;
      if (response.errors) {
        this.message = response.message;
        this.type = 'error';
      } else {
        this.message = response.metadata.message;
        this.type = 'success';
      }
    },
    async warehouses(threePlCustomer) {
      this.isLoading = true;
      await this.apiBase.makeRequest(`three-pl-customers/warehouse/${threePlCustomer}`, 'POST');
      this.isLoading = false;
    },
    async get3PLCustomers(search = '') {
      this.isLoading = true;
      const response = await this.apiBase.makeRequest(`3pl/customers?search=${search}`);
      this.isLoading = false;
      this.customerData = response.data;
    },
  },
});
