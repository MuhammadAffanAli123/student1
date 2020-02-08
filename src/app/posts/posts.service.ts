import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';


const URL = environment.apiUrl + '/convert';
const URL_D = environment.apiUrl + '/download/';

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {

    }

    public convert(content: string, sequence: File, format: string): Observable<{ result: string, resultPath: string }> {
        const postData = new FormData();

        if (content) {
            postData.append('content', content);
        } else {
            postData.append('sequence', sequence);
        }
        postData.append('format', format);

        return this.http.post<{ result: string , resultPath: string}>(URL, postData);
    }

    public download(fileName: string): void {
        window.open(URL_D + fileName, fileName);
    }

    public getDownloadPah(fileName: string): string {
        return URL_D + fileName;
    }
}
