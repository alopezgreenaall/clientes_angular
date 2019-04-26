import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import { ConsoleReporter } from 'jasmine';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]> {

   return this.http.get<Cliente[]>(this.urlEndPoint);
  // return this.http.get(this.urlEndPoint).pipe(map(response => response as Cliente[]));
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.mensaje, 'error');
        return throwError(e);

      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(catchError(e =>{
      this.router.navigate(['/clientes']);
      console.log(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.mensaje, 'error');
      return throwError(e);
    })
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers:this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire( e.error.mensaje, e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(cliente: Cliente): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${cliente.id}`,{headers: this.httpHeaders});
  }


}
