import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IHttpError } from '../interface/error';
import { IProfile } from '../interface/profile';
import { ProfileService } from '../service/profile.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  userId!: string | null;
  profileSub!: Subscription;
  profile!: IProfile;

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    console.log("User id", this.userId)
    this.profileSub = this.profileService.getUserData(this.userId).subscribe({
      next: (userData: IProfile | IHttpError) => {
        console.log('Profile Data', userData)
        this.profile = <IProfile>userData;
      },
    });
  }

  ngOnDestroy(): void {
    this.profileSub.unsubscribe();
  }
}
