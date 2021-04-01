import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Output() getHistory = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  openHistory() {
    this.getHistory.emit();
  }
  
}
