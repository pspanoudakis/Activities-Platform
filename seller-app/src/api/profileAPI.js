import { fetchWrapper } from './fetchAPI.js'

export function fetchSellerBalance(callback) {
    fetchWrapper({
        endpoint: 'seller/points',
        method: 'GET',
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function fetchSellerInfo(callback) {
    fetchWrapper({
        endpoint: 'seller/profile_info',
        method: 'GET',
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function fetchSellerBankAccounts(callback) {
    fetchWrapper({
        endpoint: 'seller/bank_accounts',
        method: 'GET',
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function updateSellerProfile(newInfo, callback) {
    fetchWrapper({
        endpoint: 'seller/update_profile',
        method: 'POST',
        body: newInfo,
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function redeemSellerPoints(amount, callback) {
    fetchWrapper({
        endpoint: `seller/redeem_points?points=${amount}`,
        method: 'POST',
        body: '',
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function addBankAccount(data,callback) {
    fetchWrapper({
        endpoint: "seller/new_bank_account",
        method: 'POST',
        body:data,
        omitAuthHeader: false,
        needAuth: true,
        callback
    })
}

export function removeAccount(id,callback) {
    fetchWrapper(
        {
            endpoint: `seller/delete_bank_account/${id}`,
            method: 'DELETE',
            body:'',
            omitAuthHeader: false,
            needAuth: true,
            callback
        }

    )
}
