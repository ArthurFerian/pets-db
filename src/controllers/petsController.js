import * as PetsModel from './../models/petsModel.js';

export const listarTodos = async (req, res) => {
    try {
        const pets = await PetsModel.findAll();

        if (!pets || pets.length === 0) {
            res.status(404).json({
                total: pets.length,
                mensagem: 'Não há pets na lista',
                pets
            })
            
        }

        res.status(200).json({
            total: pets.length,
            mensagem: 'lista de pets',
            pets
        })

    } catch (error) {
    res.status(500).json({ 
        erro: 'erro interno do servidor',
        detalhes: error.message,
        status: 500
       })
    }
}

export const buscarPetPorId = async (req,res) => {
    try {
        const { id } = req.params;
        const pet = await PetsModel.findById(id);

        if (!pet) {
            return res.status(404).json({
                erro: 'Pet não encontrado.',
                mensagem: "Verifique se o ID do pet existe.",
                id: id,
            })
        }

        
        res.status(200).json({
        mensagem: "Pet encontrado com sucesso.",
        pet
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao buscar pet por ID.',
            detalhes: error.message,
            status: 500
        })
    }

}

export const criar = async (req, res) => {
    try {
       
        const { nome, especie, idade, dono } = req.body

        const dado = req.body

        const camposObrigatorios = ['nome', 'especie'];

        const faltando = camposObrigatorios.filter(campo => !dado[campo]);

        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}.`
            });
        }


        const novoAnimal = await AnimalModel.create(dado);

        res.status(201).json({
            mensagem: 'Animal criado com sucesso!',
            animal: novoAnimal
        })


    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao criar o animal',
            detalhes: error.message
        })
    }
}

export const atualizar = async (req, res) => {
    try {
    const id = parseInt(req.params.id);
    const dados = req.body;

    const petExiste = await PetsModelModel.findById(id);

    if (!petExiste) {
        return res.status(404).json({
            erro: 'Pet não encontrado',
            id: id
        })
    }
    
    } catch (error) {
    res.status(500).json({
        erro: 'Erro ao atualizar pet',
        detalhes: error.message
     })
    }
}

export const apagar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const bruxoExiste = await BruxoModel.findById(id);

        if (!bruxoExiste) {
            return res.status(404).json({
                erro: 'Bruxo não encontrado',
                id: id
            })
        }
        
        await BruxoModel.deleteById(id);

        res.status(200).json({
            mensagem: 'Pet apagado com sucesso!',
            petRemovido: bruxoExiste
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao apagar bruxo',
            detalhes: error.message
        })
    }

}