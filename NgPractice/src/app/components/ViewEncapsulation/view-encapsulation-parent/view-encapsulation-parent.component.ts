import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'view-encapsulation-parent',
  templateUrl: './view-encapsulation-parent.component.html',
  styleUrls: ['./view-encapsulation-parent.component.css'],
  encapsulation : ViewEncapsulation.ShadowDom
})
export class ViewEncapsulationParentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
