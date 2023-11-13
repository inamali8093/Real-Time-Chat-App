import env from "../envConfig/conf"
import { Account, Client,ID } from 'appwrite'


export class AuthServices{
    client = new Client()
    account

    constructor(){
        this.client
        .setEndpoint(env.appwriteUrl)
        .setProject(env.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                // call another method
                return this.login({email,password})
            }else{
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
        try {
         return await this.account.createEmailSession(email,password);

        } catch (error) {
            throw error
        }
    }

    
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error",error);
        }
        return null;
    }


    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
           console.log("Appwrite service :: logout :: error",error); 
        }
    }


}

const authService = new AuthServices

export default authService
 