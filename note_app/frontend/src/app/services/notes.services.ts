import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    notesUrl = 'http://localhost:3000/api/notes/'

    constructor( private http: HttpClient ) { }

    getAllNotes(): Observable<any> {
        return this.http.get("https://pykdhh0xmi.execute-api.us-east-2.amazonaws.com/default/notes_app_list_notes", {withCredentials:true,responseType:"json"})
    }
    
    getNote(id: string): Observable<any> {
        return this.http.get(this.notesUrl + 'note/' + id, {withCredentials:true,responseType:"json"})
    }

    createNote(note: any): Observable<any> {
        return this.http.post("https://pykdhh0xmi.execute-api.us-east-2.amazonaws.com/default/notes_app_add_note", note , {withCredentials:true,responseType:"json"})
    }

    updateNote(note:any): Observable<any> 
    {
        return this.http.patch("https://pykdhh0xmi.execute-api.us-east-2.amazonaws.com/default/notes_app_updateNote", note ,{withCredentials:true,responseType:"json"})
    }

    deleteNote(id: string): Observable<any> {
        return this.http.request
        ( 
            "DELETE", 
            "https://pykdhh0xmi.execute-api.us-east-2.amazonaws.com/default/notes_app_delete", 
            {
                withCredentials:true ,
                responseType:"json",
                body : { _id : id }
            } 
        )
    }

    getRecentNotes():Observable<any>{
        return this.http.get("https://pykdhh0xmi.execute-api.us-east-2.amazonaws.com/default/notes_app_recent",{withCredentials:true,responseType:"json"})
    }

    getImportant():Observable<any>{
        return this.http.get("https://pykdhh0xmi.execute-api.us-east-2.amazonaws.com/default/notes_app_important",{withCredentials:true,responseType:"json"})
    }
    //date must be YYYY-MM-DD

    getByDate( date : string )
    {
        return this.http.post( "https://pykdhh0xmi.execute-api.us-east-2.amazonaws.com/default/notes_app_getByDate", {dateCreated:date}, {withCredentials:true,responseType:"json"})
    }
}
