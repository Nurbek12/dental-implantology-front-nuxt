import { ofetch } from 'ofetch'

interface DataValueType {
    access: string,
    // refresh: string
}

export default defineNuxtPlugin(async (nuxtApp) => {
    globalThis.$fetch = ofetch.create({
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
        onResponseError: ({response, request}) => {
            let userdata = useUserData()
            let tokenRef = useAuthAccessToken()
            let authToken = useAuthRefreshToken()
            
            if((response.status === 401 || response.status === 419 || response.status === 403)) {
                if(authToken.value && tokenRef.value == null){
                    useAsyncData(() => 
                        $fetch<{access: string, refresh: string}>('/api/token/refresh/', {
                            method: 'post',
                            body: JSON.stringify({
                                refresh: authToken.value
                            })
                        })
                    ).then(({data}) => {
                        const typeofData = data.value as DataValueType
                        tokenRef.value = typeofData.access
                    }).catch((error) => {
                        userdata.value = null
                        tokenRef.value = null
                        authToken.value = null
                        navigateTo('/login')
                    })
                } else {
                    userdata.value = null
                    tokenRef.value = null
                    authToken.value = null
                    navigateTo('/login')
                }
            }
        } 
    })
})