import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../../core/service/auth/authservice.service';
import { ProfileData } from '../../../core/models/profileData';
import { ActivatedRoute } from '@angular/router';
import { TeamProfile } from '../../../core/models/teamProfile';
import { TeamProfileEventPlace } from '../../../core/models/teamProfileEventPlace';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit, AfterViewInit {
  categories: any[] = [];
  IndividualCategory: any[] = [];
  teamCategory: any[] = [];
  gatherGrove: any[] = [];

  form!: FormGroup;
  formTeam!: FormGroup;
  formEventPlace!: FormGroup;
  userId!: string;

  nameOFMembers: string[] = [];

  givenName!: string;

  showIndividual: boolean = false;
  showEventPlace: boolean = false;
  showTeam: boolean = false;
  imagefile: File;
  imageUrl: string | ArrayBuffer | null = null;

  autocomplete: google.maps.places.Autocomplete | undefined;

  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() Placeholder = '';

  location: any | undefined;
  locationLongitude: any | undefined;
  placeName: string | undefined;
  nameOfPlace: any | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      bio: ['', Validators.required],
      description: ['', Validators.required],
      listOfCategoryId: ['', Validators.required],
    });

    this.formTeam = this.fb.group({
      bio: ['', Validators.required],
      description: ['', Validators.required],
      listOfCategoryId: ['', Validators.required],
    });

    this.formEventPlace = this.fb.group({
      bio: ['', Validators.required],
      description: ['', Validators.required],
      listOfCategoryId: ['', Validators.required],
      seatNumber: ['', Validators.required],
    });

    console.log(this.formTeam.value);

    this.authService.getTeamList().subscribe(
      (data: any[]) => {
        this.teamCategory = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

    this.authService.getGatherGroveCategory().subscribe(
      (data: any[]) => {
        this.gatherGrove = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

    this.authService.getIndividualCategory().subscribe(
      (data: any[]) => {
        this.IndividualCategory = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

    this.route.queryParams.subscribe((params) => {
      this.givenName = params['name'];
      if (this.givenName === 'showIndividual') {
        this.showIndividual = true;
      } else if (this.givenName === 'showEventPlace') {
        this.showEventPlace = true;
      } else {
        this.showTeam = true;
      }
    });

    this.userId = this.authService.getUserFromLocalStorage();
  }

  ngAfterViewInit(): void {
    if (!window.google) {
      console.error('Google Maps API not loaded');
      return;
    }

    if (this.showTeam !== true) {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.inputField.nativeElement
      );
      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete?.getPlace();
        if (place && place.geometry?.location) {
          this.location = place.geometry.location.lat();
          this.locationLongitude = place.geometry.location.lng();
          this.nameOfPlace = place.name;
          console.log(this.location);
          console.log(this.locationLongitude);
        }
      });
    }
  }


  

  addName(name: string) {
    if (name !== '') {
      this.nameOFMembers.push(name);
    }
  }

  onSubmitTeam(): void {
    const userProfileTeam: TeamProfile = {
      bio: this.formTeam.value.bio,
      description: this.formTeam.value.description,
      names: this.nameOFMembers,
      listOfCategoryId: this.formTeam.value.listOfCategoryId,
    };
    console.log(this.formTeam.value.bio);
    this.authService
      .registerTeam(userProfileTeam, this.userId)
      .subscribe((result) => {
        console.log(result);
      });
  }

  onSubmitEventPlace(): void {
    const userProfileEventPlace: TeamProfileEventPlace = {
      bio: this.formEventPlace.value.bio,
      description: this.formEventPlace.value.description,
      listOfCategoryId: this.formEventPlace.value.listOfCategoryId,
      seatNumber: this.formEventPlace.value.seatNumber,
      location: this.location,
      locationLongitude: this.locationLongitude,
      nameOfPlace: this.nameOfPlace,
    };
    this.authService
      .registerEventPlace(userProfileEventPlace, this.userId)
      .subscribe((result) => {
        console.log(result);
      });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagefile = event.target.files[0];
        this.imageUrl = reader.result;
      };
    }
  }

  onSubmit(): void {
    const userProfileData: ProfileData = {
      bio: this.form.value.bio,
      description: this.form.value.description,
      listOfCategoryId: this.form.value.listOfCategoryId,
    };

    this.authService
      .registerProfile(userProfileData, this.userId)
      .subscribe((result) => {
        console.log(result);
      });
  }


  removeName(name: string): void {
    this.nameOFMembers = this.nameOFMembers.filter(member => member !== name);
  }
}
