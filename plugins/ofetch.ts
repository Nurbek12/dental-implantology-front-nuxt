import { ofetch } from 'ofetch'

interface DataValueType {
    access: string,
    // refresh: string
}

export default defineNuxtPlugin(async (nuxtApp) => {
    globalThis.$fetch = await ofetch.create({
        onRequest: ({request, options}) => {
            const config = useRuntimeConfig()
            const token = useAuthAccessToken()

            if (!request.toString().startsWith('/_')) {

                options.baseURL = config.public.api_url

                const headers: any = {...options.headers }
                
                if(token.value) 
                    headers.Authorization = `Bearer ${token.value}`
                    
                options.headers = headers
            } else {
                options.baseURL = ''
            }
        },
        onResponseError: ({response}) => {
            let tokenRef = useAuthAccessToken()
            let authToken = useAuthRefreshToken()

            if(response.status === 401 || response.status === 419) {
                useAsyncData(() => 
                    $fetch<{access: string, refresh: string}>('/api/token/refresh/', {
                        method: 'post',
                        body: JSON.stringify({
                            refresh: tokenRef.value
                        })
                    })
                ).then(({data}) => {
                    const typeofData = data.value as DataValueType
                    authToken.value = typeofData.access
                }).catch((error) => {
                    console.log(error)
                    useLogout()
                })
            }
        } 
    })
})