import axios from 'axios';

export const GithubService = {
    getUser(username){
        const service = `https://api.github.com/users/${username}`;

        return new Promise((resolve, reject) =>{
            axios.get(service)
                .then(resolve)
                .catch(reject)
        })
    }
}