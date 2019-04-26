import { Component, OnInit } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service.js';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  public swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
  });

  constructor(private clienteService: ClienteService) {
   }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => {
        return this.clientes = clientes;
      }
    );
  }

  delete(cliente: Cliente): void {
    
    this.swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar a ${cliente.nombre}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borralo!',
      cancelButtonText: 'No !!!!!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clientes = this.clientes.filter(cli => cli !== cliente);
        this.clienteService.delete(cliente).subscribe(
          response => { this.swalWithBootstrapButtons.fire(
            `Se ha borrado a ${cliente.nombre}!`,
            'Los datos fueron borrados.',
            'success'
          )}
        );
      }
    })
  }

}
