import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageData } from '../../models/image-data.model';
import { Observable } from 'rxjs';
import { ImageService } from './image.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
})
export class ImageSelectorComponent implements OnInit {
  private file?: File;
  images$?: Observable<ImageData[]>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
    this.getAllImages();
  }

  private getAllImages(): void {
    this.images$ = this.imageService.getAllImage();
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void {
    if (this.file) {
      //upload image
      this.imageService.uploadImage(this.file).subscribe({
        next: (response) => {
          // console.log(response);
          this.imageUploadForm?.resetForm();
          this.getAllImages();
        },
      });
    }
  }

  selectImage(image: ImageData): void {
    this.imageService.selectImage(image);
  }
}
