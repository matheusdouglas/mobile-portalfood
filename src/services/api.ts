import axios from 'axios'

const api = axios.create(
    {
        baseURL : 'http://10.11.7.111:4000'
        
    }
)

export { api } ; 