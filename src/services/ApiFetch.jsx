import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiFetch = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com" }),
  endpoints: (builder) => ({
    getAllCountries: builder.query({   //query gets all country from api
        query: () => "/v3.1/all",
    }),
}),
});

export const {useGetAllCountriesQuery}=ApiFetch;
export default ApiFetch;