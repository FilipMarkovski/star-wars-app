import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: any[];
  @Input() displayPropName: string;
  @Output() itemClicked: EventEmitter<any> = new EventEmitter<any>();

  @Input() itemsPerPage: number;
  @Input() page: number;
  @Input() totalItems: number;

  // @Input() page: number = 1;
  // @Input() next?: string;
  // itemsPerPage: number = 10;
  // @Input() totalItems: number;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(item: any) {
    this.itemClicked.emit(item);
  }

}
