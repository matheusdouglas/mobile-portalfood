import axios from 'axios'

const api = axios.create(
    {
        baseURL : 'http://192.168.15.124:4000'
        
    }
)

export { api } ; 