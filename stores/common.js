const config = useRuntimeConfig();
export const apiStore = defineStore({
  id: 'api',
  state: () => ({
    apiUrl: config.public.baseURL,
  }),
  actions: {
    async makeRequest(endpoint, method, body) {
      try {
        const headers = `Bearer ${localStorage.getItem('token')}`;
        const response = await fetch(`${this.apiUrl}/${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: headers,
          },
          method,
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to make API call');
      }
    },
  },
});

export const warehouseAPIStore = defineStore({
  id: 'warehouseAPI',
  state: () => ({
    apiUrl: config.public.WarehouseURL,
  }),
  actions: {
    async makeRequest(endpoint, method, body) {
      try {
        const headers = `Bearer ${localStorage.getItem('access_token')}`;
        const response = await fetch(`${this.apiUrl}/${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: headers,
          },
          method,
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to make API call');
      }
    },
  },
});

export const threePLAPIStore = defineStore({
  id: 'threePLAPIStore',
  state: () => ({
    apiUrl: config.public.THREEPL_API_URL,
  }),
  actions: {
    async makeRequest(endpoint, method, body) {
      try {
        const headers = `Bearer ${localStorage.getItem('access_token')}`;
        const response = await fetch(`${this.apiUrl}/${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: headers,
          },
          method,
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Failed to make API call');
      }
    },
  },
});
