type DatabaseUser = {
    id: number,
    email: string
}

let users:DatabaseUser[] = [
    {id: 1, email: "1@example.com"},
    {id: 2, email: "2@example.com"}
]

class DatabaseUsers {
    /**
     * Gets a user by it's id
     * 
     * @param   id  number  The id of the user
     */
    static getUser(id:number):DatabaseUser|null;

    /**
     * Gets the user by its email
     * 
     * @param email 
     */
    static getUser(email:string):DatabaseUser|null;

    /**
     * When an magic login link is sent to the user it will contain a key (UUID) and a token to verify with
     * 
     * @param key 
     * @param token 
     */
    static getUser(key:string, token:string):DatabaseUser|null;

    static getUser(idOrEmail:number|string, token?:string):DatabaseUser|null {
        if(typeof idOrEmail === "string") {
            if(token) {
                //METODO: implemnet this
            }
            else {
                for(let i = 0; i < users.length; i++) {
                    let currentUser = users[i];
                    if(currentUser.email === idOrEmail) {
                        return currentUser;
                    }
                }
            }
        }
        else {
            for(let i = 0; i < users.length; i++) {
                let currentUser = users[i];
                if(currentUser.id === idOrEmail) {
                    return currentUser;
                }
            }
        }
        
        return null;
    } 
}

export default DatabaseUsers;