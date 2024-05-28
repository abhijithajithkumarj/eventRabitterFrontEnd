import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthserviceService } from '../../core/service/auth/authservice.service';
import { Router } from '@angular/router';
import { DataSharingServiceService } from '../../core/service/dataShare/data-sharing-service.service';

@Component({
  selector: 'app-set-up-event',
  templateUrl: './set-up-event.component.html',
  styleUrls: ['./set-up-event.component.css'],
})
export class SetUpEventComponent implements OnInit {
  eventForm: FormGroup;
  userId: string;
  eventDataMap: Map<string, any[]> = new Map(); 
  visible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AuthserviceService,
    private router: Router,
    private dataSharingService: DataSharingServiceService
  ) {}

  ngOnInit(): void {

    this.userId = this.service.getUserFromLocalStorage();
    
    this.service.getEvetDataWithGroup(this.userId).subscribe((data: any) => {
      console.log(data);
      this.eventDataMap = new Map(Object.entries(data));
    });


  }

  trackByFn(index: number, item: any): any {
    return item.key; 
  }

  showDialog() {
    this.visible = true;
  }

  navigateToBackground(data: any) {
    this.dataSharingService.shareData=data;
    this.router.navigate(['/eventCreateDetails']);
  }

  navigationToChat(data: any) {
    this.dataSharingService.shareData=data;
    this.router.navigate(['/chat']);
  }
}
