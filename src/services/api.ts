import axios from 'axios'

const api = axios.create(
    {
        baseURL : 'https://portalfood.onrender.com'
        
    }
)

export { api } ; 