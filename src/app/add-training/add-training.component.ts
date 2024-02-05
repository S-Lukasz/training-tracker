import { Component } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrl: './add-training.component.css',
})
export class AddTrainingComponent {
  trainingName: string = '';
  faXmark = faXmark;

  constructor(private sharedService: SharedService) {}

  onAddClick() {
    this.sharedService.emitTrainingToAdd(this.trainingName);
    this.sharedService.emitTrainingView();
  }

  onCloseClick() {
    this.sharedService.emitTrainingView();
  }
}
