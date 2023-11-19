import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageData } from '../../models/image-data.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  selectedImage: BehaviorSubject<ImageData> = new BehaviorSubject<ImageData>({
    id: 0,
    name: '',
    filePath: '',
    type: '',
  });

  constructor(private http: HttpClient) {}

  getAllImage(): Observable<ImageData[]> {
    return this.http.get<ImageData[]>(`${environment.apiBaseUrl}/image/all`);
  }

  uploadImage(file: File): Observable<ImageData> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ImageData>(
      `${environment.apiBaseUrl}/image/upload?addAuth=true`,
      formData
    );
  }

  selectImage(image: ImageData): void {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<ImageData> {
    return this.selectedImage.asObservable();
  }
}
