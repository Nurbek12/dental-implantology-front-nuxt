export default defineNuxtPlugin({
  enforce: "pre",
  setup() {
    const clients = useRuntimeConfig().public.openFetch;
    const localFetch = useRequestFetch();
    
    return {
      provide: Object.entries(clients).reduce(
        (acc, [name, options]) => ({
          ...acc,

          [name]: createOpenFetch(
            (localOptions) => {
                const removeData = useRemoveAuthData();
                const accessToken = useAuthAccessToken();
                const refreshToken = useAuthRefreshToken();

                return {
                    ...options,
                    ...localOptions,
                    headers: {
                      ...localOptions.headers,
                      ...(accessToken.value?{Authorization: `Bearer ${accessToken.value}`}:{})
                    },
                    onRequest(ctx) {
                      return localOptions?.onRequest?.(ctx);
                    },
                    onRequestError(ctx) {
                        // if([401,419,403].includes(ctx.response?.status!)) {
                        //     if(accessToken.value && refreshToken.value) {
                        //         $fetch<RefreshData>('/api/token/refresh/', {
                        //             method: 'post',
                        //             body: JSON.stringify({ refresh: refreshToken.value })
                        //         })
                        //         .then((data) => {
                        //             accessToken.value = data.access
                        //             refreshToken.value = data.refresh
                        //             ctx.options.headers = {
                        //                 ...ctx.options.headers,
                        //                 Authorization: `Bearer ${data.access}`
                        //             }
                        //             return localOptions?.onRequest?.(ctx);
                        //         }).catch((error) => {
                        //             removeData()
                        //         })
                        //     } else {
                        //         removeData()
                        //     }
                        // } 
                    }
                }
            },
            localFetch
          ),
        }),
        {}
      ),
    };
  },
});
