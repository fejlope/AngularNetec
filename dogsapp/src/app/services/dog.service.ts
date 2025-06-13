import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError, timeout } from 'rxjs';

export interface Dog{
  id:number,
  breed:string,
  description:string,
  urlImage:string
}


@Injectable({
  providedIn: 'root'
})
export class DogService {
  private http:HttpClient=inject(HttpClient) ;
  private baseUri:string="http://localhost:8082/dog";
 
  /* obterne perros desee el API*/
  getDogs():Observable<Dog[]>{
    return this.http.get<Dog[]>(this.baseUri)
    .pipe(timeout(3000), 
      map(anyDataList => anyDataList.map(any => any as Dog)),
      catchError(err=>{
        console.log("error al obtener la informacion de la API", err);
        return throwError(()=>new Error("error get api data"));
      })
      );

  }
  /*insert dog a la API*/
  insertDog(dog:Dog):Observable<void>{
    return this.http.post<void>(this.baseUri, dog)
      .pipe(timeout(3000),
      catchError(err=>{
        console.log("error al insertar", err);
        return throwError(()=> new Error("Error al insertar"))
      })
    )
  }

  /*eliminar perro en el API*/
  deleteDog(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUri}/${id}`)
    .pipe(timeout(3000),
      catchError(err=>{
        console.log("error al eliminar", err);
        return throwError(()=> new Error("Error al eliminar"))
  } 
}
