import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import {Router,ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo: string = 'Crear Cliente';

  constructor(private clienteService: ClienteService,private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.cargarCliente();
  }

  public create(): void{
    this.clienteService.create(this.cliente)
    .subscribe(response => {
      this.router.navigate(['./clientes']);
      swal.fire('Nuevo cliente', `Cliente ${this.cliente.nombre} creado con exito!!`, 'success' );
    }
    );
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente);
      }
    });
  }

  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe(response => {
      this.router.navigate(['./clientes']);
      swal.fire('Cliente Actualizado', `Cliente ${this.cliente.nombre} actualizado con exito!!`, 'success' );
    }
    );
  }
}
