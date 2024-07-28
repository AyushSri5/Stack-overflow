import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import { databases } from "./config";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

export default async function getOrCreateDB(){
    try{
        await databases.get(db)
        console.log("Database already exists");
    }
    catch(error){
        try {
            await databases.create(db,db);
            console.log("Database created successfully");
            // Create collections
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection()
            ])

            console.log("Collection created successfully");
            console.log("Database connection established");
        } catch (error) {
            console.log("error creating database or collections",error);
        }
    }
    return databases;
}