import {
  describe, vi, afterEach, it, expect, beforeEach,
} from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import MockAdapter from 'axios-mock-adapter';
import httpClient from './axiosHttpClient.js';

describe('AxiosHttpClient', () => {
  let mockAxios;

  beforeEach(() => {
    setActivePinia(createPinia());
    mockAxios = new MockAdapter(httpClient);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should create an instance of axios with the correct baseURL', () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const apiBasePort = import.meta.env.VITE_API_PORT;

    expect(mockAxios.axiosInstance.defaults.baseURL).toBe(`${apiBaseUrl}:${apiBasePort}`);
  });
});
