import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {environment} from "../../../environments/environment";

export const pluginsApi = createApi({
  reducerPath: 'pluginsApi',
  baseQuery: fetchBaseQuery({ baseUrl: environment.baseUrl }),
  endpoints: (builder) => ({
    getPlugins: builder.query<string[], void>({
      query: () => `${environment.pluggyLocatorUrl}/plugins/`,
    }),
  }),
})

export const { useGetPluginsQuery } = pluginsApi
