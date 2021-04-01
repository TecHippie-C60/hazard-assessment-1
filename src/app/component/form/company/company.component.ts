import { Component, OnChanges, Input, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../service/app.service"

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnChanges, OnInit {

  @Input() companyForm

  options: string[] = ['One', 'Two', 'Three']
  filteredOptions: Observable<string[]>

  constructor(
    public appService: AppService,
    private formBuilder: FormBuilder) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.options.filter(option => option.toLowerCase().includes(filterValue))
  }

  ngOnInit(): void {
    this.appService.getListData().subscribe(data => {
      this.options = data.filter(d => {return d.name =="companies"})[0]?.data?.map(d => { return d.item })
      
    })
  }

  ngOnChanges(): void {
// console.log(this.page)
    // this.filteredOptions = this.headerForm.controls['company'].valueChanges
    // .pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // )
  }

  next() {
    
  }

}
