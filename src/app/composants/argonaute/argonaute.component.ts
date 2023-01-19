import {Component, Inject, OnInit} from '@angular/core';
import {ArgonauteService} from "../../services/argonaute.service";
import {Membre} from "../../modeles/membre";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-argonaute',
  templateUrl: './argonaute.component.html',
  styleUrls: ['./argonaute.component.css']
})
export class ArgonauteComponent implements OnInit {
  public membres!: Observable<Membre[]>;

  public form!: FormGroup

  constructor(@Inject(ArgonauteService) private apiArgonaute: ArgonauteService) {

  }

  ngOnInit(): void {
    this.membres = this.apiArgonaute.getEquipage()
    this.form = new FormGroup({
      nom: new FormControl('')
    })
  }

  onSubmit(): void {

    this.apiArgonaute.postEquipage({nom: this.form.controls['nom'].value}).subscribe(
      () => this.membres = this.apiArgonaute.getEquipage(),
    )
    this.form.reset()

  }

}
