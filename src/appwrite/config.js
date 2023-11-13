import env from '../envConfig/conf'
import { Client,Account,Databases, ID } from 'appwrite'

export class Service{
    client = new Client();
    databases;
    //bucket;


    constructor(){
        this.client
        .setEndpoint(env.appwriteUrl)
        .setProject(env.appwriteProjectId);
        this.databases = new Databases(this.client);
        //this.bucket = new Storage(this.client)
    }

    // method for creating a new post
    async createMessage({body,username,userId}){
        try {
            return await this.databases.createDocument(
                env.appwriteDatabaseId, // database id
                env.appwriteCollectionId, // collection id
                ID.unique(), // document id  
                {
                   body,
                   username,
                   userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
        }
    }

    async updateMessage(id,{body}){
           try {
              return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    body
                }
              )
           } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error);
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
            console.log("Appwrite service :: deletePost :: error",error);
            return false
        }
    }

    // async getMessage(id){
    //     try {
    //         return await this.databases.getDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             id
    //         )
    //     } catch (error) {
    //         console.log("Appwrite service :: getPost :: error",error);
    //     }
    // }

    // we will query only for the post which has an active status
    async getAllMessage(queries=[]){
        try {
           return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
           )
        } catch (error) {
            console.log("Appwrite service :: getAllPost :: error",error);
            return false 
        }
    }

    // file upload service
    // async uploadFile(file){
    //     try {
    //         return await this.bucket.createFile(
    //             conf.appwriteBucketId,
    //             ID.unique(),
    //             file
    //         )
    //     } catch (error) {
    //         console.log("Appwrite service :: uploadFile :: error",error);
    //         return false  
    //     }
    // }

    // delete file
    // async deleteFile(fileId){
    //     try {
    //         await this.bucket.deleteFile(
    //             conf.appwriteBucketId,
    //             fileId
    //         )
    //         return true
    //     } catch (error) {
    //         console.log("Appwrite service :: deleteFile :: error",error);
    //         return false 
    //     }
    // }

    // get file preview
    // getFilePreview(fileId){
    //     return this.bucket.getFilePreview(
    //         conf.appwriteBucketId,
    //         fileId
    //     )
    // }

    // download file
    // downloadFile(fileId){
    //     return this.bucket.getFileDownload(
    //         conf.appwriteBucketId,
    //         fileId
    //     )
    // }
}

const service = new Service()
export default service

