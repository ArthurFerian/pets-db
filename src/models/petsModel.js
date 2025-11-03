import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const findAll = async () => {
   return await prisma.pets.findMany({
    orderBy: { nome: 'asc' }
   });
}

export const findById = async (id) => {
    return await prisma.pets.findUnique({
        where: { id: Number(id) }
    });
}

export const create = async (data) => {
   return await prisma.pets.create({
      data: {
         nome: data.nome,
         dono: data.dono,
         idade: data.idade,
         especie: data.especie,
      }
   })

}

export const update = async (id, data) => {
   return await prisma.pets.update({
      where: { id: Number(id) },
      data: {
         ...(data.nome && { nome: data.nome }),
         ...(data.dono && { dono: data.dono }),
         ...(data.especie && { especie: data.especie }),
         ...(data.idade && { idade: Number(data.idade) }),
      }
   })
}

export const deletePet = async (id) => {
   return await prisma.pets.delete({
   where: { id: Number(id) }
   })
}