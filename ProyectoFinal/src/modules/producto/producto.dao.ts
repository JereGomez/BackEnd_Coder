import productosSchema from '../schemas/productoSchema';
import { DAOInterface } from '../dao.interface';
import { ProductoDTO } from './producto.dto';

export class ProductosDAOMongo implements DAOInterface <ProductoDTO, number>{
    private prodModel;
    private static instance;
    constructor(){
        this.prodModel = productosSchema;
    }


    static getInstance(){
        if(!ProductosDAOMongo.instance){
            ProductosDAOMongo.instance = new ProductosDAOMongo();
        }
        return ProductosDAOMongo.instance;
    }

    async save(producto: ProductoDTO){
        try{
           const nuevo =  await this.prodModel.create(producto);
           return nuevo._id;
        }
        catch(err){
            throw new Error (`Ocurrio un error al guardar un nuevo producto ${err}`);
        }
    }
 
    async getById(id: number){
        try{
            const item = await this.prodModel.findOne({'_id': id});
            return item;
        }
        catch (err){
            throw new Error(`Ocurrio un error al buscar un producto por ID ${err}`);
        }
    }

    async getAll(){
        try{
            const items = await this.prodModel.find();
            return items;
        }
        catch(err){
            throw new Error(`Ocurrio un error al traer todos los productos del inventario ${err}`)
        }
        
    }
    
    async deleteById(id: number){
        try{
            const result = await this.prodModel.deleteOne({'_id': id});
            return result; 
        }
        catch (err){
            throw new Error(`Error al borrar producto por ID ${err}`);
        }
    }

    async deleteAll(){
        try{
            const result = await this.prodModel.deleteMany();
            return result;
        }
        catch (err){
            throw new Error(`Error al eliminar todos los productos del catalogo ${err}`);
        }
    }

    async updateById(producto: ProductoDTO, id: number){
        try{
            await this.prodModel.updateOne(
                {'_id':id},
                {$set: producto}
            );
        }
        catch (err){
            throw new Error(`Error al actualizar producto por ID ${err}`);
        }
    }

}