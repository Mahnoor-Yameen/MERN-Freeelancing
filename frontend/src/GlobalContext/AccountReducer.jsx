export const AccountReducer = (account_state, action) => {
    switch (action.type) {
        case "LOGIN":

            return { ...account_state, token: action.token, people: 'user', Email:action.Email };

        case "LOGOUT":
            return { ...account_state, token: null, people:'guest', Email:null }

        default:
            return account_state;
    }
}