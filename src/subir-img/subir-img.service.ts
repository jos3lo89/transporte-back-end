import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

const credentialsInary = {
  CLOUDINARY_CLOUD_NAME: 'ddqdwtsn6',
  CLOUDINARY_API_KEY: '637552818267964',
  CLOUDINARY_API_SECRET: 'cFCULyEUrCTdKzjtReNnziaVRVM',
};

@Injectable()
export class SubirImgService {
  constructor() {
    cloudinary.config({
      cloud_name: credentialsInary.CLOUDINARY_CLOUD_NAME,
      api_key: credentialsInary.CLOUDINARY_API_KEY,
      api_secret: credentialsInary.CLOUDINARY_API_SECRET,
    });
  }

  async subirImagen(file: Express.Multer.File) {
    try {
      console.log('file en subir sevice ->', file);
      if (!file || !file.path) {
        throw new HttpException('Archivo no encontrado', HttpStatus.BAD_REQUEST);
      }

      const result = await cloudinary.uploader.upload(file.path);
      return {
        id: result.public_id,
        url: result.secure_url,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error al subir la imagen', HttpStatus.BAD_REQUEST);
    }
  }

  async ListaImagenes() {
    try {
      const result = await cloudinary.api.resources({});

      const lista = result.resources.map((resource) => {
        return {
          url: resource.url,
          public_id: resource.public_id,
        };
      });

      return lista;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error al listar las imagenes', HttpStatus.BAD_REQUEST);
    }
  }

  async imagenPorId(id: string) {
    try {
      const result = await cloudinary.api.resource(id);

      return {
        url: result.url,
        public_id: result.public_id,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error al buscar la imagen', HttpStatus.NOT_FOUND);
    }
  }

  async borrarImagen(id: string) {
    try {
      const result = await cloudinary.uploader.destroy(id);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error al borrar la imagen', HttpStatus.BAD_REQUEST);
    }
  }
}
