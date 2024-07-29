import { db, voteCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function POST(request: NextRequest){
    try {
        // Grab the data
        const {votedById, voteStatus,typeId, type} = await request.json();
        //List document
        const response = await databases.listDocuments(
            db,voteCollection, [
                Query.equal("type",type),
                Query.equal("typeId",typeId),
                Query.equal("votedById",votedById),
                
            ]
        )

        if(response.documents.length > 0){

        }

        // that means prev vote does not exists or vote status changed
        if(response.documents[0]?.voteStatus !== voteStatus){
            
        }

    } catch (error: any) {
        return NextResponse.json(
            { message: error?.message || "Error deleting answer" },
            { status: error?.status || error?.code || 500 }
        );
    }
}