import { axiosInstance } from '@/repositories/client/AxiosClient';

interface FetchUserPayload {
  restaurant_name: string;
}
interface User {
  id: number;
  name: string;
  email: string;
  // Add all expected fields here
}

interface FetchUserResponse {
  data: User[];
  status: string;
}

export async function fetchUser(data: FetchUserPayload): Promise<FetchUserResponse>{
    try {
        const response = await axiosInstance.post('user/getallusers',data)
        console.log("User data fetched successfully:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;

    }

}


// admin page


export async function register(data: object) {
  try {
    const response = await axiosInstance.post('/auth/register', data);
    console.log('user added successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
}

export async function deleteuser(id: number) {
  try {
    const response = await axiosInstance.delete('/auth/deleteuser/' + id);
    console.log('user deleted successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function updateuser(id: number, data: object) {
  try {
    const response = await axiosInstance.put('/auth/updateuser/' + id, data);
    console.log('user updated successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function getalluser(){
    try {
        const response = await axiosInstance.get('user/getallusers')
        console.log("User data fetched successfully:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;

    }

}

export async function getuser(id: number){
    try {
        const response = await axiosInstance.get('user/getuser/' + id)
        console.log("User data fetched successfully:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;

    }

}


export async function addbalance(id: number, ammount: number) {
  try {
    const response = await axiosInstance.put('/user/addbalance/' + id + '/' + ammount);
    console.log('ammount added successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error adding ammount user:', error);
    throw error;
  }
}

export async function subbalance(id: number, ammount: number) {
  try {
    const response = await axiosInstance.put('/user/subbalance/' + id + '/' + ammount);
    console.log('ammount subtracted successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error subtracting ammount user:', error);
    throw error;
  }
}


export async function transferfrompool(id: number, ammount: number) {
  try {
    const response = await axiosInstance.put('/user/transferfrompool/' + id + '/' + ammount);
    console.log('ammount added successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error adding ammount user:', error);
    throw error;
  }
}

export async function transfertopool(id: number) {
  try {
    const response = await axiosInstance.put('/user/transfertopool/' + id);
    console.log('ammount subtracted successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error subtracting ammount user:', error);
    throw error;
  }
}

export async function getallroles(){
    try {
        const response = await axiosInstance.get('user/getallroles')
        console.log("roles:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error fetching roles:", error);
        throw error;

    }

}

export async function getallpermissions(){
    try {
        const response = await axiosInstance.get('user/getallpermissions')
        console.log("permissions:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error fetching permissions:", error);
        throw error;

    }

}

export async function notifyusers() {
  try {
    const response = await axiosInstance.get(`/user/notifyusers`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
}

export async function gettotalbudget() {
  try {
    const response = await axiosInstance.get(`/core/gettotalbudget`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
}

export async function getnumparticipants() {
  try {
    const response = await axiosInstance.get(`/core/getnumparticipants`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
}

export async function getallcontributions() {
  try {
    const response = await axiosInstance.get(`/core/getallcontributions`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
}


export async function addcontribution(data: object) {
  try {
    const response = await axiosInstance.post('/core/addcontribution', data);
    console.log('contribution added successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error adding contribution:', error);
    throw error;
  }
}

export async function deletecontribution(id: number) {
  try {
    const response = await axiosInstance.delete('/core/deletecontribution/' + id);
    console.log('deletecontribution successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error deletecontribution:', error);
    throw error;
  }
}

export async function getplatesneeded() {
  try {
    const response = await axiosInstance.get(`/core/getplatesneeded`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
}

export async function gettotalroti() {
  try {
    const response = await axiosInstance.get(`/core/gettotalroti`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
}




export async function getnumvotes() {
  try {
    const response = await axiosInstance.get(`/core/getnumvotes`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
}

export async function getallvotes() {
  try {
    const response = await axiosInstance.get(`/core/getallvotes`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
}

export async function votingresults() {
  try {
    const response = await axiosInstance.get(`/core/votingresults`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
}


export async function getvotebyuserid(id: number) {
  try {
    const response = await axiosInstance.get(`/core/getvotebyuserid/`  + id);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
}



export async function addvote(data: object) {
  try {
    const response = await axiosInstance.post('/core/addvote', data);
    console.log('vote added successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error adding vote:', error);
    throw error;
  }
}


export async function deletevote(id: number) {
  try {
    const response = await axiosInstance.delete('/core/deletevote/' + id);
    console.log('deletevote successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error deletevote:', error);
    throw error;
  }
}

export async function getdishesbyrestaurant() {
  try {
    const response = await axiosInstance.get(`/core/getdishesbyrestaurant`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
}

export async function getalldishes() {
  try {
    const response = await axiosInstance.get(`/core/getalldishes`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
}









export async function adddish(data: object) {
  try {
    const response = await axiosInstance.post('/core/adddish', data);
    console.log('dish added successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error adding purchase:', error);
    throw error;
  }
}


export async function finalizeddishes(platesneeded: number) {
  try {
    const response = await axiosInstance.get(`/core/finalizedishes/${platesneeded}`);
    console.log("Finalized dishes fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching finalized dishes:", error);
    throw error;
  }
}


export async function getallrestaurants() {
  try {
    const response = await axiosInstance.get(`/core/getallrestaurants`);
    console.log("Finalized dishes fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching finalized dishes:", error);
    throw error;
  }
}






export async function addpurchase(purchasedata: Array<any>) {
  try {
    const response = await axiosInstance.post('/core/addpurchase', purchasedata);
    console.log('Purchases added successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error adding purchase:', error);
    throw error;
  }
}

export async function getallpurchases() {
  try {
    const response = await axiosInstance.get(`/core/getallpurchases`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
}

export async function deleteallpurchase() {
  try {
    const response = await axiosInstance.delete('/core/deleteallpurchase');
    console.log('Purchases deleted successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error deleting purchase:', error);
    throw error;
  }
}


export async function deletepurchase(id: number) {
  try {
    const response = await axiosInstance.delete('/core/deletepurchase/' + id);
    console.log('Purchase deleted successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error deleting purchase:', error);
    throw error;
  }
}


export async function gettotalbill() {
  try {
    const response = await axiosInstance.get(`/core/gettotalbill`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function getbalancepool() {
  try {
    const response = await axiosInstance.get(`/core/getbalancepool`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function purchasecheck() {
  try {
    const response = await axiosInstance.get(`/user/purchasecheck`);
    console.log( response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}






