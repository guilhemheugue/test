import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-probe-view',
  templateUrl: './probe-view.component.html',
  styleUrls: ['./probe-view.component.scss']
})
export class ProbeViewComponent implements OnInit {

  @Input() id: number | undefined;
  @Input() name: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
