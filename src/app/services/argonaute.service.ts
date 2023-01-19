import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Membre} from "../modeles/membre";

@Injectable({
  providedIn: 'root'
})
export class ArgonauteService {
  base_url: string = "http://127.0.0.1:8000/apip/equipages?page=1&pagination=false";
  public membres!: Observable<Membre[]>;


  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  public getEquipage(): Observable<Membre[]> {
    return this.http.get(this.base_url)
      .pipe(
        map((e: any) => e['hydra:member'])
      )
  }

  public postEquipage(form: any): any {
    return this.http.post(this.base_url, form)
  }


}
