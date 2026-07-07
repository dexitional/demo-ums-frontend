import axios from 'axios';
import toast from 'react-hot-toast';
const { REACT_APP_API_URL } = import.meta.env;


class HrsService {
    
    ////**** NSS   ****////

    async fetchNSSAll(keyword,page){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/hrs/nss/all?keyword=${keyword}&page=${page}`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchNSS(id){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/hrs/nss/${encodeURIComponent(id)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async fetchNSSByPin(pin){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/hrs/nss/person/${encodeURIComponent(pin)}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postNSS(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/hrs/nss`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else return toast.error(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async postNSSRegister(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/hrs/nss/register`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else return toast.error(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateNSS(id,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/hrs/nss/${encodeURIComponent(id)}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteNSS(nssId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/hrs/nss/${nssId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

   
    /* NOTICES & CIRCULARS */

    async fetchNotices(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/hrs/notices`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchNSSNotices(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/hrs/notices/nss`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchNotice(noticeId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/hrs/notices/${noticeId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postNotice(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/hrs/notices`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateNotice(noticeId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/hrs/notices/${noticeId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteNotice(noticeId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/hrs/notices/${noticeId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }



    /* NSS SERVICE REQUESTS */

    async fetchServices(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/hrs/services`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchService(serviceId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/hrs/services/${serviceId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postService(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/hrs/services`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateService(serviceId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/hrs/services/${serviceId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteService(serviceId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/hrs/services/${serviceId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* NSS Password Change  */
    async postNSSPassword(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/hrs/password/nss`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


     /* SETTINGS */

     async fetchSettings(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/evs/settings`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async fetchSetting(settingId){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/evs/settings/${settingId}`)
            if(res.status == 200 || res.status == 204)
               return res.data
            else throw new(res.data.message)
        
        } catch (error) {
            toast.error(error.message)
        }
    }

    async postSetting(data){
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/evs/settings`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record created successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async updateSetting(settingId,data){
        try {
            const res = await axios.patch(`${REACT_APP_API_URL}/evs/settings/${settingId}`, data,{
               headers: { "Content-Type" : "application/json" }
            })
            if(res.status == 200){
               toast.success("Record updated successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }

    async deleteSetting(settingId){
        try {
            const res = await axios.delete(`${REACT_APP_API_URL}/evs/settings/${settingId}`)
            if(res.status == 200){
               toast.success("Record deleted successfully!")
               return res.data
            } 
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    /* UNITS */

    async fetchUnits(){
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/hrs/units`)
            if(res.status == 200 || res.status == 204)
              return res.data
            else throw new(res.data.message)
        
        } catch (error) { 
            toast.error(error.message)
        }
    }


    
}

export default new HrsService();