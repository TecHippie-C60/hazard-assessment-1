import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-sign-off',
  templateUrl: './sign-off.component.html',
  styleUrls: ['./sign-off.component.scss']
})
export class SignOffComponent implements OnInit {

  @Input() companyForm
  @Output() submitForm = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
    console.log(this.companyForm.value)
  }


  save() {
    this.submitForm.emit()
  }

  

}
