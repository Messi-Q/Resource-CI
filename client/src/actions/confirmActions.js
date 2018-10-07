
export const fileConfirm = (info) => {
    console.log('info', info);
    return dispatch => {
        return fetch('/api/confirm', {
            method: "post",
            body: JSON.stringify(info),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
};