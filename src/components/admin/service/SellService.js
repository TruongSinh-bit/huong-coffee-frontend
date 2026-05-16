import axios from "axios";





export async function setStatusOrder(tableId) {
    try {
        await axios.patch(`http://localhost:8080/api/table/order/${tableId}`)
    }catch (e){
        console.error(e)
    }
}


export async function setStatusEmployee(tableId) {
    try {
       await axios.patch(`http://localhost:8080/api/table/employee/${tableId}`)
    }catch (e){
        console.error(e)
    }
}


export const getAllTables= async () => {
    try {
        let res = await axios.get("http://localhost:8080/api/table")
        return res.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const getBillByTableId= async (tableId) => {
    try {
        let res = await axios.get(`http://localhost:8080/api/bills/${tableId}`)
        return res.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const changeStatusBillByTableId = async (tableId,userId) => {
    try {
        await axios.patch(`http://localhost:8080/api/bills/delete/${tableId}/${userId}`)
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}