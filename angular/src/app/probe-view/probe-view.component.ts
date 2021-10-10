import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-probe-view',
  templateUrl: './probe-view.component.html',
  styleUrls: ['./probe-view.component.scss']
})
export class ProbeViewComponent implements OnInit {

  @Input() id: number | undefined;
  @Input() name: string | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
