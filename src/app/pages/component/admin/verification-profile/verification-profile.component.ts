import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../../core/service/auth/authservice.service';

@Component({
  selector: 'app-verification-profile',
  templateUrl: './verification-profile.component.html',
  styleUrl: './verification-profile.component.css'
})
export class VerificationProfileComponent implements OnInit{
  constructor(private service:AuthserviceService){}

  verificationProfile: any[]=[]
  userId!: string;


  ngOnInit(): void {
    this.service.getVerificationProfile().subscribe(
      (data: any[]) => {
  
       this.verificationProfile=data;
      },
      (error: any) => {
        console.error('Error fetching verification profiles:', error);
      }
    );
  }


  accepUserId(id:string) {
    console.log(id);
    
    this.service.addVerification(id).subscribe(()=>{})
  }
  




}
