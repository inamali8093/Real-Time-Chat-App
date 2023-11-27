import conf from '../envConfig/conf'
import {Client,Databases,Account,Storage,ID, Query} from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }


    //method for creating a new message
    async createMessage(payload){
        try {
           return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,ID.unique(),
           payload) 
        } catch (error) {
            console.log("Appwrite service :: createMessage :: error",error)
        }
    }

    async deleteMessage(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteMessage :: error",error);
            return false
        }
    }

    async getAllMessages(queries=[Query.orderDesc('$createdAt')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getAllMessages :: error",error);
        }
    }


}

const service = new Service()
export default service