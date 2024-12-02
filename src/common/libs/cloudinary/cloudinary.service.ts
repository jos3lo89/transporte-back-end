import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

const credentialsInary = {
  CLOUDINARY_CLOUD_NAME: 'ddqdwtsn6',
  CLOUDINARY_API_KEY: '637552818267964',
  CLOUDINARY_API_SECRET: 'cFCULyEUrCTdKzjtReNnziaVRVM',
};

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: credentialsInary.CLOUDINARY_CLOUD_NAME,
      api_key: credentialsInary.CLOUDINARY_API_KEY,
      api_secret: credentialsInary.CLOUDINARY_API_SECRET,
    });
  }

  subirImangen(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'transportes',
          },
          (err, result) => {
            if (err) {
              reject(err as UploadApiErrorResponse);
            }
            resolve(result as UploadApiResponse);
          },
        )
        .end(file.buffer);
    });
  }

  async imagenPorId(public_id: string) {
    return await cloudinary.api.resource(public_id);
  }

  async listarImagenes() {
    return await cloudinary.api.resources({
      type: 'upload',
      prefix: 'transportes/',
    });
  }

  async borraImagen(public_id: string) {
    return await cloudinary.uploader.destroy(public_id);
  }

  actualizarImagen(public_id: string, file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: public_id,
            overwrite: true,
          },
          (err, result) => {
            if (err) {
              reject(err as UploadApiErrorResponse);
            }
            resolve(result as UploadApiResponse);
          },
        )
        .end(file.buffer);
    });
  }
}
